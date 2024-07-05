import type { LabelHTMLAttributes } from 'react';
import cn from './cn';

type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  label: string;
  required?: boolean;
};

export default function Label(props: LabelProps) {
  const { label, required, className, children, ...rest } = props;

  return (
    <label className="form-control w-full" {...rest}>
      <div className="label">
        <span className={cn('label-text', required && 'required', className)}>{label}</span>
      </div>
      {children}
    </label>
  );
}
