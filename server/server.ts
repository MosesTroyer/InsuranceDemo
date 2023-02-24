import express, {Request, Response} from "express";
import { getApplication, tryInsertApplication } from "./controller/application";

const insuranceDemo = express();

insuranceDemo.use(express.json())

insuranceDemo.get('/api/application/:applicationId', (req: Request, res: Response) => {
    const application = getApplication(req.params.applicationId);

    if (!application) {
        res.status(404).end();
        return;
    }

    res
        .status(200)
        .send(
            application.toString()
        );
});

insuranceDemo.post('/api/application', (req: Request, res: Response) => {
    let applicationId: string;

    try {
        applicationId = tryInsertApplication(req.body);
    } catch (e) {
        console.error(`Unable to insert application: ${ e }`);

        res.status(400).end();
        return;
    }

    res
        .status(200)
        .end();
});

export default insuranceDemo;