import { validateNumber, validateString } from '../utilities/inputValidators';

export class Vehicle {

    vin: string;
    year: number;
    make: string;
    model: string;

    constructor(input: any) {
        if (!input) {
            throw new Error('Vehicle input was not provided.');
        }

        this.vin = validateString(input, 'vin');
        this.make = validateString(input, 'make');
        this.model = validateString(input, 'model')

        const year = validateNumber(input, 'year');

        if (year < 1985 || year > new Date().getFullYear() + 1) {
            throw new Error('Year is invalid.');
        }

        this.year = year;
    }
}