import React from 'react';
import { Password } from './Password';

export type InputProps = {
  prefix?: React.ReactNode;
  placeholder?: string;
  allowClear?: boolean;
  name?: string;
  value?: string;
  onChange?: (value: string) => void;
};

export function Input(props: InputProps) {
  const { value = '', onChange, prefix, placeholder, name, allowClear } = props;

  const dynamicProps: Record<string, string> = {};
  if (allowClear) {
    dynamicProps['lay-affix'] = 'clear';
  }
  return (
    <div className="layui-input-wrap">
      {prefix ? <div className="layui-input-prefix">{prefix}</div> : null}
      <input
        type="text"
        placeholder={placeholder}
        autoComplete="off"
        value={value}
        onChange={e => onChange?.(e.target.value)}
        name={name}
        className="layui-input"
        {...dynamicProps}
      />
    </div>
  );
}

Input.Password = Password;
