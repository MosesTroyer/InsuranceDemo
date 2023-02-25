import { cleanNumber, cleanString } from '../utilities/inputValidators';

export class Address {

    street: string;
    city: string;
    state: string;
    zipCode: number;

    constructor(input: any) {
        if (!input) {
            input = {};
        }

        this.street = cleanString(input, 'street');
        this.city = cleanString(input, 'city');
        this.state = cleanString(input, 'state');
        this.zipCode = cleanNumber(input, 'zipCode')
    }

    validate(): boolean {
        return !(
            this.street === ''
            || this.city === ''
            || this.state === ''
            || this.zipCode === 0
        );
    }
}