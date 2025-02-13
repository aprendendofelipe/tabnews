import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import { FormField, Suggestion } from './index.js';

describe('ui', () => {
  describe('FormField', () => {
    it('renders a TextInput when no options and checked are provided', () => {
      render(<FormField name="test-input" label="Test Label" />);
      expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('renders a Select when options are provided', () => {
      const options = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
      ];
      render(<FormField name="test-select" label="Test Label" options={options} />);
      const select = screen.getByRole('combobox');

      expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
      expect(select).toBeInTheDocument();
      expect(select).toHaveAttribute('id', 'test-select');

      expect(select).toHaveClass('fully-clickable');

      options.forEach((option) => {
        const optionElement = screen.getByText(option.label);
        expect(optionElement).toBeInTheDocument();
        expect(optionElement).toHaveAttribute('value', option.value);
      });
    });

    it('renders a Checkbox when checked is provided', () => {
      render(<FormField name="test-checkbox" label="Test Label" checked={true} />);
      const checkbox = screen.getByRole('checkbox');

      expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
      expect(checkbox).toBeInTheDocument();
      expect(checkbox).toBeChecked();
      expect(checkbox).toHaveAttribute('id', 'test-checkbox');
    });

    it('renders caption when provided', () => {
      render(<FormField name="test-caption" label="Test Caption Label" caption="Test Caption" />);
      expect(screen.getByLabelText('Test Caption Label')).toBeInTheDocument();
      expect(screen.getByText('Test Caption')).toBeInTheDocument();
    });

    it('renders error when provided', () => {
      render(<FormField name="test-error" label="Test Error Label" error="Test Error" />);
      expect(screen.getByLabelText('Test Error Label')).toBeInTheDocument();
      expect(screen.getByText('Test Error')).toBeInTheDocument();
    });

    it('renders nothing when hidden true is provided', () => {
      const { container } = render(<FormField name="test-hidden" label="Test Hidden Label" hidden />);
      expect(container).toBeEmptyDOMElement();
    });

    describe('PasswordInput', () => {
      const passwordTestProps = {
        name: 'test-password',
        label: 'Test Label',
        type: 'password',
      };

      it('renders a password input with the correct type', () => {
        render(<FormField {...passwordTestProps} />);
        const input = screen.getByLabelText('Test Label');
        expect(input).toHaveAttribute('type', 'password');
      });

      it('toggles password visibility when the visibility button is clicked', async () => {
        const user = userEvent.setup();
        render(<FormField {...passwordTestProps} label="Password" />);
        const button = screen.getByLabelText('Visualizar Password');
        const passwordInput = screen.getByLabelText('Password');
        expect(passwordInput.type).toBe('password');

        await user.type(passwordInput, 'password123');

        fireEvent.click(button);

        await waitFor(() => {
          expect(passwordInput).toHaveFocus();
        });

        expect(passwordInput.selectionStart).toBe(passwordInput.value.length);
        expect(passwordInput.selectionEnd).toBe(passwordInput.value.length);

        expect(passwordInput.type).toBe('text');

        fireEvent.click(button);

        await waitFor(() => {
          expect(passwordInput).toHaveFocus();
        });

        expect(passwordInput.type).toBe('password');
        expect(passwordInput.selectionStart).toBe(passwordInput.value.length);
        expect(passwordInput.selectionEnd).toBe(passwordInput.value.length);
      });

      it('displays a caps lock warning message when caps lock is on', async () => {
        const user = userEvent.setup();
        render(<FormField {...passwordTestProps} />);
        const passwordInput = screen.getByLabelText('Test Label');
        expect(screen.queryByText('Caps Lock está ativado.')).not.toBeInTheDocument();

        await user.type(passwordInput, '{capslock} now is on');
        expect(screen.queryByText('Caps Lock está ativado.')).toBeInTheDocument();
      });

      it('hides the caps lock warning message when caps lock is off', async () => {
        const user = userEvent.setup();
        render(<FormField {...passwordTestProps} />);
        const passwordInput = screen.getByLabelText('Test Label');

        await user.type(passwordInput, '{capslock} now is on');
        const capsLockMessage = screen.getByText('Caps Lock está ativado.');
        expect(capsLockMessage).toBeInTheDocument();

        await user.type(passwordInput, '{capslock} now is off');
        expect(capsLockMessage).not.toBeInTheDocument();
      });

      it('calls onKeyDown prop when a key is pressed', async () => {
        const user = userEvent.setup();
        const onKeyDown = vi.fn();
        render(<FormField {...passwordTestProps} onKeyDown={onKeyDown} />);
        const passwordInput = screen.getByLabelText('Test Label');

        user.type(passwordInput, 'a');

        await waitFor(() => {
          expect(onKeyDown).toHaveBeenCalled();
        });
      });

      it('calls onKeyUp prop when a key is pressed', async () => {
        const user = userEvent.setup();
        const onKeyUp = vi.fn();
        render(<FormField {...passwordTestProps} onKeyUp={onKeyUp} />);
        const passwordInput = screen.getByLabelText('Test Label');

        user.type(passwordInput, 'a');

        await waitFor(() => {
          expect(onKeyUp).toHaveBeenCalled();
        });
      });

      it('calls onBlur prop when the input loses focus', () => {
        const onBlur = vi.fn();
        render(<FormField {...passwordTestProps} onBlur={onBlur} />);
        const input = screen.getByLabelText('Test Label');
        fireEvent.blur(input);
        expect(onBlur).toHaveBeenCalled();
      });
    });

    describe('validationStatus', () => {
      describe('TextInput', () => {
        const errorStyle = '.ijuZEL';
        const successStyle = '.kLIpNb';

        it('should set validationStatus to "error" when error prop is provided', () => {
          render(<FormField name="test" error="This is an error" />);
          const validationMessage = screen.getByText('This is an error');
          const inputElement = screen.getByRole('textbox');

          expect(validationMessage).toBeInTheDocument();
          expect(inputElement).toHaveAttribute('aria-invalid', 'true');
          expect(inputElement.parentElement).toHaveAttribute('data-validation', 'error');
        });

        it('should set validationStatus to "success" when isValid prop is true and no error is provided', () => {
          render(<FormField name="test" isValid />);
          const inputElement = screen.getByRole('textbox');

          expect(inputElement).not.toHaveAttribute('aria-invalid', 'true');
          expect(inputElement.parentElement).toHaveAttribute('data-validation', 'success');
        });

        it('should not set validationStatus when neither error nor isValid props are provided', () => {
          const { container } = render(<FormField name="test" />);
          const inputElement = screen.getByRole('textbox');

          expect(container.querySelector(errorStyle)).not.toBeInTheDocument();
          expect(container.querySelector(successStyle)).not.toBeInTheDocument();
          expect(inputElement).not.toHaveAttribute('aria-invalid', 'true');
        });
      });

      describe('Select', () => {
        it('should set validationStatus to "error" when error prop is provided', () => {
          render([
            <FormField
              key="1"
              name="test"
              error="Because of the error, isValid is ignored"
              isValid={true}
              options={[{ value: '1', label: 'Option 1' }]}
            />,
            <FormField
              key="2"
              name="test"
              error="This is an error"
              isValid={false}
              options={[{ value: '1', label: 'Option 1' }]}
            />,
          ]);

          const selectElements = screen.getAllByRole('combobox');

          selectElements.forEach((selectElement) => {
            expect(selectElement).toHaveAttribute('aria-invalid', 'true');
            expect(selectElement.parentElement).toHaveAttribute('data-validation', 'error');
          });
        });

        it('should set validationStatus to "success" when isValid prop is true and no error is provided', () => {
          render(<FormField name="test" isValid options={[{ value: '1', label: 'Option 1' }]} />);
          const selectElement = screen.getByRole('combobox');

          expect(selectElement).toHaveAttribute('aria-invalid', 'false');
          expect(selectElement.parentElement).toHaveAttribute('data-validation', 'success');
        });

        it('should not set validationStatus when neither error nor isValid props are provided', () => {
          render(<FormField name="test" options={[{ value: '1', label: 'Option 1' }]} />);
          const selectElement = screen.getByRole('combobox');

          expect(selectElement).toHaveAttribute('aria-invalid', 'false');
          expect(selectElement.parentElement).not.toHaveAttribute('data-validation');
        });
      });

      describe('Checkbox', () => {
        it('should set "aria-invalid" to "true" when error prop is provided', () => {
          render(<FormField name="test" error="This is an error" checked />);
          const checkbox = screen.getByRole('checkbox');
          expect(checkbox).toHaveAttribute('aria-invalid', 'true');
        });

        it('should not set "aria-invalid" to "false" when error prop is not provided', () => {
          render(<FormField name="test" checked />);
          const checkbox = screen.getByRole('checkbox');
          expect(checkbox).toHaveAttribute('aria-invalid', 'false');
        });
      });

      describe('Suggestion', () => {
        it('renders nothing when suggestion is not provided', () => {
          const { container } = render(<Suggestion />);
          expect(container).toBeEmptyDOMElement();
        });

        it('renders nothing when suggestion value is not provided', () => {
          const { container } = render(<Suggestion suggestion={{}} />);
          expect(container).toBeEmptyDOMElement();
        });

        it('renders nothing when suggestion is null', () => {
          const { container } = render(<Suggestion suggestion={null} />);
          expect(container).toBeEmptyDOMElement();
        });

        it('renders suggestion with default texts', () => {
          render(<Suggestion suggestion={{ value: 'test', onClick: vi.fn(), ignoreClick: vi.fn() }} />);
          expect(screen.getByText('Você quis dizer')).toBeInTheDocument();
          expect(screen.getByText('?')).toBeInTheDocument();
          expect(screen.getByText('Aceitar sugestão')).toBeInTheDocument();
          expect(screen.getByText('Ignorar')).toBeInTheDocument();
          expect(screen.getByText('Ignorar sugestão')).toBeInTheDocument();
        });

        it('renders suggestion with custom label', () => {
          render(
            <Suggestion suggestion={{ value: 'test', label: 'Did you mean:', labelEnd: '?!?', onClick: vi.fn() }} />,
          );
          expect(screen.getByText('Did you mean:')).toBeInTheDocument();
          expect(screen.getByText('?!?')).toBeInTheDocument();
        });

        it('renders suggestion button with correct text', () => {
          render(<Suggestion suggestion={{ value: 'test', pre: 'pre', mid: 'mid', post: 'post', onClick: vi.fn() }} />);
          expect(screen.getByText('pre')).toBeInTheDocument();
          expect(screen.getByText('mid')).toBeInTheDocument();
          expect(screen.getByText('post')).toBeInTheDocument();
        });

        it('renders ignore button when ignore option is present', () => {
          const suggestion = {
            value: true,
            ignoreTooltip: 'Ignore suggestion',
            ignoreClick: vi.fn(),
            ignoreLabel: 'Ignore',
          };
          render(<Suggestion suggestion={suggestion} />);

          expect(screen.getByText('Ignore')).toBeInTheDocument();
          expect(screen.getByText('Ignore suggestion')).toBeInTheDocument();
        });

        it('renders suggestion with all options', () => {
          const suggestion = {
            value: 'test',
            label: 'Did you mean',
            pre: 'pre',
            mid: 'mid',
            post: 'post',
            labelEnd: '???',
            tooltip: 'Accept suggestion',
            onClick: vi.fn(),
            ignoreLabel: 'Ignore',
            ignoreTooltip: 'Ignore suggestion',
            ignoreClick: vi.fn(),
          };
          render(<Suggestion suggestion={suggestion} />);

          expect(screen.getByText('Did you mean')).toBeInTheDocument();
          expect(screen.getByText('pre')).toBeInTheDocument();
          expect(screen.getByText('mid')).toBeInTheDocument();
          expect(screen.getByText('post')).toBeInTheDocument();
          expect(screen.getByText('???')).toBeInTheDocument();
          expect(screen.getByText('Accept suggestion')).toBeInTheDocument();
          expect(screen.getByText('Ignore')).toBeInTheDocument();
          expect(screen.getByText('Ignore suggestion')).toBeInTheDocument();
        });

        it('calls onClick when suggestion button is clicked', () => {
          const handleClick = vi.fn();
          render(<Suggestion suggestion={{ value: 'test', onClick: handleClick }} />);
          fireEvent.click(screen.getByRole('button'));
          expect(handleClick).toHaveBeenCalledTimes(1);
        });

        it('calls ignoreClick when ignore button is clicked', () => {
          const ignoreClick = vi.fn();
          const suggestion = { value: true, ignoreClick };
          render(<Suggestion suggestion={suggestion} />);
          fireEvent.click(screen.getByText('Ignorar'));
          expect(ignoreClick).toHaveBeenCalled();
        });

        it('should not render error when suggestion is displayed', () => {
          render(<FormField name="test" error="This is an error" suggestion={{ value: 'test', onClick: vi.fn() }} />);
          expect(screen.queryByText('This is an error')).not.toBeInTheDocument();
        });

        it('should render without label', () => {
          render(<Suggestion suggestion={{ value: 'test', label: '', onClick: vi.fn() }} />);
          expect(screen.queryByText('Você quis dizer')).not.toBeInTheDocument();
        });

        it('should render without labelEnd', () => {
          render(<Suggestion suggestion={{ value: 'test', labelEnd: '', onClick: vi.fn() }} />);
          expect(screen.queryByText('?')).not.toBeInTheDocument();
        });
      });
    });
  });
});
