/**
 * @File forms which purpose is solely to add flat data
 *
 * @Author Alexander Bassov
 * @Email blackxes.dev@gmail.com
 */

import * as React from 'react';
import {
    FormWrapper,
    FormFieldContainer,
    FormFieldHeader,
    FormFieldTitle,
    FormFieldWrapper,
    FormFieldDescription,
    FormTitle
} from './Form/FormComponents';
import { Field } from 'react-final-form';
import { Button, SubmitButton, ErrorButton } from './Form/Buttons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash as fasTrash } from '@fortawesome/free-solid-svg-icons';

/**
 * attribute bases
 */

/**
 * sheet attribute
 */
export const AttributeSetForm = ({ attributeBases, onSubmit }) => {
    const [selected, setSelected] = React.useState([]);

    const selectable = attributeBases.filter(
        (attr) => !selected.find((item) => item == attr.id)
    );

    const selectedLinked = selected.map((item) =>
        attributeBases.find((base) => base.id == item)
    );

    return (
        <FormWrapper
            onSubmit={(values) => console.log(values)}
            render={() => (
                <React.Fragment>
                    <FormTitle title="Attributset" />
                    <FormFieldContainer horizontal>
                        <FormFieldHeader>
                            <FormFieldTitle title="Name" />
                        </FormFieldHeader>
                        <FormFieldWrapper>
                            <Field name="name">
                                {({ input }) => (
                                    <input {...input} placeholder="Name" />
                                )}
                            </Field>
                        </FormFieldWrapper>
                    </FormFieldContainer>
                    <FormFieldContainer horizontal>
                        {!selectable.length ? (
                            <p className="text-sub text-center msg-warning">
                                Alle Attribute ausgewählt
                            </p>
                        ) : (
                            <React.Fragment>
                                <FormFieldHeader>
                                    <FormFieldTitle title="Verfügbare Attribute" />
                                </FormFieldHeader>
                                <FormFieldWrapper>
                                    <select
                                        onChange={(evt) =>
                                            setSelected([
                                                ...selected,
                                                evt.target.value
                                            ])
                                        }
                                    >
                                        <option value="null">
                                            - Auswählen -
                                        </option>
                                        {selectable.map((item) => (
                                            <option
                                                key={item.id}
                                                value={item.id}
                                            >
                                                {item.name}
                                            </option>
                                        ))}
                                    </select>
                                </FormFieldWrapper>
                            </React.Fragment>
                        )}
                    </FormFieldContainer>
                    <FormFieldContainer horizontal>
                        <FormFieldHeader className="flex-align-start">
                            <FormFieldTitle title="Ausgewählte Attribute" />
                        </FormFieldHeader>
                        <div className="selected-attributes-list">
                            {(!selectedLinked.length && (
                                <p className="text-sub text-center msg-error">
                                    Keine Attribute ausgewählt
                                </p>
                            )) || (
                                <ul className="flex flex-v">
                                    {selectedLinked.map((item) => (
                                        <li key={item.id} className="list-item">
                                            <div className="flex flex-h flex-align">
                                                <p className="list-item remove-from-selected-title">
                                                    {item.name}
                                                </p>
                                                <ErrorButton
                                                    className="list-item flex-end remove-from-selected-trigger"
                                                    onClick={() =>
                                                        setSelected([
                                                            ...selected.filter(
                                                                (selct) =>
                                                                    selct !=
                                                                    item.id
                                                            )
                                                        ])
                                                    }
                                                >
                                                    <FontAwesomeIcon
                                                        icon={fasTrash}
                                                    />
                                                </ErrorButton>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </FormFieldContainer>
                    <Field
                        name="selected-attributes"
                        component="input"
                        type="hidden"
                        defaultValue={selected.join(',')}
                    />

                    <SubmitButton>Hinzufügen</SubmitButton>
                </React.Fragment>
            )}
        />
    );
};

export const CharacterSheetForm = ({ attributeBases }) => {
    const [sheetAttributes, setSheetAttributes] = React.useState([]);
    const [usedAttributeBases, setUsedAttributeBases] = React.useState([]);

    const baseEntries = Object.entries(attributeBases || {});

    // Todo: Change the way the used and unused bases arrays are build
    //	the way it currently works is in loops the attributeBases object's entries
    //	and therefore preserves the sorting order of that object
    // 	the way it should rather work is it should preserve the sorting order
    // 	of the selection of the use. Selecting A1 -> A3 -> A2 into usedBases array
    // 	should stay in that order and should be displayed in that order when printing usedBases
    const baseEntriesReducer = (linked, [ind, base]) => {
        const used = usedAttributeBases.find((id) => base.id == id);

        linked[used !== undefined ? 'usedBases' : 'unusedBases'].push(base);
        return linked;
    };
    const { usedBases, unusedBases } = baseEntries.reduce(baseEntriesReducer, {
        usedBases: [],
        unusedBases: []
    });

    console.log(JSON.stringify(usedBases, undefined, 2));

    return (
        <React.Fragment>
            <FormWrapper
                onSubmit={(evt) => console.log(evt)}
                render={({}) => (
                    <React.Fragment>
                        <FormTitle title="Charactersheet" />

                        {/* name */}
                        <FormFieldContainer horizontal>
                            <FormFieldHeader>
                                <FormFieldTitle title="Name" />
                            </FormFieldHeader>
                            <FormFieldWrapper>
                                <Field name="name">
                                    {({ input }) => (
                                        <React.Fragment>
                                            <input
                                                {...input}
                                                placeholder="Name"
                                            />
                                        </React.Fragment>
                                    )}
                                </Field>
                            </FormFieldWrapper>
                        </FormFieldContainer>

                        {/* attributes */}
                        <FormFieldContainer horizontal>
                            <div className="flex flex-v">
                                <FormFieldHeader>
                                    <FormFieldTitle title="Attributbasen" />
                                </FormFieldHeader>
                                <div>
                                    {!usedBases.length ? (
                                        <p className="text-sub msg-info">
                                            Es werden keine Attributbasen
                                            verwendet
                                        </p>
                                    ) : (
                                        <div className="flex flex-h flex-wrap">
                                            {usedBases.map((item) => (
                                                <p className="text-sub msg-info">
                                                    {item.name}
                                                </p>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <FormFieldWrapper className="flex-align-start">
                                <Field component="select">
                                    {() => (
                                        <select
                                            onChange={(evt) =>
                                                setUsedAttributeBases([
                                                    ...usedAttributeBases,
                                                    evt.target.value
                                                ])
                                            }
                                        >
                                            <option value="null">
                                                - Auswählen -
                                            </option>
                                            {unusedBases.map((item) => (
                                                <option
                                                    key={item.id}
                                                    value={item.id}
                                                >
                                                    {item.name}
                                                </option>
                                            ))}
                                        </select>
                                    )}
                                </Field>
                            </FormFieldWrapper>
                        </FormFieldContainer>

                        {/* attributes */}
                        <SubmitButton>Hinzufügen</SubmitButton>
                    </React.Fragment>
                )}
            />
        </React.Fragment>
    );
};
