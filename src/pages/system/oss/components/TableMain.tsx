import { BaseProTable } from '@/components';
import ModalFormUpdate from '@/pages/system/oss/components/ModalFormUpdate';
import { useActionRefMainTable } from '@/pages/system/oss/model';
import { SysOssPostList } from '@/services/sys/SysOssService';
import { convertParams } from '@/utils';
import type { ProColumns } from '@ant-design/pro-components';
import type { FC } from 'react';

const columns: ProColumns<API.SysOssVo>[] = [
  {
    title: '对象存储主键',
    dataIndex: 'ossId',
    key: 'ossId',
    valueType: 'text',
    hideInSearch: true,
  },
  {
    title: '文件名',
    dataIndex: 'fileName',
    key: 'fileName',
    valueType: 'text',
  },
  {
    title: '原名',
    dataIndex: 'originalName',
    key: 'originalName',
    valueType: 'text',
  },
  {
    title: '文件后缀名',
    dataIndex: 'fileSuffix',
    key: 'fileSuffix',
    valueType: 'text',
  },
  {
    title: '服务商',
    dataIndex: 'service',
    key: 'service',
    valueType: 'text',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    valueType: 'dateTime',
    hideInSearch: true,
  },
  {
    title: '创建时间',
    dataIndex: 'createTimeRange',
    key: 'createTimeRange',
    valueType: 'dateTimeRange',
    hideInTable: true,
  },
];

const TableMain: FC = () => {
  const actionRef = useActionRefMainTable();

  return (
    <BaseProTable<API.SysOssVo, API.SysOssPageQueryBo>
      rowKey="ossId"
      actionRef={actionRef}
      columns={columns}
      request={(...p) => SysOssPostList(convertParams(...p))}
      toolbar={{
        actions: [<ModalFormUpdate key="ModalFormUpdate" />],
      }}
    />
  );
};

export default TableMain;
