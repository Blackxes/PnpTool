/**
 * @File editing interface for an equation unit
 *
 * @Author Alexander Bassov
 * @Email blackxes.dev@gmail.com
 */

import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTimes as fasTimes,
    faTrash as fasTrash
} from '@fortawesome/free-solid-svg-icons';
import { Selection } from '../../../Form/FormComponents';
import { joinStrings } from '../../../../Logic/Source/Miscellaneous/functions';

const EquationListItemEditAttribute = ({
    equationUnit,
    attributeBases,
    stopEditing,
    updateUnit
}) => {
    const { linked: attribute, config } = equationUnit;

    const baseOptions = attributeBases.map((item) => ({
        id: item.id,
        label: item.name,
        value: item.id
    }));

    const [tempSelectedBase, setTempSelectedBase] = React.useState(
        equationUnit.config.contextId
    );

    const selectType =
        equationUnit.config.contextId != tempSelectedBase ? 'warning' : 'info';

    return (
        <div className="container-box">
            <div className="container flex flex-h">
                <p className="list-item">
                    Attribut {attribute?.name || 'Unbenannt'} bearbeiten
                </p>
                <div
                    className="list-item btn btn-error flex-end"
                    onClick={() => stopEditing(equationUnit.id)}
                >
                    <FontAwesomeIcon icon={fasTimes} />
                </div>
            </div>
            <Selection
                className=""
                type={selectType}
                items={baseOptions}
                nothingSelectedLabel={false}
                defaultValue={tempSelectedBase || equationUnit.config.contextId}
                onChange={(evt) => setTempSelectedBase(evt.target.value)}
            />
            <button
                type="button"
                className="btn btn-ok"
                onClick={() => {
                    updateUnit(equationUnit.id, {
                        config: {
                            ...equationUnit.config,
                            contextId: tempSelectedBase
                        },
                        isNew: false
                    });
                    stopEditing(equationUnit.id);
                }}
            >
                Speichern
            </button>
        </div>

        // <p>Editing {config.equationUnitId}</p>
        // <EquationContext.Consumer>
        // 	{({ saveEditing, stopEditing }) => {
        // 		<div className="flex flex-v">
        //     <p>Editing</p>
        //     <div className="btn btn-ok" onClick={() => onStopEditing}>
        //         Save
        //     </div>
        //     <div
        //         className="btn btn-error"
        //         onClick={() => onCancelEditing(config.equationUnitId)}
        //     >
        //         Discard
        //     </div>
        // </div>
        // 	}}

        // </EquationContext.Consumer>
    );
};

export default EquationListItemEditAttribute;
