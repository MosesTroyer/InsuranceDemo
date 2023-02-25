import { cleanDate, cleanString } from '../utilities/inputValidators';
import { Address } from './address';
import { Vehicle } from './vehicle';

export class Application {

    firstName: string;
    lastName: string;
    dob: Date;
    address: Address;
    vehicles: Vehicle[];

    constructor(input: any) {
        this.firstName = cleanString(input, 'firstName');
        this.lastName = cleanString(input, 'lastName');
        this.dob = cleanDate(input, 'dob');
        this.address = new Address(input.address);

        let vehicles = input['vehicles'];
        if (!Array.isArray(vehicles)) {
            vehicles = [];
        }

        this.vehicles = vehicles.map((v: any) => new Vehicle(v));
    }

    validate(): boolean {
        if (this.firstName === ''
            || this.lastName === ''
            || (new Date().getFullYear() - this.dob.getFullYear()) < 16
        ) {
            return false;
        }

        if (this.vehicles.length > 3 || this.vehicles.length === 0) {
            return false;
        }

        for (let i = 0; i < this.vehicles.length; i++) {
            if (!this.vehicles[i].validate()) {
                return false;
            }
        }

        return this.address.validate();
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