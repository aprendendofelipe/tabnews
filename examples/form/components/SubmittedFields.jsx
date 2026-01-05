import { Dialog } from '@barso/ui';

export function SubmittedFields({ state, updateState }) {
  const value = state.dialog.value;

  if (!value) {
    return null;
  }

  return (
    <Dialog title="Dados Tratados" onClose={() => updateState({ dialog: { value: null } })}>
      <pre>{JSON.stringify({ ...value, dialog: undefined }, null, 2)}</pre>
    </Dialog>
  );
}
