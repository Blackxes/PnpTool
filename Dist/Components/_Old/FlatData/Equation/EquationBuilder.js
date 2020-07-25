/**
 * @File equation builder
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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import * as React from 'react';
export var EquationContext = React.createContext();
// "@babel/plugin-transform-runtime",
//         "@babel/plugin-proposal-export-default-from",
//         "@babel/plugin-proposal-class-properties",
//         "@babel/plugin-proposal-object-rest-spread",
//         "@babel/plugin-proposal-optional-chaining"
/**
 * initial props for the equation builder component
 */
var DefaultProps = {
    symbols: [],
    sheets: [],
    bases: []
};
var TestData = {
    components: [
        {
            id: 'RsXgPi_jOgVfok8e',
            type: 'attribute',
            config: {
                contextId: 'mUzs8Ttu7w2V5kWd'
            }
        },
        {
            id: '9k8LxvnCNaP8tIrt',
            type: 'attribute',
            config: {
                contextId: 'nEdwZ_03Clg4vytk'
            }
        },
        {
            id: '0L3K8yN5h_hRiIVx',
            type: 'attribute',
            config: {
                contextId: 'IqqyayDIcs1ad3e9'
            }
        }
    ]
};
/**
 * equation builder
 */
// class EquationBuilder extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             units: TestData.components,
//             editingUnits: [],
//             selectedSheet: ''
//         };
//     }
//     selectSheet = (sheetId) => {
//         this.setState({
//             selectedSheet: sheetId
//         });
//     };
//     deselectSheet = () => {
//         // empty value resets it to default
//         this.selectSheet('');
//     };
//     /**
//      * creates a new equation unit on index x with default values
//      *
//      * @return {string} id id of the newly created
//      */
//     createUnit = (index) => {
//         const eqUnit = new EquationUnit('none', new EquationUnitConfig());
//         const added = this.state.units;
//         added.splice(index, 0, { ...eqUnit, isNew: true });
//         this.setState({
//             units: added
//         });
//         return eqUnit.id;
//     };
//     /**
//      * enables the editing of an equation unit
//      *
//      * @param {number} index the index of the equation item on which the editing should be enabled
//      */
//     startUnitEditing = (unitId) => {
//         this.setState({
//             editingUnits: [...this.state.editingUnits, unitId]
//         });
//     };
//     /**
//      * stops editing of unit behind the given id
//      */
//     stopUnitEditing = (unitId) => {
//         this.setState({
//             editingUnits: this.state.editingUnits.filter((id) => id != unitId)
//         });
//     };
//     /**
//      * saves an unit editing
//      */
//     updateUnit = (unitId, newData) => {
//         this.setState({
//             units: this.state.units.map((item) =>
//                 item.id != unitId ? item : { ...item, ...newData }
//             )
//         });
//         return unitId;
//     };
//     /**
//      * removes a equation unit
//      */
//     removeUnit = (unitId) => {
//         this.setState({
//             units: [...this.state.units.filter((uitem) => uitem.id != unitId)]
//         });
//     };
//     getLinkedUnit = (id) => {
//         const result = getlinkedEquationUnit(
//             this.state.units.find((citem) => citem.id == id),
//             this.props.sheetEntities.find(
//                 (sitem) => sitem.id == this.state.selectedSheet
//             ),
//             this.props.attributeBases
//         );
//         return result.linkedEquationUnit;
//     };
//     getLinkedUnits = () => {
//         return this.state.units.map((cpnt) => this.getLinkedUnit(cpnt.id));
//     };
//     render() {
//         return (
//             <React.Fragment>
//                 <EquationBuilderHeadline
//                     sheetEntities={this.props.sheetEntities}
//                     selectedSheet={this.state.selectedSheet}
//                     onSelectSheet={(evt) => this.selectSheet(evt.target.value)}
//                     onDeselectSheet={() => this.deselectSheet()}
//                 />
//                 {!this.state.selectedSheet ? null : (
//                     <React.Fragment>
//                         <div className="container">
//                             <EquationContext.Provider
//                                 value={{
//                                     state: this.state,
//                                     removeUnit: this.removeUnit,
//                                     startEditing: this.startUnitEditing,
//                                     stopEditing: this.stopUnitEditing,
//                                     updateUnit: this.updateUnit,
//                                     ...this.props
//                                 }}
//                             >
//                                 <EquationListBuilder
//                                     equationUnits={this.getLinkedUnits()}
//                                     createUnit={this.createUnit}
//                                     editingUnits={this.state.editingUnits}
//                                 />
//                             </EquationContext.Provider>
//                         </div>
//                         <button
//                             type="button"
//                             className="btn btn-submit flex-end"
//                         >
//                             Speichern
//                         </button>
//                     </React.Fragment>
//                 )}
//                 <pre>{JSON.stringify(this.state, undefined, 2)}</pre>
//             </React.Fragment>
//         );
//     }
// }
// EquationBuilder.defaultProps = DefaultProps;
// export default EquationBuilder;
// /**
//  * component types
//  *
//  * attribute, symbol, constant, equation
//  */
var EquationBuilder = /** @class */ (function (_super) {
    __extends(class_1, _super);
    function class_1(props) {
        var _this = _super.call(this, props) || this;
        /**
         * removes a component
         */
        _this.removeComponent = function (id) {
            _this.setState({
                components: __spreadArrays(_this.state.components.filter(function (item) { return item.id != id; }))
            });
        };
        /**
         * returns the components mapped to their associated object
         */
        _this.getLinkedComponents = function () {
            var linked = _this.state.components.map(function (cpnt) {
                return _this.getLinkedComponent(cpnt.id);
            });
            return linked;
        };
        /**
         * returns a linked component by id
         *
         * @param {string} id component id
         */
        /**
         * returns the object behind the selected sheet id
         */
        _this.getLinkedSheet = function (id) {
            return _this.props.sheets.find(function (item) { return item.id == id; });
        };
        /**
         * returns the attributes of the selected sheet as their by the id referenced associated object
         */
        _this.getLinkedSheetAttributes = function (id) {
            var sheet = _this.getLinkedSheet(id);
            return !sheet
                ? []
                : sheet.attributes.map(function (aitem) {
                    var base = _this.props.bases.find(function (base) { return base.id == aitem.baseId; });
                    return __assign(__assign({}, base), aitem);
                });
        };
        /**
         * adds current selected component to the compnent list
         */
        _this.onSelectComponent = function (evt) {
            console.log('implement select component');
        };
        /**
         * sets current selected sheet
         */
        _this.onChangeSheet = function (evt) {
            _this.setState({
                selectedSheet: evt.target.value,
                pendingSelectionIndex: null
            });
        };
        /**
         * enables the selection of an equation component
         */
        _this.enableComponentSelection = function (pos) {
            _this.setState({
                componentSelectionEnabled: true,
                pendingSelectionIndex: pos
            });
        };
        /**
         * disables the selection of an equation component
         */
        _this.disabledComponentSelection = function (pos) {
            _this.setState({
                componentSelectionEnabled: false,
                pendingSelectionIndex: 0
            });
        };
        /**
         * return an array of objects containing the linked current components
         */
        _this.getLinkedEquationComponentListObjects = function (components) {
            // since react needs a key to stop complaining
            // this function returns an object with 2 properties
            // component: function component
            // parsed: the parsed equation component object the component is build around
            var linked = components.map(function (equationItem) { return ({
                component: function (_a) {
                    var componentIndex = _a.componentIndex;
                    var _b = equationItem.linked, id = _b.id, name = _b.name, value = _b.value, defaultValue = _b.defaultValue;
                    var componentId = equationItem.config.componentId;
                    return (React.createElement("div", { key: id, className: "'component-item list-item flex flex-v flex-nospace'" },
                        React.createElement(Button, { type: "info", className: "list-item" },
                            React.createElement(FontAwesomeIcon, { icon: fasSyncAlt })),
                        React.createElement("div", { className: "list-item container-box flex flex-v" },
                            React.createElement("p", { className: "list-item text-center" }, name),
                            React.createElement("p", { className: "list-item text-center" }, value || defaultValue || 0)),
                        React.createElement(Button, { type: "error", className: "list-item", onClick: function () { return _this.removeComponent(componentId); } },
                            React.createElement(FontAwesomeIcon, { icon: fasMinus }))));
                },
                parsed: equationItem
            }); });
            return linked;
        };
        /**
         * returns the possible equation component types
         */
        _this.getComponentTypes = function () {
            return [
                {
                    key: 'attribute',
                    name: 'Attribut'
                },
                {
                    key: 'symbol',
                    name: 'Symbol'
                },
                {
                    key: 'constant',
                    name: 'Konstante'
                },
                {
                    key: 'equation',
                    name: 'Formel'
                }
            ];
        };
        _this.state = {
            selectedSheet: 'WGIm3wQfoJYvj5GF',
            componentSelectionEnabled: false,
            pendingSelectionIndex: 0
        };
        return _this;
    }
    /**
     * render component
     */
    class_1.prototype.render = function () {
        // const { pendingSelectionIndex, componentSelectionEnabled } = this.state;
        // since the builder relies on a sheet, only show builder when a sheet is selected
        // if (!this.state.selectedSheet) {
        //     const sheetOptions = sheets.map((item) => (
        //         <option key={item.id} value={item.id}>
        //             {item.name}
        //         </option>
        //     ));
        //     return (
        //         <div className="flex flex-h flex-align">
        //             <p>Bitte sheet auswählen</p>
        //             <select className="btn btn-info" onChange={onChange}>
        //                 <option>- Auswählen -</option>
        //                 {sheetOptions}
        //             </select>
        //         </div>
        //     );
        // }
        // const linkedComponent = this.getLinkedComponent('RsXgPi_jOgVfok8e');
        // const components = this.getLinkedComponents();
        // link objects by id
        // const linkedSheet =
        //     this.state.selectedSheet &&
        //     this.props.sheets.find(
        //         (item) => item.id == this.state.selectedSheet
        //     );
        // const componentCount = this.state.components.length;
        // const linkedComponents = this.getLinkedComponents();
        // const componentErrors = linkedComponents
        //     .map((cpnt) => cpnt.errors)
        //     .filter(Boolean);
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { className: "components flex flex-v flex-justify" },
                React.createElement(EquationContext.Provider, { value: { sick: 20 } },
                    React.createElement(EquationUnitListing, null)))));
    };
    return class_1;
}(React.Component));
