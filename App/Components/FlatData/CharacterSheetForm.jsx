/**
 * @File generic form for the character sheet data
 *
 * @Author Alexander Bassov
 * @Email blackxes.dev@gmail.com
 */

import * as React from 'react';
import { Field } from 'react-final-form';
import {
    FormWrapper,
    FormTitle,
    FormFieldContainer,
    FormFieldHeader,
    FormFieldTitle,
    FormFieldDescription,
    FormFieldWrapper
} from '../Form/FormComponents';
import { SubmitButton, Button } from '../Form/Buttons';
import {
    createCharacterSheetAttribute,
    getLinkedAttributes,
    getLinkedSet,
    getLinkedAttribute
} from '../../Logic/Source/FlatData/functions';

const defaultProps = {
    onSubmit: () => {},
    submitLabel: 'Hinzufügen',
    characterSheetEntry: null,
    attributeBases: []
};

// const PreviewSetSelection = ({ defaultSet, onSelection, attributeSets }) => {
//     return (
//         <div className="flex flex-h flex-align">
//             <Field
//                 name="pendingSet"
//                 component="select"
//                 defaultValue={defaultSet}
//             >
//                 {({ input }) => (
//                     <select {...input} onChange={onSelection}>
//                         <option value="">- Auswählen -</option>
//                         {attributeSets.map((item) => (
//                             <option key={item.id} value={item.id}>
//                                 {item.name}
//                             </option>
//                         ))}
//                     </select>
//                 )}
//             </Field>
//         </div>
//     );
// };

// const PreviewSetAttributesListing = ({ attributes }) => {
//     if (!attributes.length) {
//         return null;
//     }

//     return (
//         <div className="flex flex-h">
//             <p className="list-item col col-6">Attribute in diesem Set</p>
//             <div className="preview-set-attributes list-item col col-6 flex flex-v flex-wrap">
//                 {attributes.map((attr) => (
//                     <p key={attr.id} className="list-item msg-info text-center">
//                         {attr.name}/{attr.defaultValue}
//                     </p>
//                 ))}
//             </div>
//         </div>
//     );
// };

const AttributeAddedListItemValue = ({ Attribute, OnRemove, OnChange }) => {};

const PreviewAttributeListItemValue = ({ Attribute, OnAdd }) => {};

const AttributeListItem = ({
    IsPreview,
    Attribute,
    OnAdd,
    OnRemove,
    OnChange,
    ActionLabel
}) => {
    return (
        <React.Fragment>
            <div key={aitem.id} className="list-item flex flex-h flex-align">
                <div className="list-item col col-4 flex flex-v">
                    <p className="attribute-title">{aitem.name}</p>
                    <p className="attribute-description text-sub">
                        {aitem.description || 'Keine Beschreibung'}
                    </p>
                </div>
            </div>
            {IsPreview ? (
                <PreviewAttributeListItemValue
                    Attribute={Attribute}
                    OnAdd={OnAdd}
                />
            ) : (
                <AttributeAddedListItemValue
                    Attribute={Attribute}
                    OnRemove={OnRemove}
                />
            )}
            <div className="col col-4">
                <div
                    className="list-item flex-end btn btn-error btn-wide"
                    onClick={}
                >
                    <p>{ActionLabel}</p>
                </div>
            </div>
        </React.Fragment>
    );
};

const ListItemAddedAttribute = ({ Attribute, OnRemove, OnChange }) => {
    <div key={aitem.id} className="list-item flex flex-h flex-align">
        <div className="list-item col col-4 flex flex-v">
            <p className="attribute-title">{aitem.name}</p>
            <p className="attribute-description text-sub">
                {aitem.description || 'Keine Beschreibung'}{' '}
            </p>
        </div>
        <Field
            name={`attribute-${aitem.id}`}
            component="input"
            defaultValue={aitem.defaultValue}
        >
            {({ input }) => (
                <input
                    {...input}
                    className="attribute-value list-item col col-4"
                    placeholder={aitem.defaultValue}
                    onChange={(evt) =>
                        this.setAttributeValue(aitem.id, evt.target.value)
                    }
                />
            )}
        </Field>
        <div className="col col-4">
            <div
                className="list-item flex-end btn btn-error btn-wide"
                onClick={() => this.removeAttribute(aitem.id)}
            >
                <p>Remove</p>
            </div>
        </div>
    </div>;
};

