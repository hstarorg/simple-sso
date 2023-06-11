import React, { type PropsWithChildren } from 'react';
import TabPane, { type TabPaneProps } from './TabPane';
import { TabItemType } from './types';
import classNames from 'classnames';

export { TabPaneProps };

export type TabsProps = {
  type?: 'brief' | 'card' | 'line';
  activeKey?: string;
  items?: TabItemType[];
};

export function Tabs(props: PropsWithChildren<TabsProps>) {
  const { type = 'line', items, activeKey, children } = props;
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
          console.log(activeKey, item, 'ff');
          const showThis = activeKey === item?.tabKey;
          return (
            <li className={showThis ? 'layui-this' : ''}>{item!.label}</li>
          );
        })}
      </ul>
      <div className="layui-tab-content">
        {tabItems.map(item => {
          const show = item?.tabKey === activeKey;
          return (
            <div className="layui-tab-item layui-show">{item?.children}</div>
          );
        })}
      </div>
    </div>
  );
}

Tabs.TabPane = TabPane;
