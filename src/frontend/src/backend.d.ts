import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface UsdtOrderView {
    id: bigint;
    packageAmount: bigint;
    isCompleted: boolean;
    packagePrice: bigint;
    buyerContact: string;
    buyer: Principal;
    buyerName: string;
}
export interface UsdtPackage {
    id: bigint;
    price: bigint;
    amount: bigint;
}
export interface UserProfile {
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createPackage(price: bigint, amount: bigint): Promise<bigint>;
    getAllOrders(): Promise<Array<UsdtOrderView>>;
    getAllPackages(): Promise<Array<UsdtPackage>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getOrder(orderId: bigint): Promise<UsdtOrderView>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    placeOrder(buyerName: string, buyerContact: string, packageId: bigint): Promise<bigint>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateOrderStatus(orderId: bigint, isCompleted: boolean): Promise<void>;
}
