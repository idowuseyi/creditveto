export interface CreditProviderAdapter {
  getProfile(userId: number): Promise<any>;
}

export class MockCreditProvider implements CreditProviderAdapter {
  async getProfile(userId: number): Promise<any> {
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
