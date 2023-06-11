import { Tabs } from '@/components';
import { redirect } from 'next/navigation';

export default function Home() {
  // redirect('/signin');
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
                  <img title="[[data.UnionId]]" src="[[data.AvatarUrl]]" />
                </td>
              </tr>
              <tr>
                <td className="text-right">UserName</td>
                <td>[[data.UserName]]</td>
              </tr>
              <tr>
                <td className="text-right">DisplayName</td>
                <td>[[data.DisplayName]]</td>
              </tr>
              <tr>
                <td className="text-right">Is External User</td>
                <td>[[data.IsExternalUser === 1 ? 'Yes': 'No']]</td>
              </tr>
              <tr>
                <td className="text-right">Email Address</td>
                <td>[[data.EmailAddress]]</td>
              </tr>
              <tr>
                <td className="text-right">Phone Number</td>
                <td>[[data.PhoneNumber]]</td>
              </tr>
              <tr>
                <td className="text-right">Gender</td>
                <td>[[data.Gender]]</td>
              </tr>
              <tr>
                <td className="text-right">Location</td>
                <td>[[data.Location]]</td>
              </tr>
              <tr>
                <td className="text-right">Create Date</td>
                <td>[[data.CreateDate.toLocaleDateString()]]</td>
              </tr>
              <tr>
                <td colSpan={2} className="text-center">
                  <a className="layui-btn layui-btn-danger" href="/logout">
                    注销登录
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="layui-col-xs6">
          <Tabs activeKey="abc" type="card">
            <Tabs.TabPane tab="统计" tabKey="abc">这是要给统计面盘</Tabs.TabPane>
            <Tabs.TabPane tab="统计2" tabKey="ab2c">这是要给统计面22盘</Tabs.TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
