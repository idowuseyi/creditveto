"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreditProfileController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const credit_provider_adapter_1 = require("./credit-provider.adapter");
const swagger_1 = require("@nestjs/swagger");
let CreditProfileController = class CreditProfileController {
    constructor(creditProvider) {
        this.creditProvider = creditProvider;
    }
    async getProfile(req) {
        return this.creditProvider.getProfile(req.user.userId);
    }
};
exports.CreditProfileController = CreditProfileController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get user credit profile (mocked)' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CreditProfileController.prototype, "getProfile", null);
exports.CreditProfileController = CreditProfileController = __decorate([
    (0, swagger_1.ApiTags)('credit-profile'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('credit-profile'),
    __metadata("design:paramtypes", [credit_provider_adapter_1.MockCreditProvider])
], CreditProfileController);
//# sourceMappingURL=credit-profile.controller.js.map