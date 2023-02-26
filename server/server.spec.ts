import 'jest';
import insuranceDemo from './server';
import { MemoryDatabase } from './db/memoryDatabase';
import { Application } from './models/application';

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
                    expect(typeof JSON.parse(res.text).redirect).toBe('string')
                });
        });
    });

    describe('PUT Application', () => {
        it('Should return 404 on non existent id', async () => {
            await request(insuranceDemo)
                .put(`/api/application/ABC123`)
                .send({
                    firstName: 'Jotaro',
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
                    expect(res.statusCode).toBe(404);
                });
        });

        it('Should update application', async () => {

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

            await request(insuranceDemo)
                .put(`/api/application/${ id }`)
                .send({
                    firstName: 'Jotaro',
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
                    expect(MemoryDatabase.GetInstance().getApplication(id)?.firstName).toBe('Jotaro');
                });
        });
    });

    describe('Post Application', () => {
        it('Should return price for valid application', async () => {

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

            await request(insuranceDemo)
                .post(`/api/application/${ id }/validate`)
                .send(application)
                .then((res: any) => {
                    expect(res.statusCode).toBe(200);
                    expect(typeof JSON.parse(res.text).price).toBe('number');
                });
        });

        it('Should return 400 for invalid application', async () => {

            const application = {
                firstName: 'Joseph',
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

            await request(insuranceDemo)
                .post(`/api/application/${ id }/validate`)
                .then((res: any) => {
                    expect(res.statusCode).toBe(400);
                });
        });
    });
});

