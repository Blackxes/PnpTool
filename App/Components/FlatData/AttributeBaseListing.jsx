/**
 * @File listing of the attribute bases
 *
 * @Author Alexander Bassov
 * @Email blackxes.dev@gmail.com
 */

import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash as fasTrash } from '@fortawesome/free-solid-svg-icons';

import { Button } from '../Form/Buttons';
import { Form, Field } from 'react-final-form';

const AttributeBaseListing = ({ bases, silent = false, onDelete = null }) => {
    if (!bases || !bases.length) {
        return !silent && <p>No Attributebases given</p>;
    }

    const mapped = bases.map((item) => {
        return (
            <li
                key={item.id}
                className="attribute-base-item list-item flex flex-h flex-align"
            >
                <p className="col col-6">{item.name}</p>
                <p className="col col-6">{item.defaultValue}</p>
                {onDelete && (
                    <Form
                        onSubmit={onDelete}
                        render={({ handleSubmit }) => (
                            <React.Fragment>
                                <form onSubmit={handleSubmit}>
                                    <Field
                                        name="attributeId"
                                        component="input"
                                        type="hidden"
                                        defaultValue={item.id}
                                    />
                                    <Button type="error">
                                        <FontAwesomeIcon icon={fasTrash} />
                                    </Button>
                                </form>
                            </React.Fragment>
                        )}
                    />
                )}
            </li>
        );
    });

    return <ul className="list list-v list-align">{mapped}</ul>;
};

export default AttributeBaseListing;
