import { identity, noop, returnNull } from '@tabnews/helpers';
import { useConfig } from '@tabnews/hooks';
import { useCallback } from 'react';

const defaultProcessors = {
  format: identity,
  prepare: identity,
  onValidChange: noop,
  validateOnBlurAndSubmit: returnNull,
  validateOnChange: returnNull,
};

export function useForm(initialConfig, { submitDisabled = true, submitHidden = false } = {}) {
  const { processors, split, state, updateProcessors, updateState } = useConfig(initialConfig, defaultProcessors);

  const updateFields = useCallback(
    (newConfig) => {
      const { processors, state } = split(newConfig);
      updateState(state);
      updateProcessors(processors);
    },
    [split, updateProcessors, updateState],
  );

  const handleSubmit = useCallback(
    (onSubmit) => (e) => {
      e.preventDefault();
      const preparedFields = {};
      const errors = {};
      let hasErrors = false;

      for (const [fieldName, fieldState] of Object.entries(state)) {
        const { validateOnBlurAndSubmit, prepare } = processors[fieldName];

        if (!submitDisabled && fieldState.disabled === true) {
          continue;
        }

        if (!submitHidden && fieldState.hidden === true) {
          continue;
        }

        const preparedValue = fieldState.checked !== undefined ? fieldState.checked : prepare(fieldState.value);
        preparedFields[fieldName] = preparedValue;

        const error = validateOnBlurAndSubmit(preparedValue);
        if (error) {
          errors[fieldName] = { error };
          hasErrors = true;
        }
      }

      if (hasErrors) {
        updateState(errors);
      } else {
        onSubmit(preparedFields);
      }
    },
    [processors, state, submitDisabled, submitHidden, updateState],
  );

  const getFieldProps = useCallback(
    (name) => {
      const fieldState = state[name];
      const { format, prepare, onValidChange, validateOnBlurAndSubmit, validateOnChange } = processors[name];
      let onBlurError = null;

      return {
        name,
        ...fieldState,
        onChange: (e) => {
          const updatedState = { isValid: false };
          const value = format(e.target.value);
          const checked = e.target.checked;

          if (e.target.type === 'checkbox') {
            updatedState.checked = checked;
          } else {
            updatedState.value = value;
            updatedState.error = onBlurError || validateOnChange(value);
          }

          updateState({
            [name]: updatedState,
          });

          if (!updatedState.error) {
            onValidChange({ checked, state, updateFields, updateProcessors, updateState, value });
          }
        },
        onBlur: (e) => {
          const preparedValue = prepare(e.target.value);
          onBlurError = validateOnBlurAndSubmit(preparedValue);
          if (onBlurError) {
            updateState({ [name]: { error: onBlurError } });
          }
        },
      };
    },
    [processors, state, updateFields, updateProcessors, updateState],
  );

  return {
    getFieldProps,
    handleSubmit,
    state,
    updateFields,
    updateProcessors,
    updateState,
  };
}
