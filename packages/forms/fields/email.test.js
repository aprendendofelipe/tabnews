import { isValidEmail, suggestEmail } from '@tabnews/helpers';

import { email, emailConfirmation } from '.';
import { confirmEmail, createConfirmation, createSuggestionObject, format, validateEmail } from './email';

vi.mock('@tabnews/helpers', () => ({
  isValidEmail: vi.fn(),
  suggestEmail: vi.fn(),
}));

describe('forms', () => {
  describe('email field', () => {
    it('should have the correct shape', () => {
      expect(email).toStrictEqual({
        value: '',
        label: 'Seu Email',
        placeholder: 'Digite seu email',
        type: 'email',
        format: expect.any(Function),
        prepare: expect.any(Function),
        validateOnBlurAndSubmit: expect.any(Function),
        onValidChange: expect.any(Function),
      });

      expect(emailConfirmation).toStrictEqual({
        value: '',
        label: 'Confirme seu Email',
        placeholder: 'Digite novamente seu email',
        type: 'email',
        format: expect.any(Function),
        prepare: expect.any(Function),
        validateOnBlurAndSubmit: expect.any(Function),
        onValidChange: expect.any(Function),
      });
    });

    it('should format email correctly', () => {
      expect(format(' Test@Email.Com ')).toBe('test@email.com');
    });

    it('should validate email correctly', () => {
      isValidEmail.mockReturnValueOnce(true);
      expect(validateEmail('test@email.com')).toBeNull();

      isValidEmail.mockReturnValueOnce(false);
      expect(validateEmail('invalid-email')).toBe('Email inválido.');
    });

    it('should create suggestion object correctly', () => {
      suggestEmail.mockReturnValueOnce('suggestion@example.com');
      const updateFields = vi.fn();
      const suggestion = createSuggestionObject('test', updateFields, 'emailConfirmation');

      expect(suggestion).toStrictEqual({
        value: 'suggestion@example.com',
        pre: 'suggestion@',
        mid: 'example.com',
        onClick: expect.any(Function),
      });

      suggestion.onClick({ preventDefault: vi.fn() });
      expect(updateFields).toHaveBeenCalledWith({
        email: {
          value: 'suggestion@example.com',
          suggestion: null,
          error: null,
        },
        emailConfirmation: {
          validateOnBlurAndSubmit: expect.any(Function),
          error: null,
        },
      });
    });

    it('should create confirmation function correctly', () => {
      const validate = createConfirmation('expected@example.com');

      isValidEmail.mockReturnValueOnce(true);
      expect(validate('expected@example.com')).toBeNull();

      isValidEmail.mockReturnValueOnce(true);
      expect(validate('wrong@example.com')).toBe('Emails não conferem.');

      isValidEmail.mockReturnValueOnce(false);
      expect(validate('invalid-email')).toBe('Email inválido.');
    });

    it('should handle confirmEmail correctly', () => {
      const updateFields = vi.fn();
      const handler = confirmEmail('email', 'emailConfirmation');
      handler({ updateFields, value: 'test@example.com' });

      expect(updateFields).toHaveBeenCalledWith({
        email: { suggestion: null },
        emailConfirmation: { validateOnBlurAndSubmit: expect.any(Function), error: null },
      });
    });

    it('should handle confirmEmail correctly when confirmationField is email', () => {
      const updateFields = vi.fn();
      const handler = confirmEmail('emailConfirmation', 'email');
      handler({ updateFields, value: 'test@example.com' });

      expect(updateFields).toHaveBeenCalledWith({
        ['emailConfirmation']: { suggestion: null },
        email: { validateOnBlurAndSubmit: expect.any(Function), error: null },
      });
    });
  });
});
