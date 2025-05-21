import { replaceParams, tryParseUrl } from './index.js';

describe('helpers/url', () => {
  beforeAll(() => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  describe('Constants "baseUrl" and "webserverHostname"', () => {
    beforeEach(() => {
      vi.unstubAllEnvs();
      vi.resetModules();
    });

    afterAll(() => {
      vi.unstubAllEnvs();
      vi.resetModules();
    });

    describe('Local', () => {
      test('Dev', async () => {
        vi.stubEnv('NEXT_PUBLIC_WEBSERVER_HOST', 'next_public_webserver_host1');
        vi.stubEnv('NEXT_PUBLIC_WEBSERVER_PORT', '1');

        const { baseUrl, webserverHostname } = await import('./index.js');

        expect(baseUrl).toBe('http://next_public_webserver_host1:1');
        expect(webserverHostname).toBe('next_public_webserver_host1');
      });

      test('Build', async () => {
        vi.stubEnv('NEXT_PHASE', 'phase-production-build');
        vi.stubEnv('NEXT_PUBLIC_WEBSERVER_HOST', 'next_public_webserver_host2');
        vi.stubEnv('NEXT_PUBLIC_WEBSERVER_PORT', '2');

        const { baseUrl, webserverHostname } = await import('./index.js');

        expect(baseUrl).toBe('http://next_public_webserver_host2:2');
        expect(webserverHostname).toBe('next_public_webserver_host2');
      });

      test('Production', async () => {
        vi.stubEnv('NEXT_PUBLIC_WEBSERVER_HOST', 'next_public_webserver_host3');
        vi.stubEnv('NEXT_PUBLIC_WEBSERVER_PORT', '3');

        const { baseUrl, webserverHostname } = await import('./index.js');

        expect(baseUrl).toBe('http://next_public_webserver_host3:3');
        expect(webserverHostname).toBe('next_public_webserver_host3');
      });
    });

    describe('Vercel Node', () => {
      test.todo('Development');

      test('Build', async () => {
        vi.stubEnv('NEXT_PHASE', 'phase-production-build');
        vi.stubEnv('NEXT_PUBLIC_VERCEL_ENV', 'production');
        vi.stubEnv('NEXT_PUBLIC_VERCEL_URL', 'tabnews.vercel.app');
        vi.stubEnv('NEXT_PUBLIC_WEBSERVER_HOST', 'tabnews.com.br');
        vi.stubEnv('NEXT_PUBLIC_WEBSERVER_PORT', '3000');
        vi.stubEnv('VERCEL', '1');

        const { baseUrl, webserverHostname } = await import('./index.js');

        expect(baseUrl).toBe('https://tabnews.com.br');
        expect(webserverHostname).toBe('tabnews.com.br');
      });

      test('Production', async () => {
        vi.stubEnv('NEXT_PUBLIC_VERCEL_ENV', 'production');
        vi.stubEnv('NEXT_PUBLIC_VERCEL_URL', 'tabnews.vercel.app');
        vi.stubEnv('NEXT_PUBLIC_WEBSERVER_HOST', 'tabnews.com.br');
        vi.stubEnv('NEXT_PUBLIC_WEBSERVER_PORT', '3000');
        vi.stubEnv('VERCEL', '1');

        const { baseUrl, webserverHostname } = await import('./index.js');

        expect(baseUrl).toBe('https://tabnews.com.br');
        expect(webserverHostname).toBe('tabnews.com.br');
      });

      test('Production fallbacks to VERCEL_URL when NEXT_PUBLIC_WEBSERVER_HOST is undefined', async () => {
        vi.stubEnv('NEXT_PUBLIC_VERCEL_ENV', 'production');
        vi.stubEnv('NEXT_PUBLIC_VERCEL_URL', 'tabnews.vercel.app');
        vi.stubEnv('NEXT_PUBLIC_WEBSERVER_PORT', '3000');
        vi.stubEnv('VERCEL', '1');

        const { baseUrl, webserverHostname } = await import('./index.js');

        expect(baseUrl).toBe('https://tabnews.vercel.app');
        expect(webserverHostname).toBe('tabnews.vercel.app');
      });

      test('Preview', async () => {
        vi.stubEnv('NEXT_PUBLIC_VERCEL_ENV', 'preview');
        vi.stubEnv('NEXT_PUBLIC_VERCEL_URL', 'prev-tabnews.vercel.app');
        vi.stubEnv('NEXT_PUBLIC_WEBSERVER_HOST', 'localhost');
        vi.stubEnv('NEXT_PUBLIC_WEBSERVER_PORT', '3000');
        vi.stubEnv('VERCEL', '1');

        const { baseUrl, webserverHostname } = await import('./index.js');

        expect(baseUrl).toBe('https://prev-tabnews.vercel.app');
        expect(webserverHostname).toBe('prev-tabnews.vercel.app');
      });
    });

    describe('Vercel Edge', () => {
      beforeAll(() => {
        vi.stubGlobal('EdgeRuntime', true);
      });

      afterAll(() => {
        vi.unstubAllGlobals();
      });

      test('Production', async () => {
        vi.stubEnv('NEXT_PUBLIC_VERCEL_ENV', 'production');
        vi.stubEnv('NEXT_PUBLIC_VERCEL_URL', 'tabnews.vercel.app');
        vi.stubEnv('NEXT_PUBLIC_WEBSERVER_HOST', 'tabnews.com.br');
        vi.stubEnv('NEXT_PUBLIC_WEBSERVER_PORT', '3000');
        vi.stubEnv('VERCEL', '1');

        const { baseUrl, webserverHostname } = await import('./index.js');

        expect(baseUrl).toBe('https://tabnews.com.br');
        expect(webserverHostname).toBe('tabnews.com.br');
      });

      test('Preview', async () => {
        vi.stubEnv('NEXT_PUBLIC_VERCEL_ENV', 'preview');
        vi.stubEnv('NEXT_PUBLIC_VERCEL_URL', 'prev-tabnews.vercel.app');
        vi.stubEnv('NEXT_PUBLIC_WEBSERVER_HOST', 'localhost');
        vi.stubEnv('NEXT_PUBLIC_WEBSERVER_PORT', '3000');
        vi.stubEnv('VERCEL', '1');

        const { baseUrl, webserverHostname } = await import('./index.js');

        expect(baseUrl).toBe('https://prev-tabnews.vercel.app');
        expect(webserverHostname).toBe('prev-tabnews.vercel.app');
      });
    });
  });

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

  describe('tryParseUrl', () => {
    it('should return a URL object for a valid absolute URL string', () => {
      const result = tryParseUrl('https://example.com');
      expect(result).toBeInstanceOf(URL);
      expect(result.href).toBe('https://example.com/');
    });

    it('should return a URL object when passing a URL instance', () => {
      const input = new URL('https://example.com');
      const result = tryParseUrl(input);
      expect(result).toStrictEqual(input);
    });

    it('should return a URL object for a relative URL', () => {
      const result = tryParseUrl('/about');
      expect(result.href).toBe('http://localhost:3000/about');
    });

    it('should return an empty object for invalid URL', () => {
      const result = tryParseUrl('https://invalid[URL]');
      expect(result).toStrictEqual({});
      expect(console.warn).toHaveBeenCalledWith('[tryParseUrl] Invalid URL passed: "https://invalid[URL]"');
    });

    it('should use the label in the warning message', () => {
      const result = tryParseUrl('https://bad[url]', 'customLabel');
      expect(result).toStrictEqual({});
      expect(console.warn).toHaveBeenCalledWith('[customLabel] Invalid URL passed: "https://bad[url]"');
    });

    it('should return an empty object for null input', () => {
      const result = tryParseUrl(null);
      expect(result).toStrictEqual({});
    });

    it('should return an empty object for undefined input', () => {
      const result = tryParseUrl(undefined);
      expect(result).toStrictEqual({});
    });

    it('should return an empty object for empty string', () => {
      const result = tryParseUrl('');
      expect(result).toStrictEqual({});
    });
  });
});
