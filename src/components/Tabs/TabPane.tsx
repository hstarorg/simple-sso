'use client';

import type { PropsWithChildren } from 'react';

export type TabPaneProps = {
  tabKey: string;
  tab: string;
};

export default function TabPane(props: PropsWithChildren<TabPaneProps>) {
  const { children } = props;
  return <div className="layui-tab-item">{children}</div>;
}
