'use client';

import { proxy, useSnapshot } from 'valtio';
import { Button, Table, Tabs } from '@/components';
import { TableProps } from 'antd';
import Link from 'next/link';

type PageData = { activeKey: string };

const pageData = proxy<PageData>({
  activeKey: 'app_list',
});

const dataSource = [
  {
    Id: 17,
    AppName: 'Test01',
    AppDescription: 'fdsaf',
    AppKey: 'daaf557d-a50e-453c-8ce3-a42dbf94043b',
    AppSecret:
      '01fb3245b2f344aeaca0371c0881d22102c973ea7b624c59ad23e49690bffb2a',
    CallbackUrl: 'safsa',
    AppStatus: 'Active',
    CreateBy: 11,
    CreateDate: '2023-06-12T14:31:49.000Z',
  },
];

const columns: TableProps<any>['columns'] = [
  {
    title: '应用名称',
    dataIndex: 'AppName',
    key: 'AppName',
    render(value: string, item) {
      return <Link href={`/apps/${item['Id']}`}>{value}</Link>;
    },
  },
  {
    title: '应用 App Key',
    dataIndex: 'AppKey',
    key: 'AppKey',
  },
  {
    title: '应用描述',
    dataIndex: 'AppDescription',
    key: 'AppDescription',
  },
  {
    title: '状态',
    dataIndex: 'AppStatus',
    key: 'AppStatus',
  },
  // {
  //   title: '操作',
  //   dataIndex: 'Id',
  //   key: 'Id',
  //   render(value, record, index) {
  //     return (
  //       <span>
  //         <Link href={}>编辑</Link>
  //       </span>
  //     );
  //   },
  // },
];

export default function Apps() {
  const vmData = useSnapshot(pageData);
  return (
    <div>
      <Tabs
        activeKey={vmData.activeKey}
        type="brief"
        onChange={key => (pageData.activeKey = key)}
        extra={<Button size="sm">添加应用</Button>}>
        <Tabs.TabPane tabKey="app_list" tab="OAuth 应用列表">
          <Table rowKey="Id" columns={columns as any} dataSource={dataSource} />
        </Tabs.TabPane>
        <Tabs.TabPane tabKey="test" tab="测试用 TabPane">
          这是一个测试用的 TabPane
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}
