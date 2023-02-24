import 'jest';
import { Application } from './application';

describe('Address', () => {
    it('Should throw on bad first name', () => {
        expect(() => { new Application({
                firstName: 123
            })
        }).toThrowError(`Unable to validate firstName`);
    });

    it('Should throw on bad last name', () => {
        expect(() => { new Application({
                firstName: 'Joseph',
                lastName: 123,
            })
        }).toThrowError(`Unable to validate lastName`);
    });

    it('Should throw on bad dob', () => {
        expect(() => { new Application({
                firstName: 'Joseph',
                lastName: 'Joestar',
                dob: 'bad'
            })
        }).toThrowError(`Unable to validate dob`);
    });

    it('Should throw on bad vehicles array', () => {
        expect(() => { new Application({
                firstName: 'Joseph',
                lastName: 'Joestar',
                dob: '9/27/1920',
                address: {
                    street: '558 Broadway',
                    city: 'New York',
                    state: 'New York',
                    zipCode: 10012,
                },
                vehicles: 'honda'
            })
        }).toThrowError(`Unable to parse provided vehicles.`);
    });

    it('Should throw on bad vehicles length', () => {
        expect(() => { new Application({
                firstName: 'Joseph',
                lastName: 'Joestar',
                dob: '9/27/1920',
                address: {
                    street: '558 Broadway',
                    city: 'New York',
                    state: 'New York',
                    zipCode: 10012,
                },
                vehicles: [],
            })
        }).toThrowError(`Incorrect amount of vehicles`);

        expect(() => { new Application({
                firstName: 'Joseph',
                lastName: 'Joestar',
                dob: '9/27/1920',
                address: {
                    street: '558 Broadway',
                    city: 'New York',
                    state: 'New York',
                    zipCode: 10012,
                },
                vehicles: ['Honda', 'Volvo', 'Fiat', 'Toy Yoda'],
            })
        }).toThrowError(`Incorrect amount of vehicles`);
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