import React from 'react';

interface IValidatedNumberField {
    label: string;
    value: number;
    onChange: (value: number) => any;
}

interface ValidatedNumberFieldState {
}

export class ValidatedNumberField extends React.Component<IValidatedNumberField, ValidatedNumberFieldState> {

    constructor(props: IValidatedNumberField) {
        super(props);

        this.state = {
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        let value = parseInt(event.target.value, 10);
        if (isNaN(value) || value < 0) {
            value = 0;
        }

        this.props.onChange(value);
    }

    render() {
        return (
            <div className="textField">

                { this.props.label }

                <br />

                <input type="text" pattern="[0-9]*"
                       onChange={ this.handleChange }
                       value={ this.props.value }/>
            </div>
        );
    }
}