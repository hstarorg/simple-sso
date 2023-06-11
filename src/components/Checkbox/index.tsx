'use client';
import classNames from 'classnames';
import { PropsWithChildren, useState } from 'react';

export type CheckBoxProps = {
  disabled?: boolean;
  name?: string;
  value?: boolean;
  onChange?: (value: boolean) => void;
  className?: string;
};

export function CheckBox(props: PropsWithChildren<CheckBoxProps>) {
  const { disabled, children, value = false, className, onChange } = props;

  return (
    <>
      <label
        className={classNames(
          'layui-unselect layui-form-checkbox',
          value ? 'layui-form-checked' : '',
          className,
        )}
        lay-skin="primary">
        <input
          type="checkbox"
          checked={value}
          onChange={e => {
            onChange?.(e.target.checked);
          }}
          disabled={disabled}
        />
        <div>{children}</div>
        <i className="layui-icon layui-icon-ok"></i>
      </label>
    </>
  );
}
