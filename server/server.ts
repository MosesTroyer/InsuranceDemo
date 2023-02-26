import express, { Request, Response } from 'express';
import { getApplication, tryInsertApplication, tryUpdateApplication } from './controller/application';

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
    let applicationId = tryInsertApplication(req.body);

    res
        .status(200)
        .send(JSON.stringify({
            redirect: `http://localhost:3000/application/${ applicationId }`,
        }));
});

insuranceDemo.put('/api/application/:applicationId', (req: Request, res: Response) => {
    const result = tryUpdateApplication(req.params.applicationId, req.body);

    if (!result) {
        res
            .status(404)
            .end();
        return;
    }

    res
        .status(200)
        .end();
});

insuranceDemo.post('/api/application/:applicationId/validate', (req: Request, res: Response) => {
    const result = tryUpdateApplication(req.params.applicationId, req.body);

    if (!result) {
        res
            .status(404)
            .end();
        return;
    }

    const validationResult = getApplication(req.params.applicationId)?.validate();

    if (!validationResult) {
        res.status(400).end();
        return;
    }

    res
        .setHeader('Content-Type', 'application/json')
        .status(200)
        .send(JSON.stringify({
            price: Math.floor(Math.random() * 100)
        }));
});

export default insuranceDemo;