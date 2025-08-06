import { Controller, Post, Body, UseGuards, Res } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Response } from 'express';
import * as PDFDocument from 'pdfkit';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';

@ApiTags('ai')
@Controller('ai')
export class AiController {
  @UseGuards(JwtAuthGuard)
  @Post('generate-letter')
  @ApiOperation({ summary: 'Generate dispute letter using AI' })
  @ApiBody({ schema: { properties: { disputeType: { type: 'string' }, details: { type: 'string' } } } })
  @ApiResponse({ status: 201, description: 'AI-generated letter', schema: { properties: { letter: { type: 'string' } } } })
  generateLetter(@Body() body) {
    // Mocked AI letter generation
    const { disputeType, details } = body;
    return {
      letter: `Dear Sir/Madam,\n\nI am writing to dispute the following item on my credit report: ${disputeType}. Details: ${details}.\n\nPlease investigate and correct this as soon as possible.\n\nSincerely,\n[Your Name]`,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('generate-letter-pdf')
  @ApiOperation({ summary: 'Generate dispute letter as PDF' })
  @ApiBody({ schema: { properties: { disputeType: { type: 'string' }, details: { type: 'string' } } } })
  @ApiResponse({ status: 201, description: 'PDF file' })
  async generateLetterPdf(@Body() body, @Res() res: Response) {
    const { disputeType, details } = body;
    const letter = `Dear Sir/Madam,\n\nI am writing to dispute the following item on my credit report: ${disputeType}. Details: ${details}.\n\nPlease investigate and correct this as soon as possible.\n\nSincerely,\n[Your Name]`;
    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=dispute_letter.pdf');
    doc.text(letter);
    doc.pipe(res);
    doc.end();
  }
}