const ListItemPreviewAttribute = ({ BaseAttribute, OnAdd }) => {
    <div key={aitem.id} className="list-item flex flex-h flex-align">
        <div className="list-item col col-4 flex flex-v">
            <p className="attribute-title">{aitem.name}</p>
            <p className="attribute-description text-sub">
                {aitem.description || 'Keine Beschreibung'}{' '}
            </p>
        </div>
        <p className="attribute-default-value list-item col col-4 text-center text-super msg-error">
            {aitem.defaultValue}
        </p>
        <div className="col col-4">
            <div
                className="list-item flex-end btn btn-ok btn-wide"
                onClick={() => this.addAttribute(aitem.id)}
            >
                <p>Add</p>
            </div>
        </div>
    </div>;
};

const CharacterSheetForm = class extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            Attributes: []
        };
    }

    addAttribute = (BaseId) => {
        if (
            !BaseId ||
            this.state.Attributes.find((AItem) => AItem.baseId == BaseId)
        ) {
            return true;
        }

        const Base = getLinkedAttribute(BaseId, this.props.attributeBases);

        if (!Base) {
            return true;
        }

        const SheetAttribute = createCharacterSheetAttribute(
            BaseId,
            Base.name,
            '',
            Base.defaultValue
        );

        this.setState({
            Attributes: [...this.state.Attributes, SheetAttribute]
        });

        return true;
    };

    /**
     * removes an attribute from this character sheet
     */
    removeAttribute = (BaseId) => {
        this.setState({
            Attributes: [
                ...this.state.Attributes.filter(
                    (AItem) => AItem.baseId != BaseId
                )
            ]
        });

        return true;
    };

    /**
     * updates the value of an attribute in this sheet
     */
    setAttributeValue = (BaseId, value) => {
        this.setState({
            Attributes: [
                ...this.state.Attributes.map((AItem) =>
                    AItem.baseId != BaseId ? AItem : { ...AItem, value }
                )
            ]
        });
    };

    /**
     * renders this component
     */
    render() {
        const { onSubmit, submitLabel } = this.props;

        return (
            <React.Fragment>
                <FormWrapper
                    formKey="character-sheet"
                    onSubmit={(values) => console.log(values)}
                    render={() => (
                        <React.Fragment>
                            <FormTitle title="Charactersheet Einträge" />
                            <FormFieldContainer horizontal>
                                <FormFieldHeader>
                                    <FormFieldTitle title="Name" />
                                </FormFieldHeader>
                                <FormFieldWrapper>
                                    <Field name="name" component="input">
                                        {({ input }) => (
                                            <input
                                                {...input}
                                                placeholder="Name"
                                            />
                                        )}
                                    </Field>
                                </FormFieldWrapper>
                            </FormFieldContainer>
                            <FormFieldContainer>
                                <FormFieldHeader className="list-item">
                                    <FormFieldTitle title="Attribute" />
                                </FormFieldHeader>
                                <FormFieldWrapper className="list-item flex flex-v flex-item-box">
                                    {this.props.attributeBases.map(
                                        (aitem) => {}
                                    )}
                                </FormFieldWrapper>
                                {/* this.state.Attributes.find(
                                            (item) => item.baseId == aitem.id
                                        ) ? (
                                            
                                        ) : (
                                            
                                        )
                                    )} */}
                            </FormFieldContainer>

                            {/*
								since no array like form input can be build with js
								like in php this field defines the range of given attributes
								the function which handles the submission then knows
								how many attributes are passed and can stop without an out-of-range
							*/}
                            <Field
                                name="attributesCount"
                                component="input"
                                type="hidden"
                                defaultValue={this.state.Attributes.length}
                            />
                            <SubmitButton>{submitLabel}</SubmitButton>
                            <pre>
                                AttributesCount:
                                {JSON.stringify(this.state.Attributes.length)}
                            </pre>
                            <pre>
                                {JSON.stringify(this.state, undefined, 2)}
                            </pre>
                        </React.Fragment>
                    )}
                />
                {/* <pre>{JSON.stringify(attributes, null, 2)}</pre> */}
            </React.Fragment>
        );
    }
};

CharacterSheetForm.defaultProps = defaultProps;

export default CharacterSheetForm;
