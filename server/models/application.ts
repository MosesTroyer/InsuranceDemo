import { validateDate, validateString } from '../utilities/inputValidators';
import { Address } from './address';
import { Vehicle } from './vehicle';

export class Application {

    firstName: string;
    lastName: string;
    dob: Date;
    address: Address;
    vehicles: Vehicle[];

    constructor(inputString: string) {

        // TODO test bad input
        const input = JSON.parse(inputString);

        this.firstName = validateString(input, 'firstName');
        this.lastName = validateString(input, 'lastName');
        this.dob = validateDate(input, 'dob');
        this.address = new Address(input.address);

        const vehicles = input['vehicles'];
        if (!Array.isArray(vehicles)) {
            throw new Error('Unable to parse provided vehicles.');
        }
        if (vehicles.length > 3 || vehicles.length === 0) {
            throw new Error('Incorrect amount of vehicles');
        }

        this.vehicles = vehicles.map(v => new Vehicle(v));
    }

    // JSON string with fields that are safe to send to front-end
    toString(): string {
        return JSON.stringify({
            firstName: this.firstName,
            lastName: this.lastName,
            dob: this.dob,
            address: this.address,
            vehicles: this.vehicles,
        })
    }
}