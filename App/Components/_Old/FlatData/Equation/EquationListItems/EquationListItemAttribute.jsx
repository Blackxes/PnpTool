/**
 * @File equation unit list item of type attribute
 *
 * @Author Alexander Bassov
 * @Email blackxes.dev@gmail.com
 */

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSyncAlt as fasSyncAlt,
    faTimes as fasTimes
} from '@fortawesome/free-solid-svg-icons';
import { joinStrings } from '../../../../Logic/Miscellaneous/Functions';
import { EquationContext } from '../EquationBuilder';

const EquationListItemAttribute = ({ equationUnit, startEditing }) => {
    const { linked: attribute, config } = equationUnit;

    const informationClassNames = joinStrings([
        'list-item item-max container-box flex flex-h flex-fill text-center flex-align',
        [attribute.isFallback, 'error']
    ]);

    const attributeNameClassNames = joinStrings([
        'list-item',
        [attribute.isFallback, 'msg-error']
    ]);

    return (
        <EquationContext.Consumer>
            {({ removeUnit, startEditing }) => {
                return (
                    <div className="flex flex-h flex-nospace">
                        <div
                            className="list-item btn btn-info"
                            onClick={() => startEditing(config.equationUnitId)}
                        >
                            <FontAwesomeIcon icon={fasSyncAlt} />
                        </div>
                        <div className={informationClassNames}>
                            <p className={attributeNameClassNames}>
                                {attribute.name}
                            </p>
                            <p className="list-item flex flex-h flex-align flex-justify">
                                <React.Fragment>
                                    {(!attribute.isFallback && (
                                        <span className="list-item msg-error">
                                            {attribute.value}
                                        </span>
                                    )) || (
                                        <span className="list-item msg-info">
                                            Standardwert:{' '}
                                            {attribute.defaultValue}
                                        </span>
                                    )}

                                    {/* <span className="list-item text-sub">///</span> */}
                                </React.Fragment>
                            </p>
                        </div>
                        <div
                            className="btn btn-error"
                            onClick={() => removeUnit(config.equationUnitId)}
                        >
                            <FontAwesomeIcon icon={fasTimes} />
                        </div>
                    </div>
                );
            }}
        </EquationContext.Consumer>
    );
};

export default EquationListItemAttribute;
