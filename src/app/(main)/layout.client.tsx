'use client';
import Link from 'next/link';
import classNames from 'classnames';
import { usePathname } from 'next/navigation';
import styles from './layout.module.css';
import { PropsWithChildren } from 'react';

export function MainLayoutClient(props: PropsWithChildren<{}>) {
  const pathname = usePathname();
  const isManageApp = (pathname || '').startsWith('/apps');

  return (
    <>
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
                <img className="layui-nav-img" />
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
          </ul>
        </div>
      </div>
      <div className={styles.page_main}>{props.children}</div>
    </>
  );
}
