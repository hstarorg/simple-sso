import type { NextPage } from "next";
import Link from "next/link";
import { Form, Input, Card, Button, Divider, Space } from "antd";
import Head from "next/head";
import styles from "./index.module.css";

const LoginPage: NextPage = () => {
  return (
    <div className={styles.signupPage}>
      <Head>
        <title>Hstar - 注册</title>
        <meta name="description" content="Hstar 统一登录中心" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.mainArea}>
        <h2 className={styles.appname}>Hstar 统一登录中心</h2>
        <Card
          className={styles.signupCard}
          title="注册"
          extra={
            <div>
              <Link href="/signin">登录</Link>
            </div>
          }
        >
          <Form layout="vertical">
            <Form.Item name="username" label="登录名">
              <Input placeholder="请输入登录名" />
            </Form.Item>
            <Form.Item name="email" label="邮箱地址">
              <Input.Password placeholder="请输入邮箱地址" />
            </Form.Item>
            <Form.Item name="password" label="密码">
              <Input.Password placeholder="请输入密码" />
            </Form.Item>
            <Form.Item name="password2" label="重复密码">
              <Input.Password placeholder="请再次输入密码" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" block>
                立即注册
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </main>
    </div>
  );
};

export default LoginPage;
