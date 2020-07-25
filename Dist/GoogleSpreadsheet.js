/**
 * @File google spreadsheet initialization and sign in
 *
 * @Author Alexander Bassov
 * @Email blackxes.dev@gmail.com
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import * as React from 'react';
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
var GoogleAPI = /** @class */ (function (_super) {
    __extends(class_1, _super);
    function class_1(props) {
        var _this = _super.call(this, props) || this;
        _this.LoadGoogleApi = function () {
            gapi.load('client', function () {
                _this.setState({
                    GoogleApiLoaded: true
                }, _this.InitGoogleApi);
            });
        };
        _this.onSignedChange = function (status) {
            console.log(status);
            _this.setState({
                LoggedIn: status
            });
        };
        _this.InitGoogleApi = function () {
            var init = gapi.client.init({
                apiKey: 'AIzaSyDD28jifCoUgna46-OpexwsHbKnKiDrpL0',
                discoveryDocs: [
                    'https://sheets.googleapis.com/$discovery/rest?version=v4'
                ],
                clientId: '1060391404273-lrhhfdv8lr80n1lebsatc5tcqajl9f9f.apps.googleusercontent.com',
                scope: 'https://www.googleapis.com/auth/spreadsheets'
            });
            init.then(function () {
                _this.setState({
                    AuthInstance: gapi.auth2.getAuthInstance(),
                    GoogleApiInitialized: true
                }, function () {
                    _this.state.AuthInstance.isSignedIn.listen(_this.onSignedChange);
                    _this.onSignedChange(_this.state.AuthInstance.isSignedIn.get());
                });
            });
            init.catch(function (err) {
                _this.setState({
                    Errors: __spreadArrays(_this.state.Errors, [
                        {
                            type: 'error',
                            message: err.details
                        }
                    ])
                });
            });
        };
        _this.GoogleSignIn = function () {
            var prom = _this.state.AuthInstance.signIn();
            prom.catch(function (err) {
                _this.setState({
                    Errors: __spreadArrays(_this.state.Errors, [
                        {
                            type: 'error',
                            message: err.details
                        }
                    ])
                });
            });
        };
        _this.GoogleSignOut = function () {
            _this.state.AuthInstance.signOut();
        };
        _this.LoadSheetsInfo = function () { return __awaiter(_this, void 0, void 0, function () {
            var sheetInfo, parsed;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, gapi.client.sheets.spreadsheets.get({
                            spreadsheetId: '1hr1UF0CWXwdk2DpyALGOaZXGjGtny1y8TaWEFnCycF0'
                        })];
                    case 1:
                        sheetInfo = _a.sent();
                        parsed = sheetInfo.result.sheets.map(function (_a) {
                            var props = _a.properties;
                            return {
                                name: props.title,
                                id: props.sheetId
                            };
                        });
                        this.setState({
                            SheetsInfo: parsed
                        });
                        return [2 /*return*/];
                }
            });
        }); };
        _this.LoadSheetData = function (id) { return __awaiter(_this, void 0, void 0, function () {
            var info, values;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        info = this.state.SheetsInfo.find(function (item) { return item.id == id; });
                        return [4 /*yield*/, gapi.client.sheets.spreadsheets.values.get({
                                spreadsheetId: '1hr1UF0CWXwdk2DpyALGOaZXGjGtny1y8TaWEFnCycF0',
                                range: info.name + '!4:B4'
                            })];
                    case 1:
                        values = _a.sent();
                        console.log(values);
                        this.setState({
                            Data: values.result.values[0].map(function (item) { return JSON.parse(item); })
                        });
                        return [2 /*return*/];
                }
            });
        }); };
        _this.state = {
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
        return _this;
    }
    class_1.prototype.componentDidMount = function () {
        this.LoadGoogleApi();
    };
    class_1.prototype.render = function () {
        var _this = this;
        return (React.createElement(React.Fragment, null,
            !this.state.GoogleApiLoaded ? (React.createElement("p", { className: "msg-error" }, "[API] to be loaded..")) : (React.createElement("p", { className: "msg-ok" }, "[API] loaded")),
            !this.state.GoogleApiInitialized ? (React.createElement("p", { className: "msg-error" }, "[API] to be initialized..")) : (React.createElement("p", { className: "msg-ok" }, "[API] initialized")),
            !this.state.LoggedIn ? (React.createElement("button", { type: "button", className: "btn btn-info", disabled: !this.state.GoogleApiInitialized, onClick: this.GoogleSignIn }, "Login")) : (React.createElement(React.Fragment, null,
                React.createElement("div", { className: "flex flex-h" },
                    React.createElement("button", { type: "button", className: "list-item btn-info", disabled: !this.state.GoogleApiInitialized, onClick: function () { return _this.LoadSheetsInfo(); } }, "Load Spreadsheet data"),
                    React.createElement("button", { type: "button", className: "list-item btn-error", disabled: !this.state.GoogleApiInitialized, onClick: this.GoogleSignOut }, "Logout")),
                React.createElement("div", { className: "data" }, this.state.SheetsInfo.map(function (item) { return (React.createElement("div", { className: "btn btn-info", onClick: function () { return _this.LoadSheetData(item.id); } }, item.name)); })),
                React.createElement("div", { className: "list list-v" },
                    React.createElement("pre", null, JSON.stringify(this.state.Data, undefined, 2)))))));
    };
    return class_1;
}(React.Component));
export default GoogleAPI;
