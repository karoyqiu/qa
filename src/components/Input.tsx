import { capitalize } from 'radash';
import { forwardRef, type InputHTMLAttributes } from 'react';
import cn from './cn';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(props, ref) {
  const { label, className, ...rest } = props;
  const l = label ?? (rest.name && capitalize(rest.name));

  return (
    <label className="form-control w-full">
      {l && (
        <div className="label">
          <span className={cn('label-text', rest.required && 'required')}>{l}</span>
        </div>
      )}
      <input className={cn('input input-bordered w-full', className)} {...rest} ref={ref} />
    </label>
  );
});

export default Input;
