import { replaceParams } from './index.js';

describe('helpers/url', () => {
  describe('replaceParams', () => {
    const testUrl = 'https://test.com/path?param1=value1&param2=value2&param3=value3';

    beforeEach(() => {
      vi.stubGlobal('location', {
        href: testUrl,
      });

      vi.stubGlobal('history', {
        state: {},
        replaceState: vi.fn(),
      });
    });

    afterEach(() => {
      vi.unstubAllGlobals();
      vi.unstubAllEnvs();
    });

    it('should replace params in the URL with the provided values', () => {
      replaceParams({
        param2: 'newValue2',
      });

      expect(history.replaceState).toHaveBeenCalledWith(
        history.state,
        '',
        'https://test.com/path?param1=value1&param2=newValue2&param3=value3',
      );
    });

    it('should remove params from the URL if the value is not a string or number', () => {
      replaceParams({
        param1: null,
        param2: undefined,
      });
      replaceParams({
        param1: {},
        param3: [],
      });

      expect(history.replaceState).toHaveBeenCalledWith(history.state, '', 'https://test.com/path?param3=value3');
      expect(history.replaceState).toHaveBeenCalledWith(history.state, '', 'https://test.com/path?param2=value2');
    });

    it('should not remove params from the URL if the value is an empty string', () => {
      replaceParams({
        param2: '',
      });

      expect(history.replaceState).toHaveBeenCalledWith(
        history.state,
        '',
        'https://test.com/path?param1=value1&param2=&param3=value3',
      );
    });

    it('should add the parameter if it does not exist', () => {
      replaceParams({
        param4: 'value4',
      });

      expect(history.replaceState).toHaveBeenCalledWith(
        history.state,
        '',
        'https://test.com/path?param1=value1&param2=value2&param3=value3&param4=value4',
      );
    });

    it('should remove all params if null is provided', () => {
      replaceParams(null);

      expect(history.replaceState).toHaveBeenCalledWith(history.state, '', 'https://test.com/path');
    });

    it('should not modify the URL if a non-existent parameter is requested for removal', () => {
      replaceParams({
        nonExistentParam1: null,
        nonExistentParam2: undefined,
        nonExistentParam3: {},
        nonExistentParam4: [],
      });

      expect(history.replaceState).toHaveBeenCalledWith(history.state, '', testUrl);
    });

    it('should not modify the URL if no params are provided', () => {
      replaceParams({});

      expect(history.replaceState).toHaveBeenCalledWith(history.state, '', testUrl);
    });

    it('should not modify the URL if no object are provided', () => {
      expect(() => replaceParams()).toThrowError(
        '[replaceParams] Expected "params" to be an object or null, but received: "undefined"',
      );
      expect(history.replaceState).not.toHaveBeenCalled();

      vi.stubEnv('NODE_ENV', 'production');

      expect(() => replaceParams()).not.toThrowError();
      expect(history.replaceState).not.toHaveBeenCalled();
    });

    it('should not throw an error if the URL is invalid', () => {
      vi.stubGlobal('location', {
        href: 'invalid.url',
      });

      expect(() => replaceParams({ param1: 'newValue1' })).not.toThrowError();
      expect(history.replaceState).not.toHaveBeenCalled();
    });

    it('should not throw an error if "href" is not defined', () => {
      vi.stubGlobal('location', {});

      expect(() => replaceParams({ param1: 'newValue1' })).not.toThrowError();
      expect(history.replaceState).not.toHaveBeenCalled();
    });

    it('should not throw an error if "location" is not defined', () => {
      vi.stubGlobal('location', undefined);

      expect(() => replaceParams({ param1: 'newValue1' })).not.toThrowError();
      expect(history.replaceState).not.toHaveBeenCalled();
    });

    it('should not throw an error if "history" is not defined', () => {
      vi.stubGlobal('history', undefined);

      expect(() => replaceParams({ param1: 'newValue1' })).not.toThrowError();
    });
  });
});
