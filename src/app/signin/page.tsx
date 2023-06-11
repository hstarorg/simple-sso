import { LayIcon } from '@/components';
import styles from './page.module.css';
import Link from 'next/link';
export default function SignIn() {
  return (
    <>
      <form className="layui-form">
        <div className={styles.login_container}>
          <div className={styles.login_form_title}>SSO 登录</div>
          <div className="layui-form-item">
            <div className="layui-input-wrap">
              <div className="layui-input-prefix">
                <LayIcon type="username" />
              </div>
              <input
                type="text"
                name="username"
                lay-verify="required"
                placeholder="用户名"
                lay-reqtext="请填写用户名"
                autoComplete="off"
                className="layui-input"
                lay-affix="clear"
              />
            </div>
          </div>
          <div className="layui-form-item">
            <div className="layui-input-wrap">
              <div className="layui-input-prefix">
                <LayIcon type="password" />
              </div>
              <input
                type="password"
                name="password"
                lay-verify="required"
                placeholder="密   码"
                lay-reqtext="请填写密码"
                autoComplete="off"
                className="layui-input"
                lay-affix="eye"
              />
            </div>
          </div>
          <div className="layui-form-item">
            <input
              type="checkbox"
              name="remember"
              lay-skin="primary"
              title="记住密码"
            />
            <a href="form.html#forget" style={{ float: 'right', marginTop: 7 }}>
              忘记密码？
            </a>
          </div>
          <div className="layui-form-item">
            <button
              className="layui-btn layui-btn-fluid"
              lay-submit
              lay-filter="demo-login">
              登录
            </button>
          </div>
          <div className={styles.login_other + ' layui-form-item'}>
            <label>社交账号登录</label>
            <span style={{ padding: ' 0 21px 0 6px' }}>
              <a>
                <LayIcon type="login-qq" color="#3492ed" />
              </a>
              <a>
                &nbsp;&nbsp;
                <LayIcon type="login-wechat" color="#4daf29" />
              </a>
              <a>
                &nbsp;&nbsp;
                <LayIcon type="login-weibo" color="#cf1900" />
              </a>
            </span>
            或{' '}
            <span>
              <Link href="/signup">注册帐号</Link>
            </span>
          </div>
        </div>
      </form>
    </>
  );
}
