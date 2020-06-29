/**
 * @File equation builder
 *
 * @Author Alexander Bassov
 * @Email blackxes.dev@gmail.com
 */

import * as React from 'react';

import EquationBuilderHeadline from './EquationBuilderHeadline';
import EquationListBuilder from './EquationListBuilder';
import { getlinkedEquationUnit } from '../../../Logic/Source/FlatData/functions';
import {
    EquationUnit,
    EquationUnitConfig
} from '../../../Logic/Source/FlatData/models';

export const EquationContext = React.createContext();

/**
 * initial props for the equation builder component
 */
const DefaultProps = {
    symbols: [],
    sheets: [],
    bases: []
};

const TestData = {
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
class EquationBuilder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            units: TestData.components,
            editingUnits: [],
            selectedSheet: ''
        };
    }

    selectSheet = (sheetId) => {
        this.setState({
            selectedSheet: sheetId
        });
    };

    deselectSheet = () => {
        // empty value resets it to default
        this.selectSheet('');
    };

    /**
     * creates a new equation unit on index x with default values
     *
     * @return {string} id id of the newly created
     */
    createUnit = (index) => {
        const eqUnit = new EquationUnit('none', new EquationUnitConfig());
        const added = this.state.units;
        added.splice(index, 0, { ...eqUnit, isNew: true });

        this.setState({
            units: added
        });

        return eqUnit.id;
    };

    /**
     * enables the editing of an equation unit
     *
     * @param {number} index the index of the equation item on which the editing should be enabled
     */
    startUnitEditing = (unitId) => {
        this.setState({
            editingUnits: [...this.state.editingUnits, unitId]
        });
    };

    /**
     * stops editing of unit behind the given id
     */
    stopUnitEditing = (unitId) => {
        this.setState({
            editingUnits: this.state.editingUnits.filter((id) => id != unitId)
        });
    };

    /**
     * saves an unit editing
     */
    updateUnit = (unitId, newData) => {
        this.setState({
            units: this.state.units.map((item) =>
                item.id != unitId ? item : { ...item, ...newData }
            )
        });

        return unitId;
    };

    /**
     * removes a equation unit
     */
    removeUnit = (unitId) => {
        this.setState({
            units: [...this.state.units.filter((uitem) => uitem.id != unitId)]
        });
    };

    getLinkedUnit = (id) => {
        const result = getlinkedEquationUnit(
            this.state.units.find((citem) => citem.id == id),
            this.props.sheetEntities.find(
                (sitem) => sitem.id == this.state.selectedSheet
            ),
            this.props.attributeBases
        );

        return result.linkedEquationUnit;
    };

    getLinkedUnits = () => {
        return this.state.units.map((cpnt) => this.getLinkedUnit(cpnt.id));
    };

    render() {
        return (
            <React.Fragment>
                <EquationBuilderHeadline
                    sheetEntities={this.props.sheetEntities}
                    selectedSheet={this.state.selectedSheet}
                    onSelectSheet={(evt) => this.selectSheet(evt.target.value)}
                    onDeselectSheet={() => this.deselectSheet()}
                />
                {/*
					is a consumer of the EquationContext Provider which has this.state as value
					and some helper functions
				*/}
                {!this.state.selectedSheet ? null : (
                    <React.Fragment>
                        <div className="container">
                            <EquationContext.Provider
                                value={{
                                    state: this.state,
                                    removeUnit: this.removeUnit,
                                    startEditing: this.startUnitEditing,
                                    stopEditing: this.stopUnitEditing,
                                    updateUnit: this.updateUnit,
                                    ...this.props
                                }}
                            >
                                <EquationListBuilder
                                    equationUnits={this.getLinkedUnits()}
                                    createUnit={this.createUnit}
                                    editingUnits={this.state.editingUnits}
                                />
                            </EquationContext.Provider>
                        </div>
                        <button
                            type="button"
                            className="btn btn-submit flex-end"
                        >
                            Speichern
                        </button>
                    </React.Fragment>
                )}

                <pre>{JSON.stringify(this.state, undefined, 2)}</pre>
            </React.Fragment>
        );
    }
}

EquationBuilder.defaultProps = DefaultProps;

export default EquationBuilder;

// /**
//  * component types
//  *
//  * attribute, symbol, constant, equation
//  */
// const EquationBuilder = class extends React.Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             ,
//             selectedSheet: 'WGIm3wQfoJYvj5GF',
//             componentSelectionEnabled: false,
//             pendingSelectionIndex: 0
//         };
//     }

//     /**
//      * removes a component
//      */
//     removeComponent = (id) => {
//         this.setState({
//             components: [
//                 ...this.state.components.filter((item) => item.id != id)
//             ]
//         });
//     };

//     /**
//      * returns the components mapped to their associated object
//      */
//     getLinkedComponents = () => {
//         const linked = this.state.components.map((cpnt) => {
//             return this.getLinkedComponent(cpnt.id);
//         });

//         return linked;
//     };

//     /**
//      * returns a linked component by id
//      *
//      * @param {string} id component id
//      */

//     /**
//      * returns the object behind the selected sheet id
//      */
//     getLinkedSheet = (id) => {
//         return this.props.sheets.find((item) => item.id == id);
//     };

