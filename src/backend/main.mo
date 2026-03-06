import Text "mo:core/Text";
import Principal "mo:core/Principal";
import Array "mo:core/Array";
import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Nat "mo:core/Nat";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // Initialize the access control system
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User Profile Management
  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // USDT Exchange

  public type UsdtOrder = {
    id : Nat;
    buyer : Principal;
    buyerName : Text;
    buyerContact : Text;
    packagePrice : Nat;
    packageAmount : Nat;
    isCompleted : Bool;
  };

  module UsdtOrder {
    public func compare(o1 : UsdtOrder, o2 : UsdtOrder) : Order.Order {
      Nat.compare(o1.id, o2.id);
    };
  };

  public type UsdtPackage = {
    id : Nat;
    price : Nat;
    amount : Nat;
  };

  public type UsdtOrderView = {
    id : Nat;
    buyer : Principal;
    buyerName : Text;
    buyerContact : Text;
    packagePrice : Nat;
    packageAmount : Nat;
    isCompleted : Bool;
  };

  var packageIdCounter = 0;
  var orderIdCounter = 0;

  let usdtPackages = Map.empty<Nat, UsdtPackage>();
  let usdtOrders = Map.empty<Nat, UsdtOrder>();

  // Public endpoint - anyone can view packages (including guests)
  public query ({ caller }) func getAllPackages() : async [UsdtPackage] {
    usdtPackages.values().toArray();
  };

  // Admin-only: Create packages
  public shared ({ caller }) func createPackage(price : Nat, amount : Nat) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create packages");
    };

    let packageId = packageIdCounter;
    let usdtPackage : UsdtPackage = {
      id = packageId;
      price;
      amount;
    };

    usdtPackages.add(packageId, usdtPackage);
    packageIdCounter += 1;
    packageId;
  };

  // User-only: Place orders (authenticated users)
  public shared ({ caller }) func placeOrder(buyerName : Text, buyerContact : Text, packageId : Nat) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can place orders");
    };

    let usdtPackage = switch (usdtPackages.get(packageId)) {
      case (?pkg) { pkg };
      case (null) {
        Runtime.trap("Invalid package");
      };
    };

    let orderId = orderIdCounter;
    let order : UsdtOrder = {
      id = orderId;
      buyer = caller;
      buyerName;
      buyerContact;
      packagePrice = usdtPackage.price;
      packageAmount = usdtPackage.amount;
      isCompleted = false;
    };

    usdtOrders.add(orderId, order);
    orderIdCounter += 1;
    orderId;
  };

  // Owner or Admin can view specific order
  public query ({ caller }) func getOrder(orderId : Nat) : async UsdtOrderView {
    switch (usdtOrders.get(orderId)) {
      case (?order) {
        // Check if caller is the order owner or an admin
        if (caller != order.buyer and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Can only view your own orders");
        };

        {
          id = order.id;
          buyer = order.buyer;
          buyerName = order.buyerName;
          buyerContact = order.buyerContact;
          packagePrice = order.packagePrice;
          packageAmount = order.packageAmount;
          isCompleted = order.isCompleted;
        };
      };
      case (null) {
        Runtime.trap("Order not found");
      };
    };
  };

  // Admin-only: View all orders
  public query ({ caller }) func getAllOrders() : async [UsdtOrderView] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all orders");
    };

    let iter = usdtOrders.values();
    iter.map<UsdtOrder, UsdtOrderView>(
      func(order) {
        {
          id = order.id;
          buyer = order.buyer;
          buyerName = order.buyerName;
          buyerContact = order.buyerContact;
          packagePrice = order.packagePrice;
          packageAmount = order.packageAmount;
          isCompleted = order.isCompleted;
        };
      }
    ).toArray().sort();
  };

  // Admin-only: Update order status
  public shared ({ caller }) func updateOrderStatus(orderId : Nat, isCompleted : Bool) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update order status");
    };

    switch (usdtOrders.get(orderId)) {
      case (?order) {
        let updatedOrder : UsdtOrder = {
          id = order.id;
          buyer = order.buyer;
          buyerName = order.buyerName;
          buyerContact = order.buyerContact;
          packagePrice = order.packagePrice;
          packageAmount = order.packageAmount;
          isCompleted;
        };
        usdtOrders.add(orderId, updatedOrder);
      };
      case (null) {
        Runtime.trap("Order not found");
      };
    };
  };
};
