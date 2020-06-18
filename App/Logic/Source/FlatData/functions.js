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
    EquationSymbol,
    Form,
    FormItem,
    FormItemValue,
    IgnoredAttribute,
    FormSheetOptions
} from './models';

/**
 * creation functions
 */
export const createAttributeBase = (name, defaultValue) =>
    new AttributeBase(name, defaultValue);
export const createAttributeSet = (name, description, attributes) =>
    new AttributeSet(name, description, attributes);
export const createCharacterSheetAttribute = (
    baseId,
    name,
    value,
    defaultValue
) => new CharacterSheetAttribute(baseId, name, value, defaultValue);
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
export const createAttributeSetFromSubmission = (values) => {
    return createAttributeSet(
        values.name,
        values.description,
        values.bases.split(',')
    );
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
export const createShallowAttributeBaseFromSubmission = (values) => {
    const base = createAttributeBaseFromSubmission(values);
    delete base.id;
    return base;
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
 * differ
 */
export const getAttributesIntersection = (attrIdsA, attrIdsB) => {
    const [shortest, longest] =
        attrsIdsA.length < attrsIdsB.length
            ? [attrsIdsA, attrsIdsB]
            : [attrsIdsB, attrsIdsA];

    return Array.from(shortest).filter((id) => longest.find(id));
};