//     /**
//      * returns the attributes of the selected sheet as their by the id referenced associated object
//      */
//     getLinkedSheetAttributes = (id) => {
//         const sheet = this.getLinkedSheet(id);

//         return !sheet
//             ? []
//             : sheet.attributes.map((aitem) => {
//                   const base = this.props.bases.find(
//                       (base) => base.id == aitem.baseId
//                   );

//                   return { ...base, ...aitem };
//               });
//     };

//     /**
//      * adds current selected component to the compnent list
//      */
//     onSelectComponent = (evt) => {
//         console.log('implement select component');
//     };

//     /**
//      * sets current selected sheet
//      */
//     onChangeSheet = (evt) => {
//         this.setState({
//             selectedSheet: evt.target.value,
//             pendingSelectionIndex: null
//         });
//     };

//     /**
//      * enables the selection of an equation component
//      */
//     enableComponentSelection = (pos) => {
//         this.setState({
//             componentSelectionEnabled: true,
//             pendingSelectionIndex: pos
//         });
//     };

//     /**
//      * disables the selection of an equation component
//      */
//     disabledComponentSelection = (pos) => {
//         this.setState({
//             componentSelectionEnabled: false,
//             pendingSelectionIndex: 0
//         });
//     };

//     /**
//      * return an array of objects containing the linked current components
//      */
//     getLinkedEquationComponentListObjects = (components) => {
//         // since react needs a key to stop complaining
//         // this function returns an object with 2 properties
//         // component: function component
//         // parsed: the parsed equation component object the component is build around
//         const linked = components.map((equationItem) => ({
//             component: ({ componentIndex }) => {
//                 const { id, name, value, defaultValue } = equationItem.linked;
//                 const { componentId } = equationItem.config;

//                 return (
//                     <div
//                         key={id}
//                         className="'component-item list-item flex flex-v flex-nospace'"
//                     >
//                         <Button type="info" className="list-item">
//                             <FontAwesomeIcon icon={fasSyncAlt} />
//                         </Button>
//                         <div className="list-item container-box flex flex-v">
//                             <p className="list-item text-center">{name}</p>
//                             <p className="list-item text-center">
//                                 {value || defaultValue || 0}
//                             </p>
//                         </div>
//                         <Button
//                             type="error"
//                             className="list-item"
//                             onClick={() => this.removeComponent(componentId)}
//                         >
//                             <FontAwesomeIcon icon={fasMinus} />
//                         </Button>
//                     </div>
//                 );
//             },
//             parsed: equationItem
//         }));

//         return linked;
//     };

//     /**
//      * returns the possible equation component types
//      */
//     getComponentTypes = () => {
//         return [
//             {
//                 key: 'attribute',
//                 name: 'Attribut'
//             },
//             {
//                 key: 'symbol',
//                 name: 'Symbol'
//             },
//             {
//                 key: 'constant',
//                 name: 'Konstante'
//             },
//             {
//                 key: 'equation',
//                 name: 'Formel'
//             }
//         ];
//     };

//     /**
//      * render component
//      */
//     render() {
//         // const { pendingSelectionIndex, componentSelectionEnabled } = this.state;

//         // since the builder relies on a sheet, only show builder when a sheet is selected
//         // if (!this.state.selectedSheet) {
//         //     const sheetOptions = sheets.map((item) => (
//         //         <option key={item.id} value={item.id}>
//         //             {item.name}
//         //         </option>
//         //     ));

//         //     return (
//         //         <div className="flex flex-h flex-align">
//         //             <p>Bitte sheet auswählen</p>
//         //             <select className="btn btn-info" onChange={onChange}>
//         //                 <option>- Auswählen -</option>
//         //                 {sheetOptions}
//         //             </select>
//         //         </div>
//         //     );
//         // }

//         // const linkedComponent = this.getLinkedComponent('RsXgPi_jOgVfok8e');
//         // const components = this.getLinkedComponents();

//         // link objects by id
//         // const linkedSheet =
//         //     this.state.selectedSheet &&
//         //     this.props.sheets.find(
//         //         (item) => item.id == this.state.selectedSheet
//         //     );

//         // const componentCount = this.state.components.length;
//         // const linkedComponents = this.getLinkedComponents();
//         // const componentErrors = linkedComponents
//         //     .map((cpnt) => cpnt.errors)
//         //     .filter(Boolean);

//         return (
//             <React.Fragment>
//                 {/* <div className="container container-box flex flex-h flex-align">
//                     <div className="btn btn-info" onClick={this.onChangeSheet}>
//                         <FontAwesomeIcon icon={fasTimes} />
//                     </div>
//                     <h1 className="flex flex-h flex-align">
//                         <span className="list-item">Charactersheet</span>
//                         <span className="list-item text-sub">///</span>
//                         <span className="list-item msg-info">
//                             {linkedSheet.name}
//                         </span>
//                     </h1>
//                 </div> */}

//                 <div className="components flex flex-v flex-justify">
//                     <EquationContext.Provider value={{ sick: 20 }}>
//                         <EquationUnitListing />
//                     </EquationContext.Provider>
//                 </div>

//                 {/* <pre>{JSON.stringify(this.state, undefined, 2)}</pre>
//                 <pre>{JSON.stringify(this.props, undefined, 2)}</pre> */}
//             </React.Fragment>
//         );
//     }
// };
