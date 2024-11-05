import {
  cep,
  city,
  complement,
  email,
  emailConfirmation,
  neighborhood,
  number,
  phone,
  state,
  street,
} from '@tabnews/forms';
import { returnNull } from '@tabnews/helpers';
import { validate as isCnpjValid } from 'validation-br/dist/cnpj';
import { validate as isCpfValid } from 'validation-br/dist/cpf';

export const product = {
  cta: 'Encontrou aquele Produto Top que você queria',
  name: 'Produto Top',
  description: 'SUPER OFERTA com 99% de desconto!',
  pixNotice: 'Após o pagamento, você receberá por email as informações de acesso à sua compra',
};

export const store = {
  name: 'Loja Top',
  termsUrl: '/',
  email: 'contato@example.com',
};

const installmentOptions = [
  { value: '1', label: '1 x de R$ 1.099,90', description: 'R$ 1.099,90' },
  { value: '2', label: '2 x de R$ 559,90*' },
  { value: '3', label: '3 x de R$ 379,90*' },
  { value: '6', label: '6 x de R$ 199,90*' },
  { value: '12', label: '12 x de R$ 109,90*', alternative: 'ou R$ 1.099,90 à vista' },
  { value: 'pix', label: 'R$ 1.099,90 via Pix', description: 'R$ 1.099,90' },
];

const defaultInstallmentAlternative = 'ou em 12 x de R$ 109,90* no cartão';
const defaultInstallment = installmentOptions.at(-2);
const defaultPayment = {
  method: 'credit_card',
  description: defaultInstallment.label,
  alternative: defaultInstallmentAlternative,
  ...defaultInstallment,
  update: updatePayment,
};

const fullNameField = {
  value: '',
  label: 'Nome completo',
  placeholder: 'Informe seu nome completo',
  validateOnBlurAndSubmit: (name) => {
    const parts = name.trim().split(/\s+/);

    if (parts.length < 2 || parts.some((part) => part.length < 2)) {
      return 'Nome completo inválido.';
    }

    return null;
  },
};

const documentField = {
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
      type: 'PASSAPORTE',
      number: document,
    };
  },
  validateOnBlurAndSubmit: (doc) => (['CPF', 'CNPJ'].includes(doc.type) ? null : 'Documento inválido.'),
};

const cardNumberField = {
  value: '',
  label: 'Número do cartão',
  placeholder: '0000 0000 0000 0000',
  format: (number) =>
    number
      .replace(/\D/g, '')
      .replace(/(\d{4})/g, '$1 ')
      .trim()
      .slice(0, 19),
  prepare: (number) => number.replace(/\D/g, ''),
  validateOnBlurAndSubmit: (number) => (/^\d{16}$/.test(number) ? null : 'Número do cartão inválido.'),
};

const holderNameField = {
  value: '',
  label: 'Nome do titular',
  placeholder: 'Informe o nome impresso no cartão',
  format: (name) => name.toUpperCase(),
  prepare: (name) => name.trim(),
  validateOnBlurAndSubmit: (name) => {
    if (!name) {
      return 'Nome do titular é obrigatório.';
    }

    if (name.length < 2 || name.length > 50) {
      return 'Nome do titular precisa ter entre 2 e 50 caracteres.';
    }

    return null;
  },
};

const monthField = {
  value: '',
  label: 'Mês',
  options: [
    { value: '', label: 'MM', disabled: true },
    { value: '01', label: '01' },
    { value: '02', label: '02' },
    { value: '03', label: '03' },
    { value: '04', label: '04' },
    { value: '05', label: '05' },
    { value: '06', label: '06' },
    { value: '07', label: '07' },
    { value: '08', label: '08' },
    { value: '09', label: '09' },
    { value: '10', label: '10' },
    { value: '11', label: '11' },
    { value: '12', label: '12' },
  ],
  validateOnBlurAndSubmit: (month) => (month === '' ? 'Selecione.' : null),
};

const yearField = {
  value: '',
  label: 'Ano',
  options: getYears(),
  validateOnBlurAndSubmit: (year) => (year === '' ? 'Selecione.' : null),
};

const cvvField = {
  value: '',
  label: 'CVV',
  placeholder: '000',
  format: (cvv) => cvv.replace(/\D/g, '').slice(0, 3),
  validateOnBlurAndSubmit: (cvv) => (/^\d{3}$/.test(cvv) ? null : 'CVV inválido.'),
};

const installmentField = {
  value: defaultPayment.value,
  label: 'Selecione o número de parcelas',
  options: installmentOptions,
  onValidChange: updatePayment,
};

export const fields = {
  fullName: fullNameField,
  email,
  emailConfirmation,
  document: documentField,
  phone,
  cep,
  state,
  city,
  street,
  number,
  complement,
  neighborhood,
  payment: defaultPayment,
  cardNumber: cardNumberField,
  holderName: holderNameField,
  month: monthField,
  year: yearField,
  cvv: cvvField,
  installment: installmentField,
  termsAccepted: { checked: false },
  dialog: null,
};

function getYears(numberOfYears = 35) {
  const currentYear = new Date().getFullYear() % 100;
  const years = Array.from({ length: numberOfYears }, (_, index) => {
    const year = (currentYear + index) % 100;
    const formattedYear = year.toString().padStart(2, '0');

    return {
      value: formattedYear,
      label: formattedYear,
    };
  });

  years.unshift({ value: '', label: 'AA', disabled: true });

  return years;
}

function updatePayment({ state, updateFields, value }) {
  const installment = state.installment.options.find((opt) => opt.value === value);

  if (value === 'pix') {
    updateFields({
      installment: {
        value: state.installment.value,
      },

      payment: {
        method: 'pix',
        description: installment.label,
        alternative: defaultInstallmentAlternative,
        ...installment,
      },

      cardNumber: {
        validateOnBlurAndSubmit: returnNull,
      },

      holderName: {
        validateOnBlurAndSubmit: returnNull,
      },

      month: {
        validateOnBlurAndSubmit: returnNull,
      },
      year: {
        validateOnBlurAndSubmit: returnNull,
      },
      cvv: {
        validateOnBlurAndSubmit: returnNull,
      },
    });
  }

  if (value !== 'pix') {
    updateFields({
      installment: {
        value: installment.value,
        description: installment.description || installment.label,
        alternative: installment.alternative || defaultInstallmentAlternative,
      },

      payment: {
        method: 'credit_card',
        description: installment.label,
        alternative: defaultInstallmentAlternative,
        ...installment,
      },

      cardNumber: {
        validateOnBlurAndSubmit: cardNumberField.validateOnBlurAndSubmit,
      },

      holderName: {
        validateOnBlurAndSubmit: holderNameField.validateOnBlurAndSubmit,
      },

      month: {
        validateOnBlurAndSubmit: monthField.validateOnBlurAndSubmit,
      },
      year: {
        validateOnBlurAndSubmit: yearField.validateOnBlurAndSubmit,
      },
      cvv: {
        validateOnBlurAndSubmit: cvvField.validateOnBlurAndSubmit,
      },
    });
  }
}
