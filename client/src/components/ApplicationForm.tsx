import React from 'react';
import {ValidatedTextField} from "./ValidatedTextField";
import {ValidatedAgeField} from "./ValidatedAgeField";
import {AddressForm} from "./AddressForm";
import {Address} from "../models/address";
import {Vehicle} from "../models/vehicle";
import {VehicleContainer} from "./VehicleContainer";

interface IApplicationForm {
}

interface ApplicationFormState {
    firstName: string;
    lastName: string;
    dob: string;
    address: Address;
    vehicles: Vehicle[];
}

export class ApplicationForm extends React.Component<IApplicationForm, ApplicationFormState> {

    constructor(props: IApplicationForm) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            dob: '',
            address: new Address(),
            vehicles: [
                new Vehicle()
            ],
        }
    }

    render() {
        return (
            <div className="applicationForm">

                <ValidatedTextField
                    label={'First Name'}
                    value={ this.state.firstName }
                    onChange={ (v) => this.setState({ firstName: v }) }
                />

                <br />

                <ValidatedTextField
                    label={'Last Name'}
                    value={ this.state.lastName }
                    onChange={ (v) => this.setState({ lastName: v }) }
                />

                <br />

                <ValidatedAgeField
                    value={ this.state.dob }
                    onChange={ (v) => this.setState({ dob: v }) }
                />

                <br />

                <AddressForm
                    address={ this.state.address }
                    onChange={ (address: Address) => this.setState({ address }) } />

                <br />

                <VehicleContainer
                    vehicles={ this.state.vehicles }
                    onChange={ (vehicles: Vehicle[]) => {
                        this.setState({ vehicles })
                    } }
                />


            </div>
        );
    }
}