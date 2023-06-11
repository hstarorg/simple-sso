import { PropsWithChildren } from 'react';

export type ButtonProps = {};
export function Button(props: PropsWithChildren<ButtonProps>) {
  const { children } = props;
  return (
    <button type="button" className="layui-btn">
      {children}
    </button>
  );
}
