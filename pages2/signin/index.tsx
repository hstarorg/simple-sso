import { useCallback } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import router from 'next/router';
import Link from 'next/link';
import { Form, Input, Card, Button, Divider, Space } from 'antd';
import { authService } from '../../services';
import { GithubOutlined, WeiboOutlined, QqOutlined } from '@ant-design/icons';
import styles from './index.module.css';

const LoginPage: NextPage = () => {
  const [form] = Form.useForm();

  const handleLoginClick = useCallback(() => {
    form.validateFields().then(values => {
      console.log(values);
      authService.doLogin(values).then(() => {
        router.push('/signup');
      });
    });
  }, [form]);

  return (
    <div className={styles.signinPage}>
      <Head>
        <title>Hstar - 登录</title>
        <meta name="description" content="Hstar 统一登录中心" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.mainArea}>
        <h2 className={styles.appname}>Hstar 统一登录中心</h2>
        <Card
          className={styles.signinCard}
          title="登录"
          extra={
            <div>
              <Link href="/signup">注册</Link> <Divider type="vertical" />
              <Link href="/findpwd">忘记密码</Link>
            </div>
          }>
          <Form layout="vertical" form={form} requiredMark={false}>
            <Form.Item
              name="username"
              label="账户"
              rules={[{ required: true, message: '请输入登录名或者邮箱' }]}>
              <Input placeholder="请输入登录名 / 邮箱" />
            </Form.Item>
            <Form.Item
              name="password"
              label="密码"
              rules={[{ required: true, message: '请输入密码' }]}>
              <Input.Password placeholder="请输入密码" />
            </Form.Item>
            <Form.Item shouldUpdate>
              <Button type="primary" block onClick={handleLoginClick}>
                登录
              </Button>
            </Form.Item>
            <Divider plain>其他方式登录</Divider>
            <div className={styles.thirdLogin}>
              <Space>
                <Button icon={<GithubOutlined />} shape="circle" />
                <Button icon={<WeiboOutlined />} shape="circle" />
                <Button icon={<QqOutlined />} shape="circle" />
              </Space>
            </div>
          </Form>
        </Card>
      </main>
    </div>
  );
};

export default LoginPage;
