import React from 'react';
import {ValidatedTextField} from "./ValidatedTextField";
import {ValidatedAgeField} from "./ValidatedAgeField";
import {AddressForm} from "./AddressForm";
import {Address} from "../models/address";
import {Vehicle} from "../models/vehicle";
import {VehicleContainer} from "./VehicleContainer";
import { Subject, Subscription, debounce, interval } from 'rxjs';
import axios from 'axios';
import {ApplicationFormSubmission} from "./ApplicationFormSubmission";
import './ApplicationForm.css';

interface IApplicationForm {

}

interface ApplicationFormState {
    firstName: string;
    lastName: string;
    dob: string;
    address: Address;
    vehicles: Vehicle[];

    loading: boolean;
    id: string;
}

export class ApplicationForm extends React.Component<IApplicationForm, ApplicationFormState> {

    private onChange: Subject<void> = new Subject();
    private applicationUpdater: Subscription | undefined;

    constructor(props: IApplicationForm) {
        super(props);

        this.state = {
            id: window.location.href.split('/')[4],
            loading: true,

            firstName: '',
            lastName: '',
            dob: '',
            address: new Address(),
            vehicles: [
                new Vehicle()
            ],
        };
    }

    componentDidMount() {
        axios.get(`/api/application/${ this.state.id }`)
            .then((result) => {
                this.setState({
                    address: result.data.address,
                    dob: result.data.dob,
                    firstName: result.data.firstName,
                    lastName: result.data.lastName,
                    vehicles: result.data.vehicles,
                    loading: false,
                })
            });

        this.applicationUpdater = this.onChange
            .pipe(
                debounce(_ => interval(5000))
            )
            .subscribe(_ => {
                axios.put(`/api/application/${ this.state.id }`, {
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    dob: this.state.dob,
                    address: this.state.address,
                    vehicles: this.state.vehicles,
                })
                    .then((response) => {
                        console.debug('Updated data.')
                    });
            });
    }

    componentWillUnmount() {
        if (this.applicationUpdater) {
            this.applicationUpdater.unsubscribe();
        }
    }

    render() {
        let content = <div>Loading data...</div>;

        if (!this.state.loading) {
            content = <div className='form'>
                <div className='formTitle'>
                    Your Application
                </div>

                <div className='applicationStructure'>
                    <div>
                        <ValidatedTextField
                            label={'First Name'}
                            value={ this.state.firstName }
                            onChange={ (v) => {
                                this.setState({ firstName: v });
                                this.onChange.next();
                            } }
                        />

                        <br />

                        <ValidatedTextField
                            label={'Last Name'}
                            value={ this.state.lastName }
                            onChange={ (v) => {
                                this.setState({ lastName: v });
                                this.onChange.next();
                            } }
                        />

                        <br />

                        <ValidatedAgeField
                            value={ this.state.dob }
                            onChange={ (v) => {
                                this.setState({ dob: v });
                                this.onChange.next();
                            } }
                        />

                        <br />

                        <AddressForm
                            address={ this.state.address }
                            onChange={ (address: Address) => {
                                this.setState({ address });
                                this.onChange.next();
                            } } />
                    </div>

                    <div className='vehicleContainer'>
                        <VehicleContainer
                            vehicles={ this.state.vehicles }
                            onChange={ (vehicles: Vehicle[]) => {
                                this.setState({ vehicles });
                                this.onChange.next();
                            } }
                        />

                        <br />
                    </div>
                </div>




                <ApplicationFormSubmission
                    firstName={ this.state.firstName }
                    lastName={ this.state.lastName }
                    dob={ this.state.dob }
                    address={ this.state.address }
                    vehicles={ this.state.vehicles }
                    id={ this.state.id } />
            </div>;
        }

        return (
            <div className="applicationForm">

                { content }

            </div>
        );
    }
}