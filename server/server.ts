import express, {Request, Response} from "express";
import {getApplication} from "./applications/getApplication";

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

export default insuranceDemo;