/**
 * @File google spreadsheet initialization and sign in
 *
 * @Author Alexander Bassov
 * @Email blackxes.dev@gmail.com
 */

import * as React from 'react';
import Container from './Components/StyledComponents/Container/Container';

// const Credentials = {};

// const LoadGoogleApi = (SetApiLoaded) => {};

// const InitGoogleApi = async (SetApiInitialized, SetLoggedIn) => {};

// const InitGoogleApi = (credentials, SetApiInitialized, SetLoggedIn) => {
//     console.log(credentials);

//     const GoogleAuth = gapi.client
//         .init(credentials)
//         .then(
//             () => {
//                 console.log('Initialized');
//                 gapi.auth2.getAuthInstance().isSignedIn.listen(SetLoggedIn);

//                 // console.log(gapi.auth2.getAuthInstance());

//                 // SetLoggedIn(gapi.auth2.getAuthInstance().isSignedIn.get());
//                 // SetApiInitialized(true);
//             },
//             (err) => {
//                 console.log('Error', err);
//             }
//         )
//         .catch(() => console.log('Catch'));
// };

// const GoogleSignIn = () => {
//     gapi.auth2.getAuthInstance().signIn();
// };

// const GoogleSignOut = () => {
//     gapi.auth2.getAuthInstance().signOut();
// };

const GoogleAPI = class extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            GoogleApiLoaded: false,
            GoogleApiInitialized: false,
            LoggedIn: false,
            AuthInstance: null,
            Data: [],
            SheetsInfo: [],
            Errors: [
                {
                    type: 'success',
                    message: "i'm gay"
                }
            ]
        };
    }

    componentDidMount() {
        this.LoadGoogleApi();
    }

    LoadGoogleApi = () => {
        gapi.load('client', () => {
            this.setState(
                {
                    GoogleApiLoaded: true
                },
                this.InitGoogleApi
            );
        });
    };

    onSignedChange = (status) => {
        console.log(status);
        this.setState({
            LoggedIn: status
        });
    };

    InitGoogleApi = () => {
        const init = gapi.client.init({
            apiKey: 'AIzaSyDD28jifCoUgna46-OpexwsHbKnKiDrpL0',
            discoveryDocs: [
                'https://sheets.googleapis.com/$discovery/rest?version=v4'
            ],
            clientId:
                '1060391404273-lrhhfdv8lr80n1lebsatc5tcqajl9f9f.apps.googleusercontent.com',
            scope: 'https://www.googleapis.com/auth/spreadsheets'
        });

        init.then(() => {
            this.setState(
                {
                    AuthInstance: gapi.auth2.getAuthInstance(),
                    GoogleApiInitialized: true
                },
                () => {
                    this.state.AuthInstance.isSignedIn.listen(
                        this.onSignedChange
                    );

                    this.onSignedChange(
                        this.state.AuthInstance.isSignedIn.get()
                    );
                }
            );
        });

        init.catch((err) => {
            this.setState({
                Errors: [
                    ...this.state.Errors,
                    {
                        type: 'error',
                        message: err.details
                    }
                ]
            });
        });
    };

    GoogleSignIn = () => {
        const prom = this.state.AuthInstance.signIn();

        prom.catch((err) => {
            this.setState({
                Errors: [
                    ...this.state.Errors,
                    {
                        type: 'error',
                        message: err.details
                    }
                ]
            });
        });
    };

    GoogleSignOut = () => {
        this.state.AuthInstance.signOut();
    };

    LoadSheetsInfo = async () => {
        const sheetInfo = await gapi.client.sheets.spreadsheets.get({
            spreadsheetId: '1hr1UF0CWXwdk2DpyALGOaZXGjGtny1y8TaWEFnCycF0'
        });

        const parsed = sheetInfo.result.sheets.map(({ properties: props }) => {
            return {
                name: props.title,
                id: props.sheetId
            };
        });

        this.setState({
            SheetsInfo: parsed
        });
    };

    LoadSheetData = async (id) => {
        const info = this.state.SheetsInfo.find((item) => item.id == id);

        const values = await gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: '1hr1UF0CWXwdk2DpyALGOaZXGjGtny1y8TaWEFnCycF0',
            range: info.name + '!4:B4'
        });

        console.log(values);

        this.setState({
            Data: values.result.values[0].map((item) => JSON.parse(item))
        });
    };

    render() {
        return (
            <React.Fragment>
                {/* <Container box>
                    {this.state.Errors.map((item) => (
                        <p className={item.type}>{item.message}</p>
                    ))}
                </Container> */}
                {!this.state.GoogleApiLoaded ? (
                    <p className="msg-error">[API] to be loaded..</p>
                ) : (
                    <p className="msg-ok">[API] loaded</p>
                )}
                {!this.state.GoogleApiInitialized ? (
                    <p className="msg-error">[API] to be initialized..</p>
                ) : (
                    <p className="msg-ok">[API] initialized</p>
                )}
                {!this.state.LoggedIn ? (
                    <button
                        type="button"
                        className="btn btn-info"
                        disabled={!this.state.GoogleApiInitialized}
                        onClick={this.GoogleSignIn}
                    >
                        Login
                    </button>
                ) : (
                    <React.Fragment>
                        <div className="flex flex-h">
                            <button
                                type="button"
                                className="list-item btn-info"
                                disabled={!this.state.GoogleApiInitialized}
                                onClick={() => this.LoadSheetsInfo()}
                            >
                                Load Spreadsheet data
                            </button>
                            <button
                                type="button"
                                className="list-item btn-error"
                                disabled={!this.state.GoogleApiInitialized}
                                onClick={this.GoogleSignOut}
                            >
                                Logout
                            </button>
                        </div>
                        <div className="data">
                            {this.state.SheetsInfo.map((item) => (
                                <div
                                    className="btn btn-info"
                                    onClick={() => this.LoadSheetData(item.id)}
                                >
                                    {item.name}
                                </div>
                            ))}
                        </div>
                        <div className="list list-v">
                            <pre>
                                {JSON.stringify(this.state.Data, undefined, 2)}
                            </pre>
                            {/* {!this.state.Data.length
                                ? null
                                : this.state.Data.map((item) => (
                                      <div className="list-item">
                                          {item.id} - {item.name} - {item.value}
                                      </div>
                                  ))} */}
                        </div>
                    </React.Fragment>
                )}
            </React.Fragment>
        );
    }
    // const [ApiLoaded, SetApiLoaded] = React.useState(false);
    // const [ApiInitialized, SetApiInitialized] = React.useState(false);
    // const [LoggedIn, SetLoggedIn] = React.useState(false);

    // const LoadApi = () => {
    //     LoadGoogleApi(SetApiLoaded);
    // };
    // const InitApi = () => {
    //     InitGoogleApi(credentials, SetApiInitialized, SetLoggedIn);
};

export default GoogleAPI;
