import { Box, Button, Checkbox, FormControl, Select, Text, TextInput } from '@primer/react';

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

export function FormField({
  caption,
  checked,
  error,
  isValid,
  label,
  name,
  options,
  required,
  suggestion,
  sx,
  ...props
}) {
  const validationStatus = error ? 'error' : isValid ? 'success' : null;

  return (
    <FormControl id={name} required={required} sx={{ minHeight: '86px', ...sx }}>
      {label && <FormControl.Label>{label}</FormControl.Label>}
      {caption && <FormControl.Caption>{caption}</FormControl.Caption>}
      {error && !suggestion?.value && <FormControl.Validation variant="error">{error}</FormControl.Validation>}
      <Suggestion suggestion={suggestion} />

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

export function Suggestion({ suggestion }) {
  if (!suggestion?.value) return null;

  return (
    <FormControl.Validation variant="error" sx={{ alignItems: 'center', color: 'attention.fg' }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Text>{suggestion.label || 'Você quis dizer:'}</Text>

        <Button
          variant="invisible"
          size="small"
          sx={{ height: 16, p: 1, color: 'success.fg' }}
          onClick={suggestion.onClick}>
          <Text>{suggestion.pre}</Text>
          <u>{suggestion.mid}</u>
          <Text>{suggestion.post}</Text>
        </Button>
      </Box>
    </FormControl.Validation>
  );
}
