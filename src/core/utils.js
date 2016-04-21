/**
 *
 * @param object
 * @returns {boolean}
 */
function isPassed(object) {
    return object !== null && typeof object !== 'undefined';
}

/**
 *
 * @param object
 * @returns {boolean}
 */
function isNumber(object) {
    return typeof object === 'number'
        && object === object // NaN check
        && object > -Infinity
        && object < Infinity;
}

/**
 *
 * @param parameter
 * @param defaultValue
 * @returns {number}
 */
function asNumber(parameter, defaultValue) {
    return typeof parameter === 'number'
    && parameter === parameter // NaN check
    && parameter > -Infinity
    && parameter < Infinity

        ? parameter
        : defaultValue;

}

/**
 *
 * @param parameter
 * @param defaultValue
 * @returns {boolean}
 */
function asBoolean(parameter, defaultValue) {
    return typeof parameter === 'boolean' ? parameter : defaultValue;
}
