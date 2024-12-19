import { validate as isCnpjValid } from 'validation-br/dist/cnpj';
import { validate as isCpfValid } from 'validation-br/dist/cpf';

export const brDocs = {
  value: '',
  label: 'CPF/CNPJ',
  placeholder: 'Informe seu CPF ou CNPJ',
  prepare: (document) => {
    if (isCpfValid(document)) {
      return {
        type: 'CPF',
        number: document.replace(/\D/g, '').padStart(11, '0'),
      };
    }

    if (isCnpjValid(document)) {
      return {
        type: 'CNPJ',
        number: document.replace(/[^a-zA-Z0-9]/g, '').padStart(14, '0'),
      };
    }

    return {
      type: 'PASSPORT',
      number: document,
    };
  },
  validateOnBlurAndSubmit: (doc) => {
    if (['CPF', 'CNPJ'].includes(doc.type)) {
      return null;
    }

    if (doc.number.length > 50) {
      return 'Passaporte deve ter no máximo 50 caracteres.';
    }

    if (!doc.number.length) {
      return 'Informe um documento válido.';
    }

    return null;
  },
};
