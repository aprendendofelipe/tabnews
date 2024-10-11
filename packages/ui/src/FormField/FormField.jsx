import { Checkbox, FormControl, Select, TextInput } from '@primer/react';

const defaultProps = {
  size: 'large',
  block: true,
  contrast: true,
};

const textInputProps = {
  ...defaultProps,
  autoCorrect: 'off',
  autoCapitalize: 'off',
  spellCheck: false,
  sx: { px: 2, '&:focus-within': { backgroundColor: 'canvas.default' } },
};

export function FormField({ caption, checked, error, label, name, options, required, sx, isValid, ...props }) {
  const validationStatus = error ? 'error' : isValid ? 'success' : null;

  return (
    <FormControl id={name} required={required} sx={{ minHeight: '86px', ...sx }}>
      {label && <FormControl.Label>{label}</FormControl.Label>}
      {caption && <FormControl.Caption>{caption}</FormControl.Caption>}
      {error && <FormControl.Validation variant="error">{error}</FormControl.Validation>}

      {!options && typeof checked === 'undefined' && (
        <TextInput validationStatus={validationStatus} {...textInputProps} {...props} />
      )}

      {options && (
        <Select validationStatus={validationStatus} {...defaultProps} {...props}>
          {options.map((option) => (
            <Select.Option key={option.value} {...option}>
              {option.label}
            </Select.Option>
          ))}
        </Select>
      )}

      {typeof checked !== 'undefined' && <Checkbox validationStatus={validationStatus} checked={checked} {...props} />}
    </FormControl>
  );
}
