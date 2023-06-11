import { LayIcon } from '@/components';
import styles from './page.module.css';
import Link from 'next/link';
export default function SignUp() {
  return (
    <>
      <form className="layui-form">
        <div className={styles.login_container}>
          <div className={styles.login_form_title}>账户注册</div>
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
            <div className="layui-input-wrap">
              <div className="layui-input-prefix">
                <LayIcon type="password" />
              </div>
              <input
                type="password"
                name="password"
                lay-verify="required"
                placeholder="重复密码"
                lay-reqtext="请填写密码"
                autoComplete="off"
                className="layui-input"
                lay-affix="eye"
              />
            </div>
          </div>
          <div className="layui-form-item">
            <button
              className="layui-btn layui-btn-fluid"
              lay-submit
              lay-filter="demo-login">
              立即注册
            </button>
          </div>
          <div className={styles.login_other + ' layui-form-item'}>
            <label>已有账号</label>
            <span>
              <Link href="/signin">返回登录</Link>
            </span>
          </div>
        </div>
      </form>
    </>
  );
}
