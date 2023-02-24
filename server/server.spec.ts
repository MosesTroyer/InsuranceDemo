import 'jest';
import insuranceDemo from './server';
import {MemoryDatabase} from "./db/memoryDatabase";
import {Application} from "./models/application";

const request = require('supertest');

describe('API Tests', () => {

    it('Should return 404 for no application', () => {
        request(insuranceDemo)
           .get('/api/application/ABC123')
           .end((err: any, res: any) => {
              expect(res.statusCode).toBe(404);
           });
    });

    it('Should return application', () => {

        const applicationString = JSON.stringify({
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
        });

        const id = MemoryDatabase.GetInstance().insertApplication(new Application(applicationString));

        request(insuranceDemo)
            .get(`/api/application/${ id }`)
            .end((err: any, res: any) => {
                expect(res.statusCode).toBe(200);
                expect(res.text).toBe(applicationString)
            });
    });

});

