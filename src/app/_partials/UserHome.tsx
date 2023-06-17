'use client';
import { Tabs } from '@/components';
import { signOut } from 'next-auth/react';

export function UserHome() {
  return (
    <div>
      <div className="layui-row layui-col-space8">
        <div className="layui-col-xs6">
          <table className="layui-table" lay-even="" lay-skin="row">
            <colgroup>
              <col width="200" />
              <col width="200" />
            </colgroup>
            <tbody>
              <tr>
                <td colSpan={2} className="user-avatar">
                  <img title="data.UnionId" />
                </td>
              </tr>
              <tr>
                <td className="text-right">UserName</td>
                <td>data.UserName</td>
              </tr>
              <tr>
                <td className="text-right">DisplayName</td>
                <td>data.DisplayName</td>
              </tr>
              <tr>
                <td className="text-right">Is External User</td>
                <td>sss</td>
              </tr>
              <tr>
                <td className="text-right">Email Address</td>
                <td>data.EmailAddress</td>
              </tr>
              <tr>
                <td className="text-right">Phone Number</td>
                <td>data.PhoneNumber</td>
              </tr>
              <tr>
                <td className="text-right">Gender</td>
                <td>sss</td>
              </tr>
              <tr>
                <td className="text-right">Location</td>
                <td>ddd</td>
              </tr>
              <tr>
                <td className="text-right">Create Date</td>
                <td>dd</td>
              </tr>
              <tr>
                <td colSpan={2} className="text-center">
                  <a
                    className="layui-btn layui-btn-danger"
                    onClick={() => {
                      signOut();
                    }}>
                    注销登录
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="layui-col-xs6">
          <Tabs activeKey="abc" type="card">
            <Tabs.TabPane tab="统计" tabKey="abc">
              这是要给统计面盘
            </Tabs.TabPane>
            <Tabs.TabPane tab="统计2" tabKey="ab2c">
              这是要给统计面22盘
            </Tabs.TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
