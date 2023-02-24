import { validateNumber, validateString } from '../utilities/inputValidators';

export class Address {

    street: string;
    city: string;
    state: string;
    zipCode: number;

    constructor(input: any) {
        if (!input) {
            throw new Error('Address input was not provided.');
        }

        this.street = validateString(input, 'street');
        this.city = validateString(input, 'city');
        this.state = validateString(input, 'state');
        this.zipCode = validateNumber(input, 'zipCode')
    }
}