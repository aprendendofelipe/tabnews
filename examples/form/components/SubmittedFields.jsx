import { Dialog } from '@tabnews/ui';

export function SubmittedFields({ state, updateState }) {
  const value = state.dialog.value;

  if (!value) {
    return null;
  }

  delete value.dialog;

  return (
    <Dialog title="Dados Tratados" onClose={() => updateState({ dialog: { value: null } })}>
      <pre>{JSON.stringify(value, null, 2)}</pre>
    </Dialog>
  );
}
