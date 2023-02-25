import React from 'react';
import {ValidatedTextField} from "./ValidatedTextField";
import {Address} from "../models/address";
import {ValidatedNumberField} from "./ValidatedNumberField";
import {Vehicle} from "../models/vehicle";
import {VehicleForm} from "./VehicleForm";

interface IVehicleContainer {
    vehicles: Vehicle[];
    onChange: (value: Vehicle[]) => any;
}

interface VehicleContainerState {

}

export class VehicleContainer extends React.Component<IVehicleContainer, VehicleContainerState> {

    constructor(props: IVehicleContainer) {
        super(props);

        this.state = {

        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(vehicles: Vehicle[]) {
        this.props.onChange(vehicles);
    }

    render() {
        return (
            <div className="vehicleContainer">

                <button onClick={
                    () => this.handleChange([
                        ...this.props.vehicles,
                        new Vehicle()
                    ])
                } disabled={ this.props.vehicles.length >= 3 }>Add Vehicle</button>

                {
                   this.props.vehicles.map((vehicle: Vehicle, i: number) => {
                       return <VehicleForm key={ i }
                           vehicle={vehicle}
                           onChange={ (vehicle: Vehicle) => {
                               const vehicles = [...this.props.vehicles];
                               vehicles[i] = vehicle;
                               this.handleChange(vehicles);
                           }}
                           onDelete={ () => {
                               const vehicles = [...this.props.vehicles];
                               vehicles.splice(i, 1)
                               this.handleChange(vehicles);
                           }}
                       />
                   })
                }

            </div>
        );
    }
}