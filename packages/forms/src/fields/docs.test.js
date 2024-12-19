import { brDocs } from './docs.js';

describe('forms', () => {
  describe('brDocs', () => {
    it('should have the correct shape', () => {
      expect(brDocs).toStrictEqual({
        value: '',
        label: 'CPF/CNPJ',
        placeholder: 'Informe seu CPF ou CNPJ',
        prepare: expect.any(Function),
        validateOnBlurAndSubmit: expect.any(Function),
      });
    });

    describe('prepare', () => {
      it('should prepare a valid CPF', () => {
        const cpf = '123.456.789-09';
        const result = brDocs.prepare(cpf);
        expect(result).toStrictEqual({
          type: 'CPF',
          number: '12345678909',
        });
      });

      it('should prepare a valid CNPJ', () => {
        const cnpj = '12.345.678/0001-95';
        const result = brDocs.prepare(cnpj);
        expect(result).toStrictEqual({
          type: 'CNPJ',
          number: '12345678000195',
        });
      });

      it('should prepare an invalid document as PASSPORT', () => {
        const passport = 'A1234567';
        const result = brDocs.prepare(passport);
        expect(result).toStrictEqual({
          type: 'PASSPORT',
          number: passport,
        });
      });
    });

    describe('validateOnBlurAndSubmit', () => {
      it('should return null for valid CPF', () => {
        const doc = { type: 'CPF', number: '12345678909' };
        const result = brDocs.validateOnBlurAndSubmit(doc);
        expect(result).toBeNull();
      });

      it('should return null for valid CNPJ', () => {
        const doc = { type: 'CNPJ', number: '12345678000195' };
        const result = brDocs.validateOnBlurAndSubmit(doc);
        expect(result).toBeNull();
      });

      it('should return null for valid PASSPORT', () => {
        const doc = { type: 'PASSPORT', number: 'A1234567' };
        const result = brDocs.validateOnBlurAndSubmit(doc);
        expect(result).toBeNull();
      });

      it('should return error message for long document number', () => {
        const doc = { type: 'PASSPORT', number: 'A' + '1234567890'.repeat(5) };
        const result = brDocs.validateOnBlurAndSubmit(doc);
        expect(result).toBe('Passaporte deve ter no máximo 50 caracteres.');
      });

      it('should return error message for empty document number', () => {
        const doc = { type: 'PASSPORT', number: '' };
        const result = brDocs.validateOnBlurAndSubmit(doc);
        expect(result).toBe('Informe um documento válido.');
      });
    });
  });
});
