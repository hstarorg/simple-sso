'use client';
import { Tabs } from '@/components';
import { signOut } from 'next-auth/react';

type UserHomeProps = {
  user: any;
};

export function UserHome(props: UserHomeProps) {
  const { user } = props;
  console.log(user, 'ggggggggggggggg');
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
                  <img title={user.UnionId} src={user.AvatarUrl} />
                </td>
              </tr>
              <tr>
                <td className="text-right">UserName</td>
                <td>{user.UserName}</td>
              </tr>
              <tr>
                <td className="text-right">DisplayName</td>
                <td>{user.DisplayName}</td>
              </tr>
              <tr>
                <td className="text-right">Is External User</td>
                <td>{user.IsExternalUser}</td>
              </tr>
              <tr>
                <td className="text-right">Email Address</td>
                <td>{user.EmailAddress}</td>
              </tr>
              <tr>
                <td className="text-right">Phone Number</td>
                <td>{user.PhoneNumber}</td>
              </tr>
              <tr>
                <td className="text-right">Gender</td>
                <td>{user.Gender}</td>
              </tr>
              <tr>
                <td className="text-right">Location</td>
                <td>{user.Location}</td>
              </tr>
              <tr>
                <td className="text-right">Create Date</td>
                <td>{user.CreateDate?.toString()}</td>
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
