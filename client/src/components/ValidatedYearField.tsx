import React from 'react';
import ReactDOM from 'react-dom';

interface IValidatedYearField {
    value: number;
    onChange: (value: number) => any;
}

interface ValidatedYearFieldState {
    errors: string[];
}

export class ValidatedYearField extends React.Component<IValidatedYearField, ValidatedYearFieldState> {

    constructor(props: IValidatedYearField) {
        super(props);

        this.state = {
            errors: [],
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        let value = parseInt(event.target.value, 10);
        let errors: string[] = [];
        const latest = new Date().getFullYear() + 1;

        if (isNaN(value)) {
            value = 0;
        }

        if (value < 1985) {
            errors.push('Year must be greater than 1985.');
        } else if (value > latest) {
            errors.push(`Year must be before ${ latest }.`);
        }

        this.setState({ errors });
        this.props.onChange(value);
    }

    render() {
        return (
            <div className="textField">

                Year

                <br />

                <input type="text" pattern="[0-9]*"
                       value={ this.props.value }
                       onChange={ this.handleChange } />

                {
                    this.state.errors.map((error: string) => {
                        return <div>{ error }</div>
                    })
                }
            </div>
        );
    }
}