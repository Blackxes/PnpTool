/**
 * @File builds basically the equation components and the possible in-between parts
 * 	the inbetween parts are components like "Add-Component" Button which enables
 * 	the component editing. Or the editing interface for a component
 *
 * 	this component determines which component the current index should be
 * 	and wraps it into a noice container
 *
 * @Author Alexander Bassov
 * @Email blackxes.dev@gmail.com
 */

import * as React from 'react';
import { CreateEquationUnitButton } from './EquationListItems';
import { generateId } from '../../../Logic/Source/Miscellaneous/functions';
import { EquationContext } from './EquationBuilder';

import EquationItemsRenderConfig from './EquationItemsRenderConfig';

const EquationListBuilder = ({
    equationUnits,
    createUnit,
    editingUnits,
    permitUnitAddition = true
}) => {
    // build items / these items can be one of the following components
    // - EquationUnitListItem - an equation unit item with a valid type
    // - AddEquationUnit - enables the equationUnitConfiguration and initializes a new EquationUnit on that index
    // - EquationEditingInterface - the interface for the user to confgure or change the EquationUnit
    //
    const unitComponentList = [];

    // runs until (when adding actions are enabled) every component is build (*2 +1)
    // +1 because of the last adding action
    const capLock = +permitUnitAddition;
    const loopCap = equationUnits?.length * (1 + capLock) + capLock || 0;

    // capLock = boolean;
    // const loopCap = 2 * (1 + capLock) + capLock || 0;

    for (let i = 0; unitComponentList.length < loopCap; i++) {
        if (permitUnitAddition) {
            unitComponentList.push(
                <li key={generateId()} className="list-item mn">
                    <CreateEquationUnitButton
                        onCreateUnit={() => createUnit(i)}
                    />
                </li>
            );
        }

        // when the loop is about to reacth the max by 1 loop run
        // this equation unit does not exists since the loopCap
        // is based on the permission to add more units
        // when disabled this doesnt matter
        if (unitComponentList.length < loopCap) {
            const unit = equationUnits[i];

            if (!unit) {
                unitComponentList.push(
                    <p className="list-item mtb">Nothing found</p>
                );
                continue;
            }

            const renderConfig = EquationItemsRenderConfig[unit.type];

            if (renderConfig == undefined) {
                unitComponentList.push(
                    <p className="list-item mtb">
                        {'No renderconfiguration found for type ' + unit.type}
                    </p>
                );
                continue;
            }

            const UnitViewComponent =
                editingUnits.includes(unit.id) || unit.isNew
                    ? renderConfig.editing
                    : renderConfig.listItem;

            unitComponentList.push(
                <li key={generateId()} className="list-item mtb">
                    <EquationContext.Consumer>
                        {(props) => (
                            <UnitViewComponent {...props} equationUnit={unit} />
                        )}
                    </EquationContext.Consumer>
                </li>
            );
        }
    }

    return <ul className="flex flex-v flex-align">{unitComponentList}</ul>;
};

export default EquationListBuilder;
