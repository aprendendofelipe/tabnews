import { AlertFillIcon } from '@primer/octicons-react';

import { Button, Checkbox, FormControl, Select, Text, TextInput, Tooltip } from '..';

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
    <Text
      sx={{
        display: 'inline-flex',
        flexWrap: 'wrap',
        wordBreak: 'break-word',
        fontSize: '12px',
        lineHeight: '14px',
        fontWeight: 'bold',
        columnGap: 1,
        mt: 0,
        alignItems: 'center',
        color: 'attention.fg',
      }}>
      <AlertFillIcon size={12} />
      <Text>{suggestion.label ?? 'Você quis dizer'}</Text>

      <TooltippedButton
        tooltip={suggestion.tooltip || 'Aceitar sugestão'}
        onClick={suggestion.onClick}
        color="success.fg">
        <Text>{suggestion.pre}</Text>
        <Text sx={{ textDecoration: 'underline' }}>{suggestion.mid}</Text>
        <Text>{suggestion.post}</Text>
      </TooltippedButton>

      <Text>{suggestion.labelEnd ?? '?'}</Text>

      {suggestion.ignoreClick && (
        <TooltippedButton
          tooltip={suggestion.ignoreTooltip || 'Ignorar sugestão'}
          onClick={suggestion.ignoreClick}
          sx={{ flex: 1 }}>
          {suggestion.ignoreLabel || 'Ignorar'}
        </TooltippedButton>
      )}
    </Text>
  );
}

function TooltippedButton({ children, color, direction = 'nw', sx, tooltip, ...props }) {
  return (
    <Tooltip text={tooltip} direction={direction}>
      <Button
        variant="invisible"
        size="small"
        labelWrap={true}
        sx={{
          color,
          my: '-4px',
          px: 0,
          textAlign: 'start',
          '> *': { justifyContent: 'end' },
          ':hover': {
            bg: 'transparent',
          },
          ...sx,
        }}
        {...props}>
        {children}
      </Button>
    </Tooltip>
  );
}
