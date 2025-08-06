export interface CreditProviderAdapter {
    getProfile(userId: number): Promise<any>;
}
export declare class MockCreditProvider implements CreditProviderAdapter {
    getProfile(userId: number): Promise<any>;
}
