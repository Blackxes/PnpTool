/**
 * @File main entrance of the app
 *
 * @Author Alexander Bassov
 * @Email blackxes.dev@gmail.com
 */

import * as React from 'react';
import { connect } from 'react-redux';
import Debug from './Debug/Debug';
import AttributeBaseForm from './FlatData/AttributeBaseForm';
import AttributeBaseListing from './FlatData/AttributeBaseListing';
import CharacterSheetForm from './FlatData/CharacterSheetForm';
import CharacterSheetsListing from './FlatData/CharacterSheetsListing';
import EquationBuilder from './FlatData/Equation/EquationBuilder';

import { generateId } from '../Logic/Source/Miscellaneous/functions';

const Root = class extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const props = this.props;

        return (
            <React.Fragment>
                {/* Done: */}
                <AttributeBaseForm onSubmit={props.onAddAttributeBase} />
                <AttributeBaseListing
                    bases={props.bases}
                    onDelete={props.onDeleteAttributeBase}
                />
                <CharacterSheetForm
                    onSubmit={props.OnCreateCharacterSheet}
                    attributeSets={props.attributeSets}
                    attributeBases={props.attributeBases}
                />
                <CharacterSheetsListing sheets={props.sheets} />

                {/* Note: */}
                <EquationBuilder
                    sheetEntities={props.sheets}
                    attributeBases={props.attributeBases}
                />

                {/* <EquationBuilder
                    symbols={props.symbols}
                    sheets={props.sheets}
                    bases={props.bases}
                /> */}

                {/* <h1>Daten Management</h1> */}
                {/* <AttributeSetForm bases={props.attributeBases} onSubmit={props.onAddAttributeSet} /> */}
                {/* <AttributeSetForm attributeBases={attributeBases} /> */}
                {/* <CharacterSheetForm attributeBases={attributeBases} /> */}
                <Debug />
            </React.Fragment>
        );
    }
};

const toProps = (state) => ({
    attributeBases: state.FlatData.attributeBases,
    attributeSets: state.FlatData.attributeSets,
    sheets: state.FlatData.characterSheets,
    symbols: state.FlatData.equationSymbols,
    state: state
});

const toDispatch = (dispatch) => ({
    onAddAttributeBase: (values) =>
        dispatch({ type: 'add-attribute-base', pl: values }),
    onDeleteAttributeBase: (values) =>
        dispatch({ type: 'delete-attribute-base', pl: values }),
    // onEditAttributeBase: (values) => dispatch({ type: 'update-attribute-base', pl: values })
    onAddAttributeSet: (values) =>
        dispatch({ type: 'add-attribute-set', pl: values }),
    onDeleteAttributeSet: (values) =>
        dispatch({ type: 'delete-attribute-set', pl: values }),
    OnCreateCharacterSheet: (values) =>
        dispatch({
            type: 'create-character-sheet-form-submission',
            pl: values
        }),
    onDeleteCharacterSheet: (values) =>
        dispatch({ type: 'delete-character-sheet', pl: values })
});

export default connect(toProps, toDispatch)(Root);
