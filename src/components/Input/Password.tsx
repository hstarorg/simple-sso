import React from 'react';

export type PasswordProps = {
  prefix?: React.ReactNode;
  placeholder?: string;
  name?: string;
  value?: string;
  onChange?: (value: string) => void;
};

export function Password(props: PasswordProps) {
  const { value = '', onChange, prefix, placeholder, name } = props;

  const dynamicProps: Record<string, string> = {
    'lay-affix': 'eye',
  };

  return (
    <div className="layui-input-wrap">
      {prefix ? <div className="layui-input-prefix">{prefix}</div> : null}
      <input
        type="password"
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
