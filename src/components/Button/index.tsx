import classNames from 'classnames';
import type { MouseEventHandler, PropsWithChildren } from 'react';

export type ButtonProps = {
  block?: boolean;
  htmlType?: 'button' | 'reset' | 'submit';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
};
export function Button(props: PropsWithChildren<ButtonProps>) {
  const { htmlType = 'button', block, children, size, onClick } = props;
  const rootClass = classNames('layui-btn', {
    'layui-btn-fluid': block,
    [`layui-btn-${size}`]: size && size !== 'md',
  });
  return (
    <button type={htmlType} className={rootClass} onClick={onClick}>
      {children}
    </button>
  );
}
