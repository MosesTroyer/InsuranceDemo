import 'jest';
import insuranceDemo from './server';
import {MemoryDatabase} from "./db/memoryDatabase";
import {Application} from "./models/application";

const request = require('supertest');

describe('API Tests', () => {

    describe('Get Application', () => {
        it('Should return 404 for no application', () => {
            request(insuranceDemo)
                .get('/api/application/ABC123')
                .end((err: any, res: any) => {
                    expect(res.statusCode).toBe(404);
                });
        });

        it('Should return application', () => {

            const application = {
                firstName: 'Joseph',
                lastName: 'Joestar',
                dob: '1920-09-27T05:00:00.000Z',
                address: {
                    street: '558 Broadway',
                    city: 'New York',
                    state: 'New York',
                    zipCode: 10012,
                },
                vehicles: [
                    {
                        vin: 'ABC123',
                        make: 'Honda',
                        model: 'Civic',
                        year: 2017,
                    }
                ],
            };

            const id = MemoryDatabase.GetInstance().insertApplication(new Application(application));

            request(insuranceDemo)
                .get(`/api/application/${ id }`)
                .end((err: any, res: any) => {
                    expect(res.statusCode).toBe(200);
                    expect(res.text).toBe(JSON.stringify(application))
                });
        });
    });

    describe('Post Application', () => {
        it('Should return 400 for bad data', async () => {
           await request(insuranceDemo)
               .post(`/api/application`)
               .set('Content-Type', 'application/json')
               .send(JSON.stringify({
                   empty: 'emptyData'
               }))
               .then((res: any) => {
                   expect(res.statusCode).toBe(400);
               });
        });

        //TODO refactor to check id
        it('Should return id for new application', async () => {
            await request(insuranceDemo)
                .post(`/api/application`)
                .send({
                    firstName: 'Joseph',
                    lastName: 'Joestar',
                    dob: '1920-09-27T05:00:00.000Z',
                    address: {
                        street: '558 Broadway',
                        city: 'New York',
                        state: 'New York',
                        zipCode: 10012,
                    },
                    vehicles: [
                        {
                            vin: 'ABC123',
                            make: 'Honda',
                            model: 'Civic',
                            year: 2017,
                        }
                    ],
                })
                .then((res: any) => {
                    expect(res.statusCode).toBe(200);
                });
        });
    });
});

