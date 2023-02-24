import express from 'express';
import { Request, Response } from 'express';

import { getApplication } from './applications/getApplication';

const PORT = 3001;
const insuranceDemo = express();

insuranceDemo.get('/api/application/:applicationId', (req: Request, res: Response) => {
    const application = getApplication(req.params.applicationId);

    if (!application) {
        res.status(404).end();
        return;
    }

    res
        .status(200)
        .end(

        );
});

insuranceDemo.listen(PORT, () => {
    console.log(`Insurance Demo Server listening on: ${ PORT }`);
});
