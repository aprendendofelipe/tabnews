import { useForm } from '@tabnews/forms';
import { Box, Button, Flash, FormField, Heading, TabNav, Text } from '@tabnews/ui';
import { Link } from '@tabnews/ui/primer';
import { FaCreditCard, FaPix } from 'react-icons/fa6';

import { SubmittedFields } from '.';

export function Checkout({ fields, product, store }) {
  const { state, getFieldProps, handleSubmit, updateState, updateFields } = useForm(fields);
  const { dialog, installment, payment, termsAccepted } = state;

  function setPaymentMethod(method) {
    payment.update({
      state: { installment },
      updateFields,
      value: method === 'pix' ? 'pix' : installment.value,
    });
  }

  function onSubmit(data) {
    updateState({ dialog: { value: data } });
  }

  return (
    <form style={{ display: 'flex', flexDirection: 'column', width: '100%' }} onSubmit={handleSubmit(onSubmit)}>
      <SubmittedFields state={state} updateState={updateState} />

      <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: 'center', mb: 4 }}>
        <Heading as="h1" sx={{ color: 'attention.fg' }}>
          {product.cta}
        </Heading>

        <Text sx={{ fontSize: 3, fontWeight: 'bold', color: 'accent.emphasis' }}>{payment.description}</Text>

        {payment.alternative && <Text sx={{ fontSize: 1, color: 'accent.fg' }}> {payment.alternative}</Text>}

        <Text>{product.description}</Text>
      </Box>

      <FormField {...getFieldProps('fullName')} />
      <ResponsiveFormRow>
        <FormField {...getFieldProps('email')} sx={{ flex: 1, minWidth: '240px' }} />
        <FormField {...getFieldProps('emailConfirmation')} sx={{ flex: 1, minWidth: '240px' }} />
      </ResponsiveFormRow>
      <ResponsiveFormRow>
        <FormField {...getFieldProps('document')} sx={{ flex: 1, minWidth: '220px' }} />
        <FormField {...getFieldProps('phone')} sx={{ flex: 1, minWidth: '180px' }} />
      </ResponsiveFormRow>
      <ResponsiveFormRow>
        <FormField {...getFieldProps('cep')} sx={{ flex: 1, minWidth: '160px' }} />
        <FormField {...getFieldProps('state')} sx={{ flex: 2, minWidth: '160px' }} />
        <FormField {...getFieldProps('city')} sx={{ flex: 2, minWidth: '300px' }} />
      </ResponsiveFormRow>
      <FormField {...getFieldProps('street')} />
      <ResponsiveFormRow>
        <FormField {...getFieldProps('number')} sx={{ flex: 1, minWidth: '80px' }} />
        <FormField {...getFieldProps('neighborhood')} sx={{ flex: 2, minWidth: '180px' }} />
        <FormField {...getFieldProps('complement')} sx={{ flex: 2, minWidth: '250px' }} />
      </ResponsiveFormRow>

      <TabNav aria-label="Métodos de Pagamento" sx={{ mt: 4, mb: 3 }}>
        <TabPanels onClick={() => setPaymentMethod('credit_card')} selected={payment.method === 'credit_card'}>
          <FaCreditCard /> Cartão de crédito
        </TabPanels>

        <TabPanels onClick={() => setPaymentMethod('pix')} selected={payment.method === 'pix'}>
          <FaPix /> pix
        </TabPanels>
      </TabNav>

      {payment.method === 'credit_card' && (
        <>
          <ResponsiveFormRow>
            <FormField {...getFieldProps('cardNumber')} sx={{ flex: 1, minWidth: '220px' }} />

            <FormField {...getFieldProps('holderName')} sx={{ flex: 2, minWidth: '220px' }} />
          </ResponsiveFormRow>

          <ResponsiveFormRow>
            <FormField {...getFieldProps('month')} sx={{ flex: 1, minWidth: '72px' }} />

            <FormField {...getFieldProps('year')} sx={{ flex: 1, minWidth: '72px' }} />

            <FormField {...getFieldProps('cvv')} sx={{ flex: 1, minWidth: '96px' }} />

            <FormField {...getFieldProps('installment')} sx={{ flex: 3, minWidth: '250px' }} />
          </ResponsiveFormRow>
        </>
      )}

      <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1, minWidth: '320px' }}>
          <FormField
            {...getFieldProps('termsAccepted')}
            label={
              <Text fontSize="1">
                Declaro que li e concordo (i) com os{' '}
                <Link href={store.termsUrl} target="_blank">
                  Termos de Uso
                </Link>
                {'; (ii) '}que o pagamento deste pedido seja processado em favor de {store.name}; (iii) que sou maior de
                idade ou autorizado e acompanhado por um responsável legal.
              </Text>
            }
            sx={{ my: 2, minHeight: 'auto' }}
          />

          {dialog.value && (
            <Flash variant="warning">
              Não consegue finalizar esta compra? Envie um email para{' '}
              <Link href={`mailto:${store.email}`}>{store.email}</Link>
            </Flash>
          )}

          {payment.method === 'credit_card' && (
            <Button type="submit" variant="primary" disabled={!termsAccepted.checked} sx={{ width: '100%' }}>
              Comprar agora
            </Button>
          )}

          {payment.method === 'pix' && (
            <>
              <Button type="submit" variant="primary" disabled={!termsAccepted.checked} sx={{ width: '100%' }}>
                Gerar código QR
              </Button>

              <Button
                type="submit"
                disabled={!termsAccepted.checked}
                sx={{ width: '100%', color: 'success.fg', borderColor: 'success.fg' }}>
                Copiar código Pix
              </Button>

              <Text sx={{ fontSize: 1 }}>{product.pixNotice}</Text>
            </>
          )}
        </Box>

        {payment.method === 'pix' && <QRCodePlaceholder />}
      </Box>

      <Box sx={{ my: 4 }}>
        <Heading as="h2" sx={{ fontSize: 4, pb: 2, mb: 1, borderBottom: '2px solid', borderColor: 'border.default' }}>
          Resumo da compra
        </Heading>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
          <Text>{product.name}</Text>
          <Text sx={{ fontWeight: 'bold' }}>{payment.description}</Text>
        </Box>

        {installment.value > 1 && payment.method !== 'pix' && (
          <Box sx={{ fontSize: 1, pt: 2, mt: 4, borderTop: '2px solid', borderColor: 'border.default' }}>
            *O valor parcelado possui acréscimo.
          </Box>
        )}
      </Box>
    </form>
  );
}

