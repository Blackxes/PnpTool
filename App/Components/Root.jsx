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
import AttributeSetForm from './FlatData/AttributeSetForm';
import CharacterSheetForm from './FlatData/CharacterSheetForm';

const Root = class extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const props = this.props;

        return (
            <React.Fragment>
                {/* <h1>Daten Management</h1> */}
                {/* <HorizontalBookFolder /> */}
                {/* <AttributeBaseForm onSubmit={props.onAddAttributeBase} /> */}
                {/* <AttributeBaseListing
                    bases={props.attributeBases}
                    onDelete={props.onDeleteAttributeBase}
                /> */}
                {/* <AttributeSetForm bases={props.attributeBases} onSubmit={props.onAddAttributeSet} /> */}
                <CharacterSheetForm
                    onSubmit={props.onAddCharacterSheet}
                    attributeSets={props.attributeSets}
                    attributeBases={props.attributeBases}
                />
                {/* <AttributeSetForm attributeBases={attributeBases} /> */}
                {/* <CharacterSheetForm attributeBases={attributeBases} /> */}

                <Debug />
            </React.Fragment>
        );
    }
};

const toProps = (state) => ({
    attributeBases: state.FlatData.attributeBases,
    attributeSets: state.FlatData.attributeSets
});

const toDispatch = (dispatch) => ({
    onAddAttributeBase: (values) => dispatch({ type: 'add-attribute-base', pl: values }),
    onDeleteAttributeBase: (values) => dispatch({ type: 'delete-attribute-base', pl: values }),
    // onEditAttributeBase: (values) => dispatch({ type: 'update-attribute-base', pl: values })
    onAddAttributeSet: (values) => dispatch({ type: 'add-attribute-set', pl: values }),
    onDeleteAttributeSet: (values) => dispatch({ type: 'delete-attribute-set', pl: values }),
    onAddCharacterSheet: (values) => dispatch({ type: 'add-character-sheet', pl: values }),
    onDeleteCharacterSheet: (values) => dispatch({ type: 'delete-character-sheet', pl: values })
});

export default connect(toProps, toDispatch)(Root);
