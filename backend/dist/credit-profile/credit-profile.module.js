"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreditProfileModule = void 0;
const common_1 = require("@nestjs/common");
const credit_profile_controller_1 = require("./credit-profile.controller");
const credit_provider_adapter_1 = require("./credit-provider.adapter");
let CreditProfileModule = class CreditProfileModule {
};
exports.CreditProfileModule = CreditProfileModule;
exports.CreditProfileModule = CreditProfileModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [credit_profile_controller_1.CreditProfileController],
        providers: [credit_provider_adapter_1.MockCreditProvider],
        exports: [credit_provider_adapter_1.MockCreditProvider],
    })
], CreditProfileModule);
//# sourceMappingURL=credit-profile.module.js.map