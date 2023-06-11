import type { NextPage } from "next";
import Link from "next/link";
import { Form, Input, Card, Button,  Steps } from "antd";
import Head from "next/head";
import styles from "./index.module.css";

const LoginPage: NextPage = () => {
  return (
    <div className={styles.signinPage}>
      <Head>
        <title>Hstar - 找回密码</title>
        <meta name="description" content="Hstar 统一登录中心" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.mainArea}>
        <h2 className={styles.appname}>Hstar 统一登录中心</h2>
        <Card
          className={styles.signinCard}
          title="找回密码"
          extra={
            <div>
              <Link href="/signin">返回登录</Link>
            </div>
          }
        >
          <Steps current={0}>
            <Steps.Step title="验证" />
            <Steps.Step title="重置密码" />
            <Steps.Step title="结果" />
          </Steps>
          ,
          <Form layout="vertical">
            <Form.Item name="username" label="账户">
              <Input placeholder="请输入登录名 / 邮箱" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" block>
                发送验证码
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </main>
    </div>
  );
};

export default LoginPage;
