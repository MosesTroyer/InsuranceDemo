import React from 'react';
import axios from 'axios';

interface IExternalSite {
}

interface ExternalSiteState {

}

export class ExternalSite extends React.Component<IExternalSite, ExternalSiteState> {

    constructor(props: IExternalSite) {
        super(props);
    }

    redirect(): void {
        axios.post('/api/application', {
            firstName: 'Joseph',
            lastName: 'Joestar',
            dob: '9/27/1920',
        })
            .then((response) => {
                window.location = response.data.redirect;
            });
    }

    render() {
        return (
            <div>
                This is an "external site" that will call POST /api/application with the given info:

                <p>
                    First Name: 'Joseph' <br />
                    Last Name: 'Joestar' <br />
                    Date of Birth: '9/27/1920' <br />
                </p>

                <br />

                <button onClick={ this.redirect }>
                    Finish Application
                </button>
            </div>
        );
    }
}