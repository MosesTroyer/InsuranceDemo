import React from 'react';
import {Address} from "../models/address";
import {Vehicle} from "../models/vehicle";
import axios from 'axios';

interface IApplicationFormSubmission {
    firstName: string;
    lastName: string;
    dob: string;
    address: Address;
    vehicles: Vehicle[];
    id: string;
}

interface ApplicationFormSubmissionState {
    error: boolean;
    price: number;
}

export class ApplicationFormSubmission extends React.Component<IApplicationFormSubmission, ApplicationFormSubmissionState> {

    constructor(props: IApplicationFormSubmission) {
        super(props);

        this.state = {
            error: false,
            price: 0,
        }

    }

    displayPriceQuote(): void {

    }

    submitApplication(): void {
        axios.post(`/api/application/${ this.props.id }/validate`, {
            firstName: this.props.firstName,
            lastName: this.props.lastName,
            dob: this.props.dob,
            address: this.props.address,
            vehicles: this.props.vehicles,
        })
            .then((response) => {
                console.log(response);
                this.setState({
                    error: false,
                    price: response.data.price
                });
            })
            .catch((error) => {
                console.error(error);
                this.setState({ error: true });
            });
    }

    render() {
        return (
            <div>
                <button onClick={ () => this.submitApplication() }>
                    Submit Application
                </button>

                <br />

                { this.state.error ?
                    <div>Unable to validate application- please resolve any errors.</div>
                    : <div />
                }

                { !(this.state.error) && this.state.price ?
                    <div>Congratulations! You are approved to pay: ${ this.state.price }</div>
                    : <div />
                }
            </div>
        );
    }
}