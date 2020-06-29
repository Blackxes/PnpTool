/**
 * @File functions for FlatData
 *
 * @Author Alexander Bassov
 * @Email blackxes.dev@gmail.com
 */

import {
    AttributeBase,
    CharacterSheetAttribute,
    AttributeSet,
    CharacterSheet,
    ShallowCharacterSheetAttribute,
    LinkedEquationUnit
} from './models';
import {
    processCallbacks,
    findInArray,
    joinStrings
} from '../Miscellaneous/functions';

/**
 * creation functions
 */
export const createAttributeBase = (name, defaultValue) =>
    new AttributeBase(name, defaultValue);
export const createAttributeSet = (name, description, attributes) =>
    new AttributeSet(name, description, attributes);
export const createCharacterSheetAttribute = (baseId, value) =>
    new CharacterSheetAttribute(baseId, value);
export const createCharacterSheet = (name, attributes) =>
    new CharacterSheet(name, attributes);
// const createEquationSymbol = (type, name, value) =>
//     new EquationSymbol(type, name, value);
// const createForm = (name, items) => new Form(name, items);
// const createFormItem = (type, value) => new FormItem(type, value);
// const createFormItemValue = (contextId) => new FormItemValue(contextId);
// const createFormSheetOptions = (formId, sheetId, IgnoredAttributes) => new FormSheetOptions(formId, sheetId, IgnoredAttributes);
// const createIgnoredAttribute = (baseId, defaultValue) => new IgnoredAttribute(baseId, defaultValue);

/**
 * creation functions from submitted forms
 */
export const createAttributeBaseFromSubmission = (values) => {
    return createAttributeBase(values.name, values.defaultValue);
};
// const createEquationSymbolFromSubmission = (type, name, value) =>
//     new EquationSymbol(type, name, value);
// const createFormFromSubmission = (name, items) => new Form(name, items);
// const createFormItemFromSubmission = (type, value) => new FormItem(type, value);
// const createFormItemValueFromSubmission = (contextId) => new FormItemValue(contextId);
// const createFormSheetOptionsFromSubmission = (formId, sheetId, IgnoredAttributes) => new FormSheetOptions(formId, sheetId, IgnoredAttributes);

/**
 * shallow creation functions
 * these instance have no id and are invalid on their own
 * they are only used to be value container and overwrite existing instances
 */
export const CreateShallowCharacterSheetAttribute = (BaseId, Value) => {
    return new ShallowCharacterSheetAttribute(BaseId, Value);
};
export const CreateShallowCharacterSheet = (values) => {
    const Sheet = CreateCharacterSheet(values.name, values.attributes);
    delete Sheet.id;
    return Sheet;
};

/**
 * value getter from submission
 */
export const getAttributeIdFromSubmission = (values) => values.attributeId;

/**
 * linker
 */
export const getLinkedAttribute = (id, attrs) =>
    attrs.find((aitem) => aitem.id == id);
export const getLinkedAttributes = (ids, attrs) =>
    Array.from(ids || 0).map((id) => attrs.find((aitem) => aitem.id == id));
export const getLinkedSet = (id, sets) =>
    sets && sets.find((sitem) => sitem.id == id);

/**
 * links an equation unit to its type as well as linking every id in the instanse
 * 	behind the contextId to the referenced values
 * 	- eg. the attributes array of the sheet object - these ids 	will get linked
 * 	to the base attribute - obviously getting overwritten with the user configuration
 */
export const getlinkedEquationUnit = (
    equationUnitConfiguration,
    sheetEntity,
    attributeBases
) => {
    // component and sheet is necessary since they contain the information needed
    // to link the components to their associated values
    if (equationUnitConfiguration === undefined || sheetEntity === undefined) {
        return false;
    }

    // default defined information container
    const initialEquationUnit = (state) => {
        const initialLinkedUnit = new LinkedEquationUnit();
        let overwrites = {
            ...equationUnitConfiguration
            // config: {
            //     contextId: equationUnitConfiguration.config.contextId,
            //     equationUnitId:
            // },
            // type: equationUnitConfiguration.type
        };
        overwrites.config.equationUnitId = equationUnitConfiguration.id;

        return {
            linkedEquationUnit: {
                ...initialLinkedUnit,
                ...overwrites
            }
        };
    };

    // defining component / based on type

    // initial equation unit which is built when creating a new unit
    const onNone = (state) => {
        if (state.linkedEquationUnit.type != 'none') return true;

        throw {
            linkedEquationUnit: {
                ...state.linkedEquationUnit,
                linked: null,
                isNew: true
            }
        };
    };

    const onAttribute = (state) => {
        const { linkedEquationUnit } = state;
        if (linkedEquationUnit.type != 'attribute') return true;

        const attribute = findInArray(
            sheetEntity.attributes,
            linkedEquationUnit.config?.contextId,
            'baseId'
        );
        const base = findInArray(
            attributeBases,
            linkedEquationUnit.config?.contextId
        );

        if (base === undefined) {
            throw {
                linkedEquationUnit: {
                    ...linkedEquationUnit,
                    errors: linkedEquationUnit.isNew
                        ? ''
                        : 'Basisattribut nicht gefunden'
                }
            };
        }

        const linked = {
            ...base,
            ...attribute,
            isFallback: attribute === undefined
        };

        // the id is not necessary in this context because the attribute is associated by its baseId
        delete linked.id;

        const missingAttributeError = joinStrings([
            'Für das Attribute',
            [base?.name, base.name, '"Unbenannt"'],
            'wird die Basis verwendet.'
        ]);
        const errors = attribute == undefined ? missingAttributeError : null;

        throw {
            linkedEquationUnit: {
                ...state.linkedEquationUnit,
                linked,
                errors
            }
        };
    };

    const onSymbol = (state) => {
        console.log('implement component parsing for "symbol"');
        throw state;
    };

    const onConstant = (state) => {
        console.log('implement component parsing for "constant"');
        throw state;
    };

    const onEquation = (state) => {
        console.log('implement component parsing for "equation"');
        throw state;
    };

    // in here are only the values which are necessary to proceed without errors
    const initialState = {
        linkedEquationUnit: null
    };

    const result = processCallbacks(initialState, [
        initialEquationUnit,
        onNone,
        onAttribute,
        onSymbol,
        onConstant,
        onEquation
    ]);

    return result;
};

/**
 * differ
 */
export const getAttributesIntersection = (attrIdsA, attrIdsB) => {
    const [shortest, longest] =
        attrsIdsA.length < attrsIdsB.length
            ? [attrsIdsA, attrsIdsB]
            : [attrsIdsB, attrsIdsA];

    return Array.from(shortest).filter((id) => longest.find(id));
};
