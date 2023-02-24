import { Application } from '../models/application';
import { MemoryDatabase } from '../db/memoryDatabase';

const db = MemoryDatabase.GetInstance();

export function getApplication(applicationId: string): Application | undefined {
    return db.getApplication(applicationId);
}

export function tryInsertApplication(input: any): string {
    return db.insertApplication(new Application(input));
}