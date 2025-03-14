export function isObjectsEqul(obj1, obj2) {
    // Check if the objects are of the same type
    if (typeof obj1 !== typeof obj2) {
        return false;
    }

    // Check if both objects are null or undefined
    if (obj1 === null && obj2 === null) {
        return true;
    }

    // Check if both objects are objects and not arrays
    if (typeof obj1 === 'object' && !Array.isArray(obj1) && typeof obj2 === 'object' && !Array.isArray(obj2)) {
        const keys1 = Object.keys(obj1);
        const keys2 = Object.keys(obj2);

        // Check if the number of keys is the same
        if (keys1.length !== keys2.length) {
            return false;
        }

        // Check if all keys and values are the same
        for (let key of keys1) {
            if (!isObjectsEqul(obj1[key], obj2[key])) {
                return false;
            }
        }

        // If all keys and values are the same
        return true;
    }

    // For primitive types and arrays, use strict equality
    return obj1 === obj2;
}

export let getKeyByCondition=(obj, conditionValue) =>{
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            if (obj[key] === conditionValue) {
                return key;
            }
        }
    }
    return null; 
}
