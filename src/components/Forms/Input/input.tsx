import { FieldError } from 'react-hook-form/dist/types';
import { FieldValues } from 'react-hook-form/dist/types/fields';
import { UseFormRegister } from 'react-hook-form/dist/types/form';
import { Path } from 'react-hook-form/dist/types/path';
import { Dispatch, SetStateAction } from 'react';
import defStyles from './input.module.scss';

type InputProps<FormValues extends FieldValues> = {
  styles?: string;
  type?: string;
  accept?: string;
  label: string;
  name: keyof FormValues;
  register: UseFormRegister<FormValues>;
  required: boolean;
  errors: FieldError | undefined;
  setState?: Dispatch<SetStateAction<string>>;
};

const Input = <FormValues extends FieldValues>({
  accept,
  styles,
  type,
  label,
  name,
  register,
  required,
  errors,
}: InputProps<FormValues>): JSX.Element => {
  let errorText = '';
  if (errors && errors.message) {
    errorText = errors.message;
  }

  return (
    <>
      <label htmlFor={name as string} className={defStyles.label}>
        {label}
      </label>
      <input
        id={name as string}
        accept={accept}
        type={type}
        className={`${defStyles.input} ${styles}`}
        autoComplete={name as string}
        {...register(name as Path<FormValues>, { required })}
      />
      <p className={defStyles.errorMessage}>{errorText}</p>
    </>
  );
};

Input.defaultProps = {
  type: 'text',
  accept: '',
  styles: '',
  setState: (): void => {},
};

export default Input;
