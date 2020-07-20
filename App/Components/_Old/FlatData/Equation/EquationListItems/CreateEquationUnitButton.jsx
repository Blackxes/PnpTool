/**
 * @File button to add an equation unit to the editing list
 *
 * 	the reason why i called it "StartUnitEditing" instead of "AddEquationUnit" or similar
 * 	is because the start of an editing fits more the flow of the equation unit building
 *
 * 	Todo: finish header description / important
 *
 * @Author Alexander Bassov
 * @Email blackxes.dev@gmail.com
 */

import * as React from 'react';
import { Button } from '../../../Form/Buttons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus as fasPlus } from '@fortawesome/free-solid-svg-icons';

/**
 * starts onClick the editing of a new equation unit
 */
const CreateEquationUnitButton = ({ onCreateUnit }) => {
    return (
        <Button fullWidth type="ok" onClick={onCreateUnit}>
            <FontAwesomeIcon icon={fasPlus} />
        </Button>
    );
};

export default CreateEquationUnitButton;
