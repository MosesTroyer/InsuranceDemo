import 'jest';
import { Application } from './application';

describe('Address', () => {
    it('Should clean bad input', () => {
        const application = new Application({
            firstName: 123,
            lastName: 123,
            dob: 'bad',
            vehicles: ['Honda'],
        });

        expect(application.firstName).toBe('');
        expect(application.lastName).toBe('');
        expect(application.dob).toBeInstanceOf(Date);
        expect(application.vehicles.length).toBe(1);
    });

    it('Should validate on good data', () => {
        expect(new Application({
            firstName: 'Joseph',
            lastName: 'Joestar',
            dob: '9/27/1920',
            address: {
                street: '558 Broadway',
                city: 'New York',
                state: 'New York',
                zipCode: 10012,
            },
            vehicles: [{make: 'Honda', model: 'Civic', year: 2017, vin: 'ABC123'}],
        }).validate()).toBeTruthy();
    });

    it('Should validate on bad data', () => {
        expect(new Application({
            firstName: 'Joseph',
            lastName: 'Joestar',
            dob: new Date().toString(),
            address: {
                street: '558 Broadway',
                city: 'New York',
                state: 'New York',
                zipCode: 10012,
            },
            vehicles: [{make: 'Honda', model: 'Civic', year: 2017, vin: 'ABC123'}],
        }).validate()).toBeFalsy();

        expect(new Application({
            lastName: 'Joestar',
            dob: '9/27/1920',
            address: {
                street: '558 Broadway',
                city: 'New York',
                state: 'New York',
                zipCode: 10012,
            },
            vehicles: [{make: 'Honda', model: 'Civic', year: 2017, vin: 'ABC123'}],
        }).validate()).toBeFalsy();

        expect(new Application({
            firstName: 'Joseph',
            dob: '9/27/1920',
            address: {
                street: '558 Broadway',
                city: 'New York',
                state: 'New York',
                zipCode: 10012,
            },
            vehicles: [{make: 'Honda', model: 'Civic', year: 2017, vin: 'ABC123'}],
        }).validate()).toBeFalsy();

        expect(new Application({
            firstName: 'Joseph',
            lastName: 'Joestar',
            address: {
                street: '558 Broadway',
                city: 'New York',
                state: 'New York',
                zipCode: 10012,
            },
            vehicles: [{make: 'Honda', model: 'Civic', year: 2017, vin: 'ABC123'}],
        }).validate()).toBeFalsy();

        expect(new Application({
            firstName: 'Joseph',
            lastName: 'Joestar',
            dob: '9/27/1920',
            vehicles: [{make: 'Honda', model: 'Civic', year: 2017, vin: 'ABC123'}],
        }).validate()).toBeFalsy();

        expect(new Application({
            firstName: 'Joseph',
            lastName: 'Joestar',
            dob: '9/27/1920',
            address: {
                street: '558 Broadway',
                city: 'New York',
                state: 'New York',
                zipCode: 10012,
            },
            vehicles: [{make: 'Honda', model: 'Civic', year: 2017, vin: 'ABC123'},
                {make: 'Honda', model: 'Civic', year: 2017, vin: 'ABC123'},
                {make: 'Honda', model: 'Civic', year: 2017, vin: 'ABC123'},
                {make: 'Honda', model: 'Civic', year: 2017, vin: 'ABC123'}],
        }).validate()).toBeFalsy();
    });

    it('Should return clean address', () => {
        expect(new Application({
            firstName: 'Joseph',
            lastName: 'Joestar',
            dob: '9/27/1920',
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
        }).toString()).toBe(JSON.stringify({
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
            }))
    });
});