'use client';

import React, { type PropsWithChildren } from 'react';
import TabPane, { type TabPaneProps } from './TabPane';
import { TabItemType } from './types';
import classNames from 'classnames';

export { TabPaneProps };

export type TabsProps = {
  type?: 'brief' | 'card' | 'line';
  activeKey?: string;
  items?: TabItemType[];
  onChange?: (activeKey: string) => void;
  extra?: React.ReactNode;
};

export function Tabs(props: PropsWithChildren<TabsProps>) {
  const { type = 'line', items, activeKey, onChange, children, extra } = props;
  const tabItems =
    items ||
    React.Children.toArray(children)
      .map(node => {
        if (React.isValidElement(node)) {
          const { props } = node;
          const { tab, tabKey, children } = props || {};

          const item: TabItemType = {
            tabKey: String(tabKey),
            label: tab,
            children,
          };
          return item;
        }
        return null;
      })
      .filter(Boolean);

  const rootClass = classNames('layui-tab', {
    [`layui-tab-${type}`]: type && type !== 'line',
  });

  return (
    <div className={rootClass}>
      <ul className="layui-tab-title">
        {tabItems.map(item => {
          const showThis = activeKey === item?.tabKey;
          return (
            <li
              key={item?.tabKey}
              className={showThis ? 'layui-this' : ''}
              onClick={() => onChange?.(item!.tabKey)}>
              {item!.label}
            </li>
          );
        })}
        <li style={{ float: 'right', padding: 0, cursor: 'initial' }}>
          {extra}
        </li>
      </ul>
      <div className="layui-tab-content">
        {tabItems.map(item => {
          const show = item?.tabKey === activeKey;
          return (
            <div
              key={item?.tabKey}
              className={classNames(
                'layui-tab-item',
                show ? 'layui-show' : '',
              )}>
              {item?.children}
            </div>
          );
        })}
      </div>
    </div>
  );
}

Tabs.TabPane = TabPane;
