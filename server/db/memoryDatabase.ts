import { Application } from '../models/application';
import * as crypto from "crypto";

export class MemoryDatabase {

    private static instance: MemoryDatabase;

    static GetInstance(): MemoryDatabase {
        if (this.instance) {
            return this.instance;
        }

        this.instance = new MemoryDatabase();
        return this.instance;
    }

    private applications: Map<string, Application> = new Map<string, Application>();

    getApplication(applicationId: string): Application | undefined {
        if (!this.applications.has(applicationId)) {
            return undefined;
        }

        return this.applications.get(applicationId);
    }

    insertApplication(application: Application): string {
        const id = crypto.randomUUID();

        this.applications.set(id, application);

        return id;
    }

}