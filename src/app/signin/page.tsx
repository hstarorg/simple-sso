'use client';
import { Button, CheckBox, Form, Input, LayIcon } from '@/components';
import styles from './page.module.css';
import Link from 'next/link';
import { redirect, useRouter } from 'next/navigation';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function SignIn() {
  const [form] = Form.useForm();
  const router = useRouter();

  const session = useSession();
  if (session?.status === 'authenticated') {
    router.replace('/');
    return;
  }

  console.log('session', session);

  function doSignin() {
    form
      .validateFields()
      .then(values => {
        // fetch('/apis/login', {
        //   method: 'POST',
        //   headers: { 'content-type': 'application/json' },
        //   body: JSON.stringify(values),
        // })
        //   .then(res => res.json())
        //   .then(data => {
        //     if (data.success) {
        //       router.push('/');
        //     }
        //   });

        signIn('credentials', {
          username: values.username,
          password: values.password,
          callbackUrl: '/',
        });
      })
      .catch(reason => {
        const message = reason.errorFields[0].errors[0];
        alert(message);
      });
  }

  function openLoginWindow(href: string) {
    const win = window.open(href, '', 'width=500,height=500,channelmode=yes');
    win!.onclose = function () {
      window.location.reload();
    };
  }

  return (
    <>
      <Form form={form}>
        <div className={styles.login_container}>
          <div className={styles.login_form_title}>HstarAuth 登录</div>
          <Form.Item
            name={'username'}
            rules={[{ required: true, message: '请输入用户名' }]}>
            <Input prefix={<LayIcon type="username" />} placeholder="用户名" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}>
            <Input.Password
              prefix={<LayIcon type="password" />}
              placeholder="密码"
            />
          </Form.Item>
          <Form.Item name={'rememberPwd'}>
            <CheckBox className={styles.lh38}>记住密码</CheckBox>
            {/* <a style={{ float: 'right', marginTop: 7 }}>忘记密码？</a> */}
          </Form.Item>
          <Form.Item>
            <Button block onClick={doSignin}>
              登录
            </Button>
          </Form.Item>

          <div className={styles.login_other + ' layui-form-item'}>
            <label>社交账号登录</label>
            <span style={{ padding: ' 0 21px 0 6px' }}>
              <a
                onClick={() => {
                  openLoginWindow('/auth/github');
                }}>
                &nbsp;&nbsp;
                <LayIcon type="github" color="#4daf29" />
              </a>
              <a
                onClick={() => {
                  openLoginWindow('/auth/qq');
                }}>
                &nbsp;&nbsp;
                <LayIcon type="login-qq" color="#3492ed" />
              </a>

              <a
                onClick={() => {
                  openLoginWindow('/auth/weibo');
                }}>
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
      </Form>
    </>
  );
}
