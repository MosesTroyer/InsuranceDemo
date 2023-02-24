import { Application } from '../models/application';
import { MemoryDatabase } from '../db/memoryDatabase';

export function getApplication(applicationId: string): Application | null {
    return MemoryDatabase.GetInstance().getApplication(applicationId);
}