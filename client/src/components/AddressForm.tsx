import React from 'react';
import {ValidatedTextField} from "./ValidatedTextField";
import {Address} from "../models/address";
import {ValidatedNumberField} from "./ValidatedNumberField";

interface IAddressForm {
    address: Address;
    onChange: (value: Address) => any;
}

interface AddressFormState {

}

export class AddressForm extends React.Component<IAddressForm, AddressFormState> {

    constructor(props: IAddressForm) {
        super(props);

        this.state = {

        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(address: Address) {
        this.props.onChange(address);
    }

    render() {
        return (
            <div className="addressForm">

                <ValidatedTextField
                    label={'Street Address'}
                    value={ this.props.address.street }
                    onChange={
                        (street: string) => {
                            this.handleChange({
                                ...this.props.address,
                                street
                            });
                        }
                    }
                />

                <br />

                <ValidatedTextField
                    label={'City'}
                    value={ this.props.address.city }
                    onChange={
                        (city: string) => {
                            this.handleChange({
                                ...this.props.address,
                                city
                            });
                        }
                    }
                />

                <br />

                <ValidatedTextField
                    label={'State'}
                    value={ this.props.address.state }
                    onChange={
                        (state: string) => {
                            this.handleChange({
                                ...this.props.address,
                                state
                            });
                        }
                    }
                />

                <br />

                <ValidatedNumberField
                    label={'Zip Code'}
                    value={ this.props.address.zipCode }
                    onChange={
                        (zipCode: number) => {
                            this.handleChange({
                                ...this.props.address,
                                zipCode
                            });
                        }
                    }
                />

            </div>
        );
    }
}