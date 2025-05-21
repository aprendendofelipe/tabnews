/**
 * Replaces or removes search parameters in the current URL using `history.replaceState`.
 *
 * - If `params` is `null`, all search parameters are removed.
 * - If `params` is an object:
 *   - Keys with `string` or `number` values are added or updated in the URL.
 *   - Keys with `null` or `undefined` values are removed from the URL.
 *   - Other value types (e.g., objects, arrays) are ignored and also removed.
 *
 * In non-production environments, passing a non-object and non-null value throws an error.
 *
 * @param {Record<string, string | number | null | undefined> | null} params
 *   An object mapping query parameter names to values:
 *   - `string` or `number` to set/update the parameter;
 *   - `null` or `undefined` to remove it;
 *   Or `null` to remove all parameters.
 *
 * @throws {Error} If `params` is not an object or `null` (outside production only).
 */
export function replaceParams(params) {
  if (typeof params !== 'object' && process.env.NODE_ENV !== 'production') {
    throw new Error(`[replaceParams] Expected "params" to be an object or null, but received: "${typeof params}"`);
  }

  try {
    const url = new URL(location.href);

    if (params === null) {
      url.search = '';
      history.replaceState(history.state, '', url.toString());
      return;
    }

    Object.keys(params).forEach((key) => {
      if (typeof params[key] !== 'string' && typeof params[key] !== 'number') {
        url.searchParams.delete(key);
        return;
      }

      url.searchParams.set(key, params[key].toString());
    });

    history.replaceState(history.state, '', url.toString());
  } catch {
    /* empty */
  }
}
