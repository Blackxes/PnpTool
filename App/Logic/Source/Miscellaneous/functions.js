/**
 * @File functions which have no specific place or context in which they fit the most
 * 	since they use has more variety than being for example a createBigMonster function
 * 	which is specificly built for creating a monster
 *
 * @Author Alexander Bassov
 * @Email blackxes.dev@gmail.com
 */

/**
 * @Important requirements for these functions are that every entry in the state
 * must be an array and every entry inside the array (first level)
 * must be an object providing an unique id key which is used to identify the entry
 *
 * pattern = state = {
 * 		key: [
 * 			{
 * 				id: string | number
 * 			}
 * 		]
 * 	}
 */

/**
 * returns a new state object containing the new entry
 */
export const addToState = (state, key, entry, multiple = false) => ({
    ...state,
    [key]: [...state[key], ...(multiple ? [entry] : entry)]
});

/**
 * returns a new state object from which the entry
 * 	with given id (when found) is removed
 */
export const removeFromState = (state, key, id) => ({
    ...state,
    [key]: [...state[key].filter((item) => item.id != id)]
});

/**
 * returns a new state object in which the requested entry (when found)
 * 	has been update with the given one
 */
export const updateInState = (state, key, id, entry) => ({
    ...state,
    [key]: [...state[key].map((item) => (item.id == id ? entry : item))]
});

/**
 * returns the requested entry from the state when found else undefined
 */
export const findInState = (state, key, id) =>
    state[key].find((item) => item.id == id);
