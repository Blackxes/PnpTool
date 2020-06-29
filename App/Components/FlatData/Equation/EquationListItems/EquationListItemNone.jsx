/**
 * @File initial view when creating a new equation unit
 *
 * @Author Alexander Bassov
 * @Email blackxes.dev@gmail.com
 */

import React from 'react';
import { Selection } from '../../../Form/FormComponents';
import { generateId } from '../../../../Logic/Source/Miscellaneous/functions';

// none is not listed since its the default from where you select an actual type
const EquationItemTypes = ['attribute', 'symbol', 'constant', 'equation'];

const EquationListItemNone = ({
    equationUnit,
    removeUnit,
    updateUnit,
    ...props
}) => {
    const { config } = equationUnit;

    const [type, setType] = React.useState('');

    const eqTypesOptionsConfigs = EquationItemTypes.map((item) => ({
        id: generateId(),
        label: item,
        value: item
    }));

    return (
        <div className="container-box flex flex-v">
            <div className="list-item mb flex flex-h flex-align flex-fill">
                <p className="list-item text-center">
                    Bitte einen Typen auswählen
                </p>
                <Selection
                    className="list-item item-max"
                    type="info"
                    items={eqTypesOptionsConfigs}
                    defaultValue={type}
                    onChange={(evt) => setType(evt.target.value)}
                />
            </div>
            <div className="list-item flex flex-h end">
                <button
                    type="button"
                    className="list-item btn btn-error"
                    onClick={() => removeUnit(config.equationUnitId)}
                >
                    Abbrechen
                </button>
                <button
                    type="button"
                    className="list-item btn btn-ok"
                    onClick={() =>
                        updateUnit(equationUnit.id, {
                            type
                        })
                    }
                >
                    Weiter
                </button>
            </div>
        </div>
    );
};

export default EquationListItemNone;
