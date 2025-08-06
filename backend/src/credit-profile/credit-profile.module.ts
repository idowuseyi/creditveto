import { Module } from '@nestjs/common';
import { CreditProfileController } from './credit-profile.controller';
import { MockCreditProvider } from './credit-provider.adapter';

@Module({
  imports: [],
  controllers: [CreditProfileController],
  providers: [MockCreditProvider],
  exports: [MockCreditProvider],
})
export class CreditProfileModule { }
