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
    FormFieldWrapper
} from '../Form/FormComponents';
import { SubmitButton, Button } from '../Form/Buttons';
import {
    getLinkedAttribute,
    CreateShallowCharacterSheetAttribute
} from '../../Logic/Source/FlatData/functions';
import {
    findInArray,
    joinStrings,
    someInArray
} from '../../Logic/Miscellaneous/Functions';
import {
    faPlus as FasPlus,
    faMinus as FasMinus
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/**
 * initial props
 */
const defaultProps = {
    onSubmit: () => {},
    submitLabel: 'Hinzufügen',
    characterSheetEntry: null,
    attributeBases: []
};

/**
 * header of the attribute list item
 * regardless of its state (added/preview)
 */
const AttributeListItemHeader = ({ Attribute }) => {
    const { name, description } = Attribute;

    return (
        <div className="list-item col col-4 flex flex-v">
            <p className="attribute-title">{name}</p>
            <p className="attribute-description text-sub">
                {description || 'Keine Beschreibung'}
            </p>
        </div>
    );
};

/**
 * builds the name for an attribute field
 */
const BuildAttributeFormFieldName = (id, key) => {
    return 'attribute_' + id + '_' + key;
};

/**
 * attribute list item value component for when the attribute has been added to the sheet
 */
const CharacterSheetAttributeValue = ({ Attribute, OnChange }) => {
    const { baseId, value, defaultValue } = Attribute;

    return (
        <React.Fragment>
            <Field
                name={BuildAttributeFormFieldName(baseId, 'value')}
                component="input"
                defaultValue={value}
            >
                {({ input }) => (
                    <input
                        {...input}
                        className="attribute-value list-item"
                        placeholder={defaultValue}
                        onChange={(evt) =>
                            OnChange(Attribute.baseId, evt.target.value)
                        }
                    />
                )}
            </Field>
        </React.Fragment>
    );
};

/**
 * preview value component of an attribute which has not been added so far
 */
const PreviewAttributeListItemValue = ({ AttributeBase }) => {
    const { defaultValue } = AttributeBase;

    return (
        <p className="attribute-default-value list-item col col-4 text-center text-super msg-error">
            {defaultValue}
        </p>
    );
};

/**
 * general list item which either can represent a previewed attribute base
 * or an added attribute to the charactersheet therefore an charactersheet attribute
 */
const CharacterSheetAttributeListItem = ({
    Base,
    SheetAttribute,
    OnAdd,
    OnRemove,
    OnChange
}) => {
    const ButtonClassNames = joinStrings([
        'flex-end btn',
        [!SheetAttribute, 'btn-ok', 'btn-error']
    ]);

    return (
        <div className="attribute-item list-item flex flex-h flex-align flex-fill">
            <AttributeListItemHeader Attribute={Base} />
            {!SheetAttribute ? (
                <PreviewAttributeListItemValue AttributeBase={Base} />
            ) : (
                <CharacterSheetAttributeValue
                    Attribute={SheetAttribute}
                    OnChange={OnChange}
                />
            )}
            <div className="list-item col col-4">
                <div
                    className={ButtonClassNames}
                    onClick={
                        !SheetAttribute
                            ? () => {
                                  OnAdd(Base.id);
                              }
                            : () => OnRemove(SheetAttribute.baseId)
                    }
                >
                    {!SheetAttribute ? (
                        <FontAwesomeIcon className="msg-ok" icon={FasPlus} />
                    ) : (
                        <FontAwesomeIcon
                            className="msg-error"
                            icon={FasMinus}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

/**
 * character sheet form component
 * serves as an creation and update component for character sheets
 */
const CharacterSheetForm = class extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            Attributes: []
        };
    }

    /**
     * adds an attribute base to this sheets attribute
     */
    AddAttribute = (baseId) => {
        const Attribute = someInArray(this.state.Attributes, baseId, 'baseId');

        if (!baseId || Attribute) return true;

        const base = getLinkedAttribute(baseId, this.props.attributeBases);

        if (!base) return true;

        const SheetAttribute = CreateShallowCharacterSheetAttribute(
            base.id,
            base.defaultValue
        );

        this.setState({
            Attributes: [...this.state.Attributes, SheetAttribute]
        });

        return true;
    };

    /**
     * adds every attribute base to this sheet
     */
    AddAllAttributes = () => {
        // filter bases which are already included
        // and no.. its not a, b, c item.. its b-aseitem and a-ttributeitem
        const free = this.props.attributeBases.filter(
            (bitem) =>
                !this.state.Attributes.some((aitem) => aitem.baseId == bitem.id)
        );

        console.log(free);

        // build shallow instances
        const shallows = free.map((fitem) =>
            CreateShallowCharacterSheetAttribute(fitem.id, fitem.defaultValue)
        );

        console.log(shallows);

        // insert into state
        this.setState({
            Attributes: [...this.state.Attributes, ...shallows]
        });

        return true;
    };

    /**
     * removes an attribute from this character sheet
     */
    RemoveAttribute = (ABaseId) => {
        this.setState({
            Attributes: [
                ...this.state.Attributes.filter(
                    (AItem) => AItem.baseId != ABaseId
                )
            ]
        });

        return true;
    };

    /**
     * updates the value of an attribute in this sheet
     */
    SetAttributeValue = (baseId, value) => {
        this.setState({
            Attributes: [
                ...this.state.Attributes.map((aitem) =>
                    aitem.baseId != baseId ? aitem : { ...aitem, value }
                )
            ]
        });
    };

    /**
     * returns an attribute by the baseId
     */
    GetAttribute = (baseId) => {
        return this.state.Attributes.find((aitem) => aitem.baseId == baseId);
    };

    /**
     * returns the attribute base
     */
    GetAttributeBase = (BaseId) => {
        return findInArray(this.props.attributeBases, BaseId);
    };

    /**
     * returns a concatenated string of added attributes ids
     */
    GetAttributesBaseIdsString = () => {
        return this.state.Attributes.map((aitem) => aitem.baseId).join(',');
    };

    /**
     * checks whether given id refers to an attribute added to this sheet
     */
    IsAdded = (BaseId) => {
        return this.state.Attributes.some((AItem) => AItem?.baseId == BaseId);
    };

    /**
     * resets the attributes state
     */
    ResetAttributes = () => {
        this.setState({
            Attributes: []
        });

        return true;
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
                    onSubmit={(values) => {
                        onSubmit(values);
                        this.ResetAttributes();
                    }}
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
                                                required
                                            />
                                        )}
                                    </Field>
                                </FormFieldWrapper>
                            </FormFieldContainer>
                            <FormFieldContainer fieldKey="attributes">
                                <div className="flex flex-h flex-align">
                                    <FormFieldHeader className="list-item col col-12">
                                        <FormFieldTitle title="Attribute" />
                                    </FormFieldHeader>
                                    <div
                                        type="info"
                                        className="list-item btn btn-info flex-end text-nowrap"
                                        onClick={this.AddAllAttributes}
                                    >
                                        Alle Attribute hinzufügen
                                    </div>
                                </div>

                                <FormFieldWrapper className="attributes list-item flex flex-v flex-item-box">
                                    {this.props.attributeBases.map((aitem) => (
                                        <CharacterSheetAttributeListItem
                                            key={aitem.name}
                                            Base={aitem}
                                            SheetAttribute={this.GetAttribute(
                                                aitem.id
                                            )}
                                            OnAdd={this.AddAttribute}
                                            OnRemove={this.RemoveAttribute}
                                            OnChange={this.SetAttributeValue}
                                        />
                                    ))}
                                </FormFieldWrapper>
                            </FormFieldContainer>
                            <Field
                                name="attribute_ids"
                                component="input"
                                type="hidden"
                                defaultValue={this.GetAttributesBaseIdsString()}
                            />
                            <SubmitButton>{submitLabel}</SubmitButton>
                        </React.Fragment>
                    )}
                />
                <pre>{JSON.stringify(this.state, null, 2)}</pre>
            </React.Fragment>
        );
    }
};

CharacterSheetForm.defaultProps = defaultProps;

export default CharacterSheetForm;
