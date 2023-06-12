import type { TableProps as AntdTableProps } from 'antd';
export type TableProps = {
  rowKey?: string | ((record: any) => string);
  columns: {
    title: React.ReactNode | ((props: TableProps) => React.ReactNode);
    key: string;
    dataIndex: string;
    render?: (value: any, record: any, index: number) => React.ReactNode;
  }[];
  dataSource?: any[];
};

export function Table(props: TableProps) {
  const { rowKey = 'key', columns = [], dataSource = [] } = props;
  return (
    <table className="layui-table">
      <thead>
        <tr>
          {columns.map(c => {
            const titleNode =
              typeof c.title === 'function' ? c.title(props) : c.title;
            return <th key={c.key}>{titleNode}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {dataSource.map((dataItem, rowIndex) => {
          const trKey =
            dataItem[typeof rowKey === 'function' ? rowKey(dataItem) : rowKey];
          return (
            <tr key={trKey}>
              {columns.map(c => {
                const cellValue = dataItem[c.dataIndex];
                const tdNode = c.render
                  ? c.render(cellValue, dataItem, rowIndex)
                  : cellValue;
                return <td key={c.key}>{tdNode}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
