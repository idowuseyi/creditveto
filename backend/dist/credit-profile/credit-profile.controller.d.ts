import { MockCreditProvider } from './credit-provider.adapter';
export declare class CreditProfileController {
    private readonly creditProvider;
    constructor(creditProvider: MockCreditProvider);
    getProfile(req: any): Promise<any>;
}
