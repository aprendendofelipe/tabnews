import { fireEvent, render, screen } from '@testing-library/react';

import { FormField, Suggestion } from '.';

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

    describe('validationStatus', () => {
      describe('TextInput', () => {
        const errorStyle = '.dDNCxm';
        const successStyle = '.bUhYKy';

        it('should set validationStatus to "error" when error prop is provided', () => {
          const { container } = render(<FormField name="test" error="This is an error" />);
          const validationMessage = screen.getByText('This is an error');
          const inputElement = screen.getByRole('textbox');

          expect(container.querySelector(errorStyle)).toBeInTheDocument();
          expect(container.querySelector(successStyle)).not.toBeInTheDocument();
          expect(validationMessage).toBeInTheDocument();
          expect(inputElement).toHaveAttribute('aria-invalid', 'true');
        });

        it('should set validationStatus to "success" when isValid prop is true and no error is provided', () => {
          const { container } = render(<FormField name="test" isValid />);
          const inputElement = screen.getByRole('textbox');

          expect(container.querySelector(errorStyle)).not.toBeInTheDocument();
          expect(container.querySelector(successStyle)).toBeInTheDocument();
          expect(inputElement).not.toHaveAttribute('aria-invalid', 'true');
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
        const errorStyle = '.jQqnSj';
        const successStyle = '.htCKpT';

        it('should set validationStatus to "error" when error prop is provided', () => {
          const { container } = render([
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
          const validationMessage1 = screen.getByText('Because of the error, isValid is ignored');
          const validationMessage2 = screen.getByText('This is an error');

          expect(container.querySelector(errorStyle)).toBeInTheDocument();
          expect(container.querySelector(successStyle)).not.toBeInTheDocument();
          expect(validationMessage1).toBeInTheDocument();
          expect(validationMessage2).toBeInTheDocument();

          selectElements.forEach((selectElement) => {
            expect(selectElement).toHaveAttribute('aria-invalid', 'true');
          });
        });

        it('should set validationStatus to "success" when isValid prop is true and no error is provided', () => {
          const { container } = render(<FormField name="test" isValid options={[{ value: '1', label: 'Option 1' }]} />);
          const selectElement = screen.getByRole('combobox');

          expect(selectElement).toHaveAttribute('aria-invalid', 'false');
          expect(container.querySelector(errorStyle)).not.toBeInTheDocument();
          expect(container.querySelector(successStyle)).toBeInTheDocument();
        });

        it('should not set validationStatus when neither error nor isValid props are provided', () => {
          const { container } = render(<FormField name="test" options={[{ value: '1', label: 'Option 1' }]} />);
          expect(container.querySelector(errorStyle)).not.toBeInTheDocument();
          expect(container.querySelector(successStyle)).not.toBeInTheDocument();
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

        it('renders suggestion with default label', () => {
          render(<Suggestion suggestion={{ value: 'test', onClick: vi.fn() }} />);
          expect(screen.getByText('Você quis dizer:')).toBeInTheDocument();
        });

        it('renders suggestion with custom label', () => {
          render(<Suggestion suggestion={{ value: 'test', label: 'Did you mean:', onClick: vi.fn() }} />);
          expect(screen.getByText('Did you mean:')).toBeInTheDocument();
        });

        it('renders suggestion button with correct text', () => {
          render(<Suggestion suggestion={{ value: 'test', pre: 'pre', mid: 'mid', post: 'post', onClick: vi.fn() }} />);
          expect(screen.getByText('pre')).toBeInTheDocument();
          expect(screen.getByText('mid')).toBeInTheDocument();
          expect(screen.getByText('post')).toBeInTheDocument();
        });

        it('calls onClick when suggestion button is clicked', () => {
          const handleClick = vi.fn();
          render(<Suggestion suggestion={{ value: 'test', onClick: handleClick }} />);
          fireEvent.click(screen.getByRole('button'));
          expect(handleClick).toHaveBeenCalledTimes(1);
        });

        it('should not render error when suggestion is displayed', () => {
          render(<FormField name="test" error="This is an error" suggestion={{ value: 'test', onClick: vi.fn() }} />);
          expect(screen.queryByText('This is an error')).not.toBeInTheDocument();
        });
      });
    });
  });
});
