export const fullName = {
  value: '',
  label: 'Nome completo',
  placeholder: 'Informe seu nome completo',
  autoComplete: 'name',
  autoCapitalize: 'words',
  validateOnBlurAndSubmit: (name) => {
    const parts = name.trim().split(/\s+/);

    if (parts.length < 2 || parts.some((part) => part.length < 2)) {
      return 'Nome completo inválido.';
    }

    return null;
  },
};

export const username = {
  value: '',
  label: 'Nome de usuário',
  placeholder: 'n0mePubl1c0',
  autoComplete: 'username',
  autoCapitalize: 'none',
  format: (username) => username.replace(/[^a-z0-9]/gi, ''),
  validateOnBlurAndSubmit: (username) =>
    username.length < 3 || username.length > 30 ? 'Nome de usuário deve ter de 3 a 30 caracteres alfanuméricos.' : null,
};
