import { Application } from '../models/application';

export class MemoryDatabase {

    private static instance: MemoryDatabase;

    static GetInstance(): MemoryDatabase {
        if (this.instance) {
            return this.instance;
        }

        this.instance = new MemoryDatabase();
        return this.instance;
    }

    getApplication(applicationId: string): Application | null {
        return null;
    }

}