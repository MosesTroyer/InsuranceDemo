import { cleanNumber, cleanString } from '../utilities/inputValidators';

export class Vehicle {

    vin: string;
    year: number;
    make: string;
    model: string;

    constructor(input: any) {
        if (!input) {
            throw new Error('Vehicle input was not provided.');
        }

        this.vin = cleanString(input, 'vin');
        this.make = cleanString(input, 'make');
        this.model = cleanString(input, 'model')
        this.year = cleanNumber(input, 'year');
    }

    validate(): boolean {
        return !(this.year < 1985
            || this.year > new Date().getFullYear() + 1
            || this.vin === ''
            || this.make === ''
            || this.model === ''
        );
    }
}