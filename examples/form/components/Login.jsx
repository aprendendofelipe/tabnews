import { useForm } from '@tabnews/forms';
import { Button, Flash, FormField, Heading } from '@tabnews/ui';
import { Link } from '@tabnews/ui/primer';

import { SubmittedFields } from './index.js';

export function Login({ fields, store }) {
  const { state, getFieldProps, handleSubmit, updateState } = useForm(fields);

  function onSubmit(data) {
    updateState({ dialog: { value: data } });
  }

  return (
    <form style={{ display: 'flex', flexDirection: 'column', width: '100%' }} onSubmit={handleSubmit(onSubmit)}>
      <SubmittedFields state={state} updateState={updateState} />

      <Heading as="h1" sx={{ mb: 3 }}>
        Login
      </Heading>

      <FormField {...getFieldProps('email')} />
      <FormField {...getFieldProps('password')} />

      {state.dialog.value && (
        <Flash variant="warning">
          Não consegue fazer login? Envie um email para <Link href={`mailto:${store.email}`}>{store.email}</Link>
        </Flash>
      )}

      <Button type="submit" variant="primary">
        Login
      </Button>
    </form>
  );
}
