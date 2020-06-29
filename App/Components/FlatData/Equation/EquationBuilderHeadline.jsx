/**
 * @File display the headline of the equation builder
 * 	or the selection when no sheet is selected
 *
 * @Author Alexander Bassov
 * @Email blackxes.dev@gmail.com
 */

import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes as fasTimes } from '@fortawesome/free-solid-svg-icons';
import { Selection } from '../../Form/FormComponents';

/**
 * when no sheet is selected this component will be returned by the header
 */
const SheetSelection = ({ sheetEntities, onChange }) => {
    // mapped sheets / id, name
    const mappedSelectItems = sheetEntities.map((item) => ({
        id: item.name,
        label: item.name,
        value: item.id
    }));

    <Selection
        selectionKey="character-sheet"
        type="info"
        items={mappedSelectItems}
    />;
};

const EquationBuilderHeadline = ({
    selectedSheet,
    sheetEntities,
    onSelectSheet,
    onDeselectSheet
}) => {
    if (selectedSheet) {
        <SheetSelection
            sheetEntities={sheetEntities}
            onChange={onSelectSheet}
        />;
    }

    const linkedSheet =
        selectedSheet &&
        sheetEntities.find((sitem) => sitem.id == selectedSheet);

    if (selectedSheet) {
        // on selected sheet
        return (
            <div className="container container-box flex flex-h flex-align">
                <div
                    className="list-item btn btn-info"
                    onClick={onDeselectSheet}
                >
                    <FontAwesomeIcon icon={fasTimes} />
                </div>
                <h1 className="list-item flex flex-h flex-align">
                    <span className="list-item">Charactersheet</span>
                    <span className="list-item text-sub">///</span>
                    <span className="list-item msg-info">
                        {linkedSheet.name}
                    </span>
                </h1>
            </div>
        );
    }

    const sheetSelectOptions = sheetEntities.map((sitem) => ({
        id: sitem.id,
        label: sitem.name,
        value: sitem.id
    }));

    // on sheet selectection
    return (
        <React.Fragment>
            <div className="container container-box flex flex-h flex-align">
                <h1 className="list-item flex flex-h flex-align">
                    <span className="list-item">Charactersheet</span>
                    <span className="list-item text-sub">///</span>
                </h1>
                <Selection
                    className="list-item item-max"
                    type="error"
                    items={sheetSelectOptions}
                    defaultValue={selectedSheet}
                    onChange={onSelectSheet}
                />
            </div>
            <p className="container-box info">
                Ohne einen ausgewählten Charaktersheet kann keine Formel
                editiert oder erstellt werden.
            </p>
        </React.Fragment>
    );
};

export default EquationBuilderHeadline;
