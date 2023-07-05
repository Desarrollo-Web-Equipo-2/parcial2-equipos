import { Request, Response } from 'express';
import Company from '../interfaces/company.interface';
import { getPeopleInCompany } from './person.controller';

const companyDb: Company[] = [];
let nextId: number = 1;

function getCompanyIndexById(companyId: number, userId: number): number {
    return companyDb.findIndex(x => x.id === companyId && x.userId === userId);
}

export function getCompanyById(companyId: number, userId: number): Company | undefined {
    const index = getCompanyIndexById(companyId, userId);
    if (index >= 0) {
        return companyDb[index];
    }
}

export async function createCompany(req: Request, res: Response) {
    /*
        body: {
            name: string,
            url: string;
            notes: string;
        }
    */

    const userId = (req as any).userId as number;

    // if (!(req.body.name instanceof String)) {
    //     return res.status(400).json({
    //         code: 'INVALID_TYPE',
    //     });
    // }

    // if (!(req.body.url instanceof String)) {
    //     return res.status(400).json({
    //         code: 'INVALID_TYPE',
    //     });
    // }

    // if (!(req.body.notes instanceof String)) {
    //     return res.status(400).json({
    //         code: 'INVALID_TYPE',
    //     });
    // }

    const company: Company = {
        id: nextId++,
        userId,
        name: req.body.name,
        url: req.body.url,
        notes: req.body.notes,
    };

    companyDb.push(company);

    res.json(company);
}

export async function deleteCompany(req: Request, res: Response) {
    const userId = (req as any).userId as number;
    const companyId = Number(req.params.companyId);

    const index = getCompanyIndexById(companyId, userId);

    if (index >= 0) {
        if (getPeopleInCompany(companyId, userId).length > 0) {
            return res.status(400).json({
                code: 'COMPANY_IS_NOT_EMPTY',
            });
        }
        companyDb.splice(index, 1);
        res.status(200).send();
    } else {
        return res.status(404).json({
            code: 'COMPANY_NOT_FOUND',
        });
    }
}

export function getAllCompanies(req: Request, res: Response) {
    const userId = (req as any).userId as number;
    res.json(companyDb.filter(x => x.userId === userId));
}

export function getCompany(req: Request, res: Response) {
    const userId = (req as any).userId as number;
    const companyId = Number(req.params.companyId);

    const company = getCompanyById(companyId, userId);
    if (company) {
        res.json(company);
    } else {
        res.status(404).send();
    }
}