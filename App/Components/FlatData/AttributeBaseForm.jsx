/**
 * @File attribute bases form
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
    entry: null
};

const AttributeBaseForm = (props) => {
    const { onSubmit, submitLabel } = { ...initialProps, ...props };

    return (
        <FormWrapper
            onSubmit={onSubmit}
            render={() => (
                <React.Fragment>
                    <FormTitle title="Attributbasis" />
                    <FormFieldContainer horizontal>
                        <FormFieldHeader>
                            <FormFieldTitle title="Name" />
                        </FormFieldHeader>
                        <FormFieldWrapper>
                            <Field name="name" component="input">
                                {({ input }) => <input {...input} placeholder="Name" />}
                            </Field>
                        </FormFieldWrapper>
                    </FormFieldContainer>
                    <FormFieldContainer horizontal>
                        <FormFieldHeader>
                            <FormFieldTitle title="Standardwert" />
                            <FormFieldDescription>
                                <p>
                                    Dieser Wert wird verwendet wenn dem Character Sheet Attribut
                                    kein Wert gegeben wurde.
                                </p>
                            </FormFieldDescription>
                        </FormFieldHeader>
                        <FormFieldWrapper>
                            <Field name="defaultValue" component="input">
                                {({ input }) => <input {...input} placeholder="Standardwert" />}
                            </Field>
                        </FormFieldWrapper>
                    </FormFieldContainer>
                    <SubmitButton>{submitLabel}</SubmitButton>
                </React.Fragment>
            )}
        />
    );
};

export default AttributeBaseForm;
