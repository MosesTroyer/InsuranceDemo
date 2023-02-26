import React from 'react';
import {ValidatedTextField} from "./ValidatedTextField";
import {Address} from "../models/address";
import {ValidatedNumberField} from "./ValidatedNumberField";
import {Vehicle} from "../models/vehicle";
import {ValidatedYearField} from "./ValidatedYearField";

interface IVehicleForm {
    vehicle: Vehicle;
    onChange: (value: Vehicle) => any;
    onDelete: () => void;
}

interface VehicleFormState {

}

export class VehicleForm extends React.Component<IVehicleForm, VehicleFormState> {

    constructor(props: IVehicleForm) {
        super(props);

        this.state = {

        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(vehicle: Vehicle) {
        this.props.onChange(vehicle);
    }

    render() {
        return (
            <div className='form'>
                <button onClick={ this.props.onDelete }>
                    Remove Vehicle
                </button>

                <ValidatedTextField
                    label={'VIN'}
                    value={ this.props.vehicle.vin }
                    onChange={
                        (vin: string) => {
                            this.handleChange({
                                ...this.props.vehicle,
                                vin
                            });
                        }
                    }
                />

                <br />

                <ValidatedTextField
                    label={'Make'}
                    value={ this.props.vehicle.make }
                    onChange={
                        (make: string) => {
                            this.handleChange({
                                ...this.props.vehicle,
                                make
                            });
                        }
                    }
                />

                <br />

                <ValidatedTextField
                    label={'Model'}
                    value={ this.props.vehicle.model }
                    onChange={
                        (model: string) => {
                            this.handleChange({
                                ...this.props.vehicle,
                                model
                            });
                        }
                    }
                />

                <br />

                <ValidatedYearField
                    value={ this.props.vehicle.year }
                    onChange={
                        (year: number) => {
                            this.handleChange({
                                ...this.props.vehicle,
                                year
                            });
                        }
                    }
                />
            </div>
        );
    }
}