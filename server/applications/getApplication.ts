import { Application } from '../models/application';
import { MemoryDatabase } from '../db/memoryDatabase';

export function getApplication(applicationId: string): Application | undefined {
    return MemoryDatabase.GetInstance().getApplication(applicationId);
}