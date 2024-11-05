import {
  card,
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
  ...card,
  payment: defaultPayment,
  installment: installmentField,
  termsAccepted: { checked: false },
  dialog: null,
};

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

      ...Object.keys(card).reduce((acc, key) => {
        acc[key] = {
          validateOnBlurAndSubmit: returnNull,
        };

        return acc;
      }, {}),
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

      ...Object.keys(card).reduce((acc, key) => {
        acc[key] = {
          validateOnBlurAndSubmit: card[key].validateOnBlurAndSubmit,
        };

        return acc;
      }, {}),
    });
  }
}
