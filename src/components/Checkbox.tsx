import type { InputHTMLAttributes } from 'react';
import cn from './cn';

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label?: string;
};

export default function Checkbox(props: CheckboxProps) {
  const { label, className, ...rest } = props;

  const input = <input type="checkbox" className={cn('checkbox', className)} {...rest} />;

  if (label) {
    return (
      <label className="label cursor-pointer justify-normal gap-2">
        {input}
        <span className="label-text">{label}</span>
      </label>
    );
  }

  return input;
}