function ResponsiveFormRow({ children, sx, ...props }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        columnGap: 4,
        ...sx,
      }}
      {...props}>
      {children}
    </Box>
  );
}

function TabPanels({ onClick, sx, ...props }) {
  return (
    <TabNav.Link
      as="button"
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      sx={{
        display: 'flex',
        alignItems: 'center',
        mx: 1,
        textAlign: 'start',
        columnGap: 2,
        fontWeight: 'bold',
        fontSize: 2,
        cursor: 'pointer',
        ...sx,
      }}
      {...props}
    />
  );
}

const QRCodePlaceholder = () => (
  <Box sx={{ display: 'flex', flex: 1, minWidth: '320px', maxWidth: '480px', mx: 'auto', px: 5 }}>
    <svg viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg" fill="#9198a1">
      <rect width="100%" height="100%" fill="#f6f8fa" />

      <rect x="10" y="10" width="30" height="30" />
      <rect x="110" y="10" width="30" height="30" />
      <rect x="10" y="110" width="30" height="30" />

      <rect x="50" y="10" width="10" height="10" />
      <rect x="90" y="30" width="10" height="10" />
      <rect x="20" y="50" width="10" height="10" />
      <rect x="130" y="60" width="10" height="10" />
      <rect x="110" y="90" width="10" height="10" />
      <rect x="50" y="110" width="10" height="10" />
      <rect x="120" y="120" width="10" height="10" />

      <svg x="45" y="45" width="60" height="60" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M18.9999 4C20.6568 4 21.9999 5.34315 21.9999 7V17C21.9999 18.6569 20.6568 20 18.9999 20H4.99994C3.34308 20 1.99994 18.6569 1.99994 17V7C1.99994 5.34315 3.34308 4 4.99994 4H18.9999ZM19.9999 9.62479H13C12.4478 9.62479 11.8442 9.20507 11.652 8.68732L10.6542 6H4.99994C4.44765 6 3.99994 6.44772 3.99994 7V17C3.99994 17.5523 4.44765 18 4.99994 18H18.9999C19.5522 18 19.9999 17.5523 19.9999 17V9.62479Z"
        />
      </svg>
    </svg>
  </Box>
);
