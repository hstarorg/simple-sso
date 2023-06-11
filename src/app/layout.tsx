'use client';
import Script from 'next/script';
import './globals.css';
import { Inter } from 'next/font/google';
import styles from './layout.module.css';
import Link from 'next/link';
import classNames from 'classnames';
import { usePathname } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Hstar SSO',
  description: 'hstar 统一认证中心',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isManageApp = pathname.startsWith('/apps');
  return (
    <html>
      <head>
        <link rel="stylesheet" href="layui/css/layui.css" />
        <Script src="layui/layui.js" />
      </head>
      <body className={inter.className}>
        <div className="layui-layout layui-layout-admin">
          <div className="layui-header">
            <div className="layui-logo layui-hide-xs layui-bg-black">
              <Link href={'/'}>HSTAR SSO</Link>
            </div>
            <ul className="layui-nav layui-layout-right">
              <li
                className={classNames(
                  'layui-nav-item',
                  isManageApp ? 'layui-this' : '',
                )}>
                <Link href={'/apps'}>管理应用</Link>
              </li>
              <li className="layui-nav-item layui-hide layui-show-sm-inline-block">
                <a>
                  <img
                    src="https://unpkg.com/outeres@0.0.10/img/layui/icon-v2.png"
                    className="layui-nav-img"
                  />
                  tester
                </a>
                <dl className="layui-nav-child">
                  <dd>
                    <a>Your Profile</a>
                  </dd>
                  <dd>
                    <a>Settings</a>
                  </dd>
                  <dd>
                    <a>Sign out</a>
                  </dd>
                </dl>
              </li>
              {/* <li
            className="layui-nav-item"
            lay-header-event="menuRight"
            lay-unselect>
            <a href="javascript:;">
              <i className="layui-icon layui-icon-more-vertical"></i>
            </a>
          </li> */}
            </ul>
          </div>
        </div>
        <div className={styles.page_main}>{children}</div>
      </body>
    </html>
  );
}
