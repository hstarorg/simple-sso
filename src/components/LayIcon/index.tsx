import classnames from 'classnames';

export type LayIconProps = {
  type: 'login-qq' | 'login-wechat' | 'login-weibo' | 'username' | 'password' ;
  color?: string;
};

export function LayIcon(props: LayIconProps) {
  const { type, color } = props;
  const style = { color };
  const rootClass = classnames('layui-icon', `layui-icon-${type}`);
  return <i className={rootClass} style={style}></i>;
}
