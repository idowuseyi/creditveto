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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const express_1 = require("express");
const PDFDocument = require("pdfkit");
const swagger_1 = require("@nestjs/swagger");
let AiController = class AiController {
    generateLetter(body) {
        const { disputeType, details } = body;
        return {
            letter: `Dear Sir/Madam,\n\nI am writing to dispute the following item on my credit report: ${disputeType}. Details: ${details}.\n\nPlease investigate and correct this as soon as possible.\n\nSincerely,\n[Your Name]`,
        };
    }
    async generateLetterPdf(body, res) {
        const { disputeType, details } = body;
        const letter = `Dear Sir/Madam,\n\nI am writing to dispute the following item on my credit report: ${disputeType}. Details: ${details}.\n\nPlease investigate and correct this as soon as possible.\n\nSincerely,\n[Your Name]`;
        const doc = new PDFDocument();
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=dispute_letter.pdf');
        doc.text(letter);
        doc.pipe(res);
        doc.end();
    }
};
exports.AiController = AiController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('generate-letter'),
    (0, swagger_1.ApiOperation)({ summary: 'Generate dispute letter using AI' }),
    (0, swagger_1.ApiBody)({ schema: { properties: { disputeType: { type: 'string' }, details: { type: 'string' } } } }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'AI-generated letter', schema: { properties: { letter: { type: 'string' } } } }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AiController.prototype, "generateLetter", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('generate-letter-pdf'),
    (0, swagger_1.ApiOperation)({ summary: 'Generate dispute letter as PDF' }),
    (0, swagger_1.ApiBody)({ schema: { properties: { disputeType: { type: 'string' }, details: { type: 'string' } } } }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'PDF file' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_a = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "generateLetterPdf", null);
exports.AiController = AiController = __decorate([
    (0, swagger_1.ApiTags)('ai'),
    (0, common_1.Controller)('ai')
], AiController);
//# sourceMappingURL=ai.controller.js.map