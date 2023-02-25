import React from 'react';

interface IValidatedAgeField {
    value: string;
    onChange: (value: string) => any;
}

interface ValidatedAgeFieldState {
    interacted: boolean;
    errors: string[];
}

export class ValidatedAgeField extends React.Component<IValidatedAgeField, ValidatedAgeFieldState> {

    constructor(props: IValidatedAgeField) {
        super(props);

        this.state = {
            interacted: false,
            errors: [],
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const errors = [];
        const value = event.target.value;

        const dob = Date.parse(value);

        if (isNaN(dob)) {
            errors.push('Date is an invalid value.');
        } else {
            // TIL that '1/1/1' parsed returns Jan 01 2001.
            const date = new Date(dob);

            if ((new Date().getFullYear() - date.getFullYear()) < 16) {
                errors.push('Driver is not old enough.')
            }
        }

        this.setState({ interacted: true, errors });
        this.props.onChange(value);
    }

    render() {
        return (
            <div className="textField">

                Date of Birth

                <br />

                <input type={'text'}
                       onChange={ this.handleChange }
                       value={ this.props.value }/>

                {
                    this.state.errors.map((error: string) => {
                        return <div>{ error }</div>
                    })
                }
            </div>
        );
    }
}