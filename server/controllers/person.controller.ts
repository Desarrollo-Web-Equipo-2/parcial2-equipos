import { Request, Response } from 'express';
import Person from '../interfaces/person.interface';

import { getCompanyById } from './company.controller';

const personDb: Person[] = [];
let nextId: number = 1;

export function getPersonIndexById(personId: number, userId: number): number {
    return personDb.findIndex(x => x.id === personId && x.userId === userId);
}

export function getPersonById(personId: number, userId: number): Person | undefined {
    return personDb.find(x => x.id === personId && x.userId === userId);
}

export function getPeopleInCompany(companyId: number, userId: number): Person[] {
    return personDb.filter(x => x.companyId === companyId && x.userId === userId);
}

export function createPerson(req: Request, res: Response) {
    const userId = (req as any).userId as number;
    const companyId = Number(req.body.companyId);

    if (!getCompanyById(companyId, userId)) {
        return res.status(404).json({
            code: 'COMPANY_NOT_FOUND',
        });
    }

    const person: Person = {
        id: nextId++,
        companyId,
        userId,
        names: req.body.names,
        surnames: req.body.surnames,
        email: req.body.email,
        telephoneNumber: req.body.telephoneNumber,
        notes: req.body.notes,
    };

    personDb.push(person);

    res.json(person);
}

export function deletePerson(req: Request, res: Response) {
    const userId = (req as any).userId as number;
    const personId = Number(req.params.personId);

    const personIndex = getPersonIndexById(personId, userId);
    if (personIndex == -1) {
        return res.status(404).json({
            code: 'PERSON_NOT_FOUND',
        });
    }

    personDb.splice(personIndex, 1);

    res.status(200).send();
}

export function getPerson(req: Request, res: Response) {
    const userId = (req as any).userId as number;
    const personId = Number(req.params.personId);

    const person = personDb.find(x => x.userId === userId && x.id == personId);
    if (person) {
        res.json(person);
    } else {
        res.status(404).send();
    }
}


export function filterPerson(req: Request, res: Response) {
    const userId = (req as any).userId as number;

    const name = ((req.query.name || '') as string).toLowerCase();
    const surname = ((req.query.surname || '') as string).toLowerCase();

    const filterByName = (x: Person): boolean => {
        const nameFound = name === '' || x.names.toLowerCase().search(name) !== -1;
        const surnameFound = surname === '' || x.surnames.toLowerCase().search(surname) !== -1;

        if (name || surname) {
            return nameFound && surnameFound;
        } else {
            return true;
        }
    };

    const found = personDb.filter(x => x.userId === userId
                                    && filterByName(x)); 
    res.json(found);
}