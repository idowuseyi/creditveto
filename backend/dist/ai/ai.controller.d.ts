import { Response } from 'express';
export declare class AiController {
    generateLetter(body: any): {
        letter: string;
    };
    generateLetterPdf(body: any, res: Response): Promise<void>;
}
