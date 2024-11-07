import { useForm } from '@tabnews/forms';
import { Box, Button, Flash, FormField, Heading, Text } from '@tabnews/ui';
import { Link } from '@tabnews/ui/primer';

import { SubmittedFields } from './index.js';

export function Registration({ fields, store }) {
  const { state, getFieldProps, handleSubmit, updateState } = useForm(fields);

  function onSubmit(data) {
    updateState({ dialog: { value: data } });
  }

  return (
    <form style={{ display: 'flex', flexDirection: 'column', width: '100%' }} onSubmit={handleSubmit(onSubmit)}>
      <SubmittedFields state={state} updateState={updateState} />

      <Heading as="h1" sx={{ mb: 3 }}>
        Cadastro
      </Heading>

      <FormField {...getFieldProps('username')} />
      <FormField {...getFieldProps('emailConfirmable')} />
      <FormField {...getFieldProps('emailConfirmation')} />
      <FormField {...getFieldProps('passwordConfirmable')} />
      <FormField {...getFieldProps('passwordConfirmation')} />

      <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1, minWidth: '320px' }}>
          <FormField
            {...getFieldProps('termsAccepted')}
            label={
              <Text fontSize="1">
                Declaro que li e concordo com os{' '}
                <Link href={store.termsUrl} target="_blank">
                  Termos de Uso
                </Link>
                {';'}
              </Text>
            }
            sx={{ my: 2, minHeight: 'auto' }}
          />

          {state.dialog.value && (
            <Flash variant="warning">
              Não consegue se cadastrar? Envie um email para <Link href={`mailto:${store.email}`}>{store.email}</Link>
            </Flash>
          )}

          <Button type="submit" variant="primary" disabled={!state.termsAccepted.checked}>
            Criar Cadastro
          </Button>
        </Box>
      </Box>
    </form>
  );
}
