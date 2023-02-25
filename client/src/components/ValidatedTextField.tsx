import React from 'react';
import ReactDOM from 'react-dom';

interface IValidatedTextField {
    label: string;
    value: string;
    onChange: (value: string) => any;
}

interface ValidatedTextFieldState {
    interacted: boolean;
}

export class ValidatedTextField extends React.Component<IValidatedTextField, ValidatedTextFieldState> {

    constructor(props: IValidatedTextField) {
        super(props);

        this.state = {
            interacted: false,
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ interacted: true });
        this.props.onChange(event.target.value);
    }

    render() {
        let errors: React.ReactElement = <div></div>;

        if (this.state.interacted && this.props.value.length === 0) {
            errors = <div>
                This field is required.
            </div>;
        }

        return (
            <div className="textField">

                { this.props.label }

                <br />

                <input type={'text'}
                    onChange={ this.handleChange }
                    value={ this.props.value }/>

                { errors }
            </div>
        );
    }
}