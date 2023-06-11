import classNames from 'classnames';
import type { MouseEventHandler, PropsWithChildren } from 'react';

export type ButtonProps = {
  block?: boolean;
  htmlType?: 'button' | 'reset' | 'submit';
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
};
export function Button({
  htmlType = 'button',
  block,
  children,
  onClick,
}: PropsWithChildren<ButtonProps>) {
  const rootClass = classNames('layui-btn', { 'layui-btn-fluid': block });
  return (
    <button type={htmlType} className={rootClass} onClick={onClick}>
      {children}
    </button>
  );
}
