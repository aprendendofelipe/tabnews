import { isValidEmail, suggestEmail } from '@tabnews/helpers';

export const email = {
  value: '',
  label: 'Seu Email',
  placeholder: 'Digite seu email',
  type: 'email',
  format,
  prepare: format,
  validateOnBlurAndSubmit: validateEmail,
  onValidChange: confirmEmail('email', 'emailConfirmation'),
};

export const emailConfirmation = {
  value: '',
  label: 'Confirme seu Email',
  placeholder: 'Digite novamente seu email',
  type: 'email',
  format,
  prepare: format,
  validateOnBlurAndSubmit: validateEmail,
  onValidChange: confirmEmail('emailConfirmation', 'email'),
};

export function format(email) {
  return email.trim().toLowerCase();
}

export function validateEmail(email) {
  return isValidEmail(email) ? null : 'Email inválido.';
}

export function confirmEmail(field, confirmationField) {
  return ({ updateFields, value }) => {
    const suggestion = createSuggestionObject(value, updateFields, confirmationField);
    const validateOnBlurAndSubmit = createConfirmation(value);

    updateFields({
      [field]: { suggestion },
      [confirmationField]: { validateOnBlurAndSubmit, error: null },
    });
  };
}

export function createSuggestionObject(value, updateFields, confirmationField) {
  if (confirmationField === 'email') return null;

  const suggestion = suggestEmail(value);
  if (!suggestion) return null;

  const [username, domain] = suggestion.split('@');

  return {
    value: suggestion,
    pre: `${username}@`,
    mid: domain,
    onClick: (e) => {
      e.preventDefault();
      updateFields({
        email: {
          value: suggestion,
          suggestion: null,
          error: null,
        },
        [confirmationField]: {
          validateOnBlurAndSubmit: createConfirmation(suggestion),
          error: null,
        },
      });
    },
  };
}

export function createConfirmation(expectedValue) {
  return (inputValue) => {
    const validationError = validateEmail(inputValue);
    return validationError || (inputValue === expectedValue ? null : 'Emails não conferem.');
  };
}
