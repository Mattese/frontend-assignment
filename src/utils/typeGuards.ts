export const isNotNullish = <T>(value: T | undefined | null): value is T =>
  value !== undefined && value !== null;
export const isNullish = <T>(value: T | undefined | null): value is null | undefined =>
  value === undefined || value === null;
export const isBlank = <T>(value: T | undefined | null): value is T =>
  value === undefined || value === null || value === '';
export const isObject = (value: unknown): value is object =>
  isNotNullish(value) && typeof value === 'object';
export const isBoolean = (value: unknown): value is boolean => typeof value === 'boolean';
export const isFunction = (value: unknown): value is (...args: any[]) => any =>
  typeof value === 'function';
export const isString = (value: unknown): value is string => typeof value === 'string';
export const isNumber = (value: unknown): value is number => typeof value === 'number';
export const isEmptyString = (value: unknown): value is string => value === '';
export const isDate = (value: unknown): value is Date => value instanceof Date;
export const isNonEmptyUrlParam = (
  routeParam: string | string[] | undefined
): routeParam is string =>
  typeof routeParam === 'string' &&
  routeParam !== 'undefined' &&
  isNotNullish(routeParam) &&
  routeParam !== '';

/**
 * Type guard for narrowing down union types containing arrays. Checks only if value is array, does not
 * check items inside array. This function use {@link Array.isArray} but is typed to preserve item type
 * through generics instead of using any.
 *
 * @param value Value to check.
 * @see createIsArrayOf
 * @example
 * type Union = undefined | null | number  | string | string[] | readonly number[];
 *
 * const fn = (value: Union) => {
 *     if(Array.isArray(value)){
 *         console.log(value); // value is string[]
 *     }else {
 *         console.log(value); // value is string | number | readonly number[] | null | undefined
 *     }
 *
 *     if(isArray(value)){
 *         console.log(value); // value is string[] | readonly number[]
 *     } else {
 *         console.log(value); // value is string | number | null | undefined
 *     }
 * }
 */
export const isArray = <T>(value: unknown | T | T[] | readonly T[]): value is T[] | readonly T[] =>
  Array.isArray(value);

// Number doesn't convert some types correctly to number, so we have to use parseFloat
// parseFloat works correctly for all types (null, undefined, array) but in typescript accept only string
export const getUrlParamInteger = (value: string | string[] | undefined): number | undefined => {
  // if the values in inside array, we can parse it too
  // as parseFloat will parse the first element in array
  if (value === undefined) {
    return value;
  }
  const parsedValue = parseFloat(value as string);
  if (!Number.isNaN(parsedValue)) {
    return parsedValue;
  }
  throw new TypeError(`${value} is not a number or undefined`);
};

export const parseInteger = (value: string | string[] | undefined): number => {
  // if the values in inside array, we can parse it too
  // as parseFloat will parse the first element in array
  const parsedValue = parseFloat(value as string);
  if (!Number.isNaN(parsedValue) || value !== undefined) {
    return parsedValue;
  }
  throw new TypeError(`${value} is not a number`);
};

/**
 * Type guard that checks that object has property.
 * @param object Object to check.
 * @param prop Prop name to check. Can be any property key type (string, number, symbol).
 * @see https://wiki.morosystems.cz/pages/viewpage.action?pageId=205294005
 */
export const hasProp = <K extends PropertyKey>(
  object: object,
  prop: K
): object is Record<K, unknown> => prop in object;

/**
 * Type guard that checks that object has property and its value is of type specified by typeGuard param.
 * @param object Object to check.
 * @param prop Prop name to check. Can be any property key type (string, number, symbol).
 * @param typeGuard Type guard function to check type of prop value.
 * @see https://wiki.morosystems.cz/pages/viewpage.action?pageId=205294005
 */
export const hasPropOfType = <K extends PropertyKey, PT>(
  object: object,
  prop: K,
  typeGuard: (propValue: unknown) => propValue is PT
): object is Record<K, PT> => hasProp(object, prop) && typeGuard(object[prop]);

/**
 * Creates type guard function for checking arrays, including type of their items.
 * Returns false for non array values. Always returns true for empty array.
 * @param itemTypeGuard Type guard function which checks type of items in array.
 * @see https://wiki.morosystems.cz/pages/viewpage.action?pageId=205294005
 */
export const createIsArrayOf =
  <I>(itemTypeGuard: (item: unknown) => item is I) =>
  (value: unknown): value is readonly I[] =>
    Array.isArray(value) && value.every((item) => itemTypeGuard(item));

/**
 * Checks if maybeKey is key of specified object. Works as type guard for indexing.
 * Works only for string keys, numeric keys are not supported.
 * @param object Inspected object.
 * @param maybeKey Value which may be key of object.
 */
export const isObjectKey = <T>(object: T, maybeKey: unknown): maybeKey is keyof T =>
  !!maybeKey && isString(maybeKey) && isObject(object) && Object.keys(object).includes(maybeKey);

export const isNonEmptyArray = <T>(value: unknown): value is Array<T> =>
  isNotNullish(value) && isArray<T>(value) && value.length > 0;

export const isEmptyArray = <T>(value: unknown): value is Array<T> =>
  isNotNullish(value) && isArray<T>(value) && value.length === 0;

export const isEmptyObject = (value: unknown): value is object =>
  isNotNullish(value) && isObject(value) && Object.keys(value).length === 0;

export const isNonEmptyObject = (value: unknown): value is object =>
  isObject(value) && Object.keys(value).length > 0;
