/**
 * @File generic form for the attribute sets
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
import { SubmitButton } from '../Form/Buttons';

const initialProps = {
    onSubmit: () => {},
    submitLabel: 'Hinzufügen',
    entry: null,
    bases: []
};

const getLinkedBaseUsageStateObject = (bases, usedBases) => {
    const usageStateReducer = (linked, base) => {
        const used = usedBases.find((id) => base.id == id);

        linked[used !== undefined ? 'linkedUsedBases' : 'linkedUnusedBases'].push(base);
        return linked;
    };

    const filtered = bases.reduce(usageStateReducer, {
        linkedUsedBases: [],
        linkedUnusedBases: []
    });

    return filtered;
};

const AttributeSetForm = (props) => {
    const { onSubmit, submitLabel, entry, bases } = { ...initialProps, ...props };

    const [selectedBases, setSelectedBases] = React.useState([]);

    // Todo: Change the way the used and unused bases arrays are build
    //	the way it currently works is in loops the attributeBases object's entries
    //	and therefore preserves the sorting order of that object
    // 	the way it should rather work is it should preserve the sorting order
    // 	of the selection of the use. Selecting A1 -> A3 -> A2 into usedBases array
    // 	should stay in that order and should be displayed in that order when printing usedBases
    const { linkedUsedBases, linkedUnusedBases } = getLinkedBaseUsageStateObject(
        bases,
        selectedBases
    );

    // Todo: implement initial form state
    // const initialFormState =

    // Fixme: reset selected bases when form submitted
    return (
        <React.Fragment>
            <p className="text-title msg-error">
                Editieren momentan nicht möglich. Vorsicht beim abspeichern des Satzes!
            </p>
            <FormWrapper
                onSubmit={onSubmit}
                render={() => (
                    <React.Fragment>
                        <FormTitle title="Attribut Satz" />
                        <FormFieldContainer horizontal>
                            <FormFieldHeader>
                                <FormFieldTitle title="Name" />
                            </FormFieldHeader>
                            <FormFieldWrapper>
                                <Field name="name" component="input">
                                    {({ input }) => (
                                        <input {...input} placeholder="Name" required />
                                    )}
                                </Field>
                            </FormFieldWrapper>
                        </FormFieldContainer>
                        <FormFieldContainer horizontal>
                            <FormFieldHeader>
                                <FormFieldTitle title="Verfügbare Attribute" />
                                <FormFieldDescription>
                                    <p>
                                        Attributbasen die noch zur Auswahl stehen, um in dieses Set
                                        hinzuzufügen.
                                    </p>
                                </FormFieldDescription>
                            </FormFieldHeader>
                            <FormFieldWrapper>
                                <select
                                    onChange={(evt) =>
                                        setSelectedBases([...selectedBases, evt.target.value])
                                    }
                                >
                                    <option value="null">- Auswählen -</option>
                                    {linkedUnusedBases.map((item) => (
                                        <option key={item.id} value={item.id}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            </FormFieldWrapper>
                        </FormFieldContainer>
                        <FormFieldContainer>
                            <FormFieldHeader>
                                <FormFieldTitle>Selektierte Basen</FormFieldTitle>
                                <FormFieldDescription>
                                    {!linkedUsedBases.length ? (
                                        <p className="msg-error">Keine Basen ausgewählt</p>
                                    ) : (
                                        <div className="flex flex-h flex-wrap">
                                            {linkedUsedBases.map((item) => (
                                                <div
                                                    key={item.id}
                                                    onClick={() =>
                                                        setSelectedBases(
                                                            selectedBases.filter(
                                                                (id) => id != item.id
                                                            )
                                                        )
                                                    }
                                                >
                                                    <p className="list-item msg-error">
                                                        {item.name}/{item.defaultValue}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </FormFieldDescription>
                                {selectedBases.length ? (
                                    <FormFieldDescription className="text-sub">
                                        Zum entfernen auf das Attribut klicken in der Liste
                                    </FormFieldDescription>
                                ) : null}
                            </FormFieldHeader>
                        </FormFieldContainer>

                        <Field
                            name="bases"
                            component="input"
                            type="hidden"
                            defaultValue={selectedBases.join(',')}
                        />
                        <SubmitButton>{submitLabel}</SubmitButton>
                    </React.Fragment>
                )}
            />
        </React.Fragment>
    );
};

export default AttributeSetForm;
