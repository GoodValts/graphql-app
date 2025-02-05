import { FieldError } from 'react-hook-form/dist/types';
import { FieldValues } from 'react-hook-form/dist/types/fields';
import { UseFormRegister } from 'react-hook-form/dist/types/form';
import { Path } from 'react-hook-form/dist/types/path';
import { useState } from 'react';
import visibleImg from './inputAssets/visible-icon.png';
import unVisibleImg from './inputAssets/unVisible-icon.png';
import defStyles from './input.module.scss';

export type InputProps<FormValues extends FieldValues> = {
  styles?: string;
  type?: string;
  accept?: string;
  label: string;
  name: keyof FormValues;
  register: UseFormRegister<FormValues>;
  required: boolean;
  errors: FieldError | undefined;
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
  const [isVisible, setIsVisible] = useState(false);

  let errorText = '';
  if (errors && errors.message) {
    errorText = errors.message;
  }

  const showHidePassword = (img: HTMLImageElement): void => {
    if (isVisible) {
      setIsVisible(false);
      img.src = unVisibleImg;
    } else {
      setIsVisible(true);
      img.src = visibleImg;
    }
  };

  return (
    <>
      <label htmlFor={name as string} className={defStyles.label}>
        {label}
      </label>
      <div className={defStyles.container}>
        <input
          id={name as string}
          accept={accept}
          type={isVisible ? 'text' : type}
          className={`${defStyles.input} ${styles}`}
          autoComplete={name as string}
          data-testid={name}
          {...register(name as Path<FormValues>, { required })}
        />
        {type === 'password' && (
          <div className={defStyles.imgContainer}>
            <button
              className={defStyles.imgButton}
              type="button"
              data-testid="see-btn"
              onClick={(e): void =>
                showHidePassword(e.target as HTMLImageElement)
              }
            >
              <img
                alt="show/hide"
                src={unVisibleImg}
                className={defStyles.img}
              />
            </button>
          </div>
        )}
      </div>
      <p className={defStyles.errorMessage}>{errorText}</p>
    </>
  );
};

Input.defaultProps = {
  type: 'text',
  value: '',
  accept: '',
  styles: '',
};

export default Input;
