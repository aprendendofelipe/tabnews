import { noop } from 'packages/helpers';

import { format, getAddress, onValidChange, prepare, validateOnBlurAndSubmit } from './cep.js';
import { cep } from './index.js';

describe('forms', () => {
  describe('cep field', () => {
    let fetchSpy;

    beforeAll(() => {
      vi.spyOn(console, 'error').mockImplementation(noop);
      fetchSpy = vi.spyOn(global, 'fetch');
    });

    afterAll(() => {
      fetchSpy.mockRestore();
    });

    it('should have the correct shape', () => {
      expect(cep).toStrictEqual({
        label: 'CEP',
        value: '',
        maxLength: 10,
        placeholder: '00000-000',
        inputMode: 'numeric',
        autoComplete: 'postal-code',
        format,
        prepare,
        validateOnBlurAndSubmit,
        onValidChange,
      });
    });

    describe('validateOnBlurAndSubmit', () => {
      it('should return error message for incomplete CEP', () => {
        expect(validateOnBlurAndSubmit('12345')).toBe('CEP incompleto');
      });

      it('should return error message for invalid CEP', () => {
        expect(validateOnBlurAndSubmit('123456789')).toBe('CEP inválido');
      });

      it('should return error message for empty CEP', () => {
        expect(validateOnBlurAndSubmit('')).toBe('CEP inválido');
      });

      it('should return null for valid CEP length', () => {
        expect(validateOnBlurAndSubmit('12345678')).toBeNull();
      });
    });

    describe('onValidChange', () => {
      it('should not call updateState for incomplete CEP', async () => {
        const updateState = vi.fn();
        const address = await onValidChange({ value: '12345', updateState });
        expect(updateState).not.toHaveBeenCalled();
        expect(address).toBeUndefined();
      });

      it('should call updateState with loading true for valid CEP', async () => {
        const updateState = vi.fn();
        fetchSpy.mockResolvedValueOnce({
          ok: true,
          // eslint-disable-next-line require-await
          json: async () => ({
            cep: '12345678',
            state: 'SP',
            city: 'São Paulo',
            neighborhood: 'Centro',
            street: 'Rua A',
          }),
        });

        await onValidChange({ value: '12345-678', updateState });

        expect(updateState).toHaveBeenCalledWith({ cep: { loading: true } });
      });

      it('should call updateState with address data for valid CEP', async () => {
        const updateState = vi.fn();
        fetchSpy.mockResolvedValueOnce({
          ok: true,
          // eslint-disable-next-line require-await
          json: async () => ({
            cep: '12345678',
            state: 'SP',
            city: 'São Paulo',
            neighborhood: 'Centro',
            street: 'Rua A',
          }),
        });

        const expectedAddress = {
          cep: { value: '12345-678', loading: false, error: null, isValid: true },
          state: { value: 'SP', error: null, isValid: true },
          city: { value: 'São Paulo', error: null, isValid: true },
          neighborhood: { value: 'Centro', error: null, isValid: true },
          street: { value: 'Rua A', error: null, isValid: true },
        };

        const address = await onValidChange({ value: '12345-678', updateState });

        expect(updateState).toHaveBeenCalledWith(expectedAddress);
        expect(address).toStrictEqual(expectedAddress);
      });

      it('should call updateState without address data for inexistent CEP', async () => {
        const updateState = vi.fn();
        fetchSpy.mockResolvedValueOnce({
          ok: true,
          // eslint-disable-next-line require-await
          json: async () => ({}),
        });

        const expectedAddress = { cep: { value: '12345-678', loading: false } };

        const address = await onValidChange({ value: '12345-678', updateState });

        expect(updateState).toHaveBeenCalledWith(expectedAddress);
        expect(address).toStrictEqual(expectedAddress);
      });
    });

    describe('getAddress', () => {
      it('should return address data for valid CEP', async () => {
        fetchSpy.mockResolvedValueOnce({
          ok: true,
          // eslint-disable-next-line require-await
          json: async () => ({
            cep: '12345678',
            state: 'SP',
            city: 'São Paulo',
            neighborhood: 'Centro',
            street: 'Rua A',
          }),
        });

        const address = await getAddress('12345-678');

        expect(address).toStrictEqual({
          cep: '12345678',
          state: 'SP',
          city: 'São Paulo',
          neighborhood: 'Centro',
          street: 'Rua A',
        });
      });

      it('should return "undefined" for invalid CEP', async () => {
        fetchSpy.mockResolvedValueOnce({
          status: 404,
          ok: false,
        });

        expect(await getAddress('00000000')).toBeUndefined();
      });

      it('should return "undefined" for invalid response', async () => {
        fetchSpy.mockResolvedValueOnce({
          ok: false,
          status: 500,
        });

        expect(await getAddress('00000000')).toBeUndefined();
      });

      it('should return "undefined" for invalid CEP in response', async () => {
        fetchSpy.mockResolvedValueOnce({
          ok: true,
          // eslint-disable-next-line require-await
          json: async () => ({
            message: 'Cep não encontrado',
          }),
        });

        expect(await getAddress('00000000')).toBeUndefined();
      });
    });

    describe('format', () => {
      it('should format CEP correctly', () => {
        expect(format('12345678')).toBe('12345-678');
      });

      it('should handle incomplete CEP', () => {
        expect(format('12345')).toBe('12345');
        expect(format('12345-')).toBe('12345');
        expect(format('12345-6')).toBe('12345-6');
      });
    });

    describe('prepare', () => {
      it('should remove non-numeric characters', () => {
        expect(prepare('12345-678')).toBe('12345678');
      });

      it('should handle already cleaned CEP', () => {
        expect(prepare('12345678')).toBe('12345678');
      });
    });
  });
});
