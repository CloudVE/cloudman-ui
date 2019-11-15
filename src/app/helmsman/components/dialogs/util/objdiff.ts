// based on: https://github.com/mattphillips/deep-object-diff/blob/master/src/diff/index.js
// differences from original:
// 1. This original returns `undefined` for all deleted values. Since undefined values are dropped
//    by Angular http, we return null instead.
// 2. Array changes result in the whole array being returned, instead of the changed element number.

export const isDate = d => d instanceof Date;
export const isEmpty = o => Object.keys(o).length === 0;
export const isObject = o => o != null && typeof o === 'object';
export const properObject = o => isObject(o) && !o.hasOwnProperty ? {...o} : o;


export const objDeepDiff = (lhs, rhs) => {
    if (lhs === rhs) return {}; // equal return no diff

    if (!isObject(lhs) || !isObject(rhs)) return rhs; // return updated rhs

    const l = properObject(lhs);
    const r = properObject(rhs);

    // special handling for arrays. if an array element
    // changes, the entire array is considered changed.
    if (Array.isArray(l) && Array.isArray(r)) {
        let diff = r.reduce((diff, item, index) => {
            const nested_diff = objDeepDiff(l[index], r[index])
            if (nested_diff && !isEmpty(nested_diff)) return r;
            else return diff;
        }, [])
        return diff;
    }

    const deletedValues = Object.keys(l).reduce((acc, key) => {
        return r.hasOwnProperty(key) ? acc : {...acc, [key]: null};
    }, {});

    if (isDate(l) || isDate(r)) {
        if (l.valueOf() == r.valueOf()) return {};
        return r;
    }

    return Object.keys(r).reduce((acc, key) => {
        if (!l.hasOwnProperty(key)) return {...acc, [key]: r[key]}; // return added r key

        const difference = objDeepDiff(l[key], r[key]);

        if (isObject(difference) && isEmpty(difference) && !isDate(difference)) return acc; // return no diff

        return {...acc, [key]: difference}; // return updated key
    }, deletedValues);
};
