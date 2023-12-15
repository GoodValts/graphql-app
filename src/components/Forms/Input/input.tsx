import { FieldError } from 'react-hook-form/dist/types';
import { FieldValues } from 'react-hook-form/dist/types/fields';
import { UseFormRegister } from 'react-hook-form/dist/types/form';
import { Path } from 'react-hook-form/dist/types/path';
import { Dispatch, SetStateAction, useRef, useState } from 'react';
import visibleImg from './inputAssets/visible-icon.png';
import unVisibleImg from './inputAssets/unVisible-icon.png';
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
  setState,
}: InputProps<FormValues>): JSX.Element => {
  let errorText = '';
  if (errors && errors.message) {
    errorText = errors.message;
  }

  const [isVisible, setIsVisible] = useState(false);
  const formInput = useRef<HTMLInputElement>(null);

  const showHidePassword = (img: HTMLImageElement): void => {
    console.log(img);
    console.log(img.src);
    console.log(isVisible);
    const input = formInput.current;
    if (isVisible) {
      setIsVisible(false);
      img.src = unVisibleImg;
      if (input) input.type = 'password';
    } else {
      setIsVisible(true);
      img.src = visibleImg;
      if (input) input.type = 'text';
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
          type={type}
          className={`${defStyles.input} ${styles}`}
          autoComplete={name as string}
          {...register(name as Path<FormValues>, { required })}
          onChange={(e): void => {
            if (setState) setState(e.target.value);
          }}
          ref={formInput}
        />
        {type === 'password' && (
          <div className={defStyles.imgCont}>
            <button
              className={defStyles.button}
              type="button"
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
  accept: '',
  styles: '',
  setState: (): void => {},
};

export default Input;
