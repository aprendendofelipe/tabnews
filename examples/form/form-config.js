import {
  brDocs,
  card,
  cep,
  city,
  complement,
  email,
  emailConfirmable,
  emailConfirmation,
  fullName,
  neighborhood,
  number,
  password,
  passwordConfirmable,
  passwordConfirmation,
  phone,
  state,
  street,
  username,
} from '@tabnews/forms';

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

const installmentField = {
  value: defaultPayment.value,
  label: 'Selecione o número de parcelas',
  options: installmentOptions,
  onValidChange: updatePayment,
};

export const checkoutFields = {
  fullName,
  emailConfirmable,
  emailConfirmation,
  document: brDocs,
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

function updatePayment({ state, updateState, value }) {
  const installment = state.installment.options.find((opt) => opt.value === value);

  if (value === 'pix') {
    updateState({
      installment: {
        value: state.installment.value,
      },

      payment: {
        method: 'pix',
        description: installment.label,
        alternative: defaultInstallmentAlternative,
        ...installment,
      },

      ...Object.fromEntries(Object.keys(card).map((key) => [key, { hidden: true }])),
    });
  }

  if (value !== 'pix') {
    updateState({
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

      ...Object.fromEntries(Object.keys(card).map((key) => [key, { hidden: false }])),
    });
  }
}

export const registrationFields = {
  username,
  emailConfirmable,
  emailConfirmation,
  passwordConfirmable,
  passwordConfirmation,
  termsAccepted: { checked: false },
  dialog: null,
};

export const loginFields = {
  email,
  password,
  dialog: null,
};
