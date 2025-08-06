"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockCreditProvider = void 0;
class MockCreditProvider {
    async getProfile(userId) {
        return {
            userId,
            score: 720,
            accounts: [
                { type: 'credit card', balance: 1200, status: 'open' },
                { type: 'loan', balance: 5000, status: 'closed' },
            ],
            negativeItems: [
                { type: 'late payment', date: '2024-12-01', amount: 100 },
            ],
        };
    }
}
exports.MockCreditProvider = MockCreditProvider;
//# sourceMappingURL=credit-provider.adapter.js.map