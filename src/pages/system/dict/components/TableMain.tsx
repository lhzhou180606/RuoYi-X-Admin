import { BaseProTable } from '@/components';
import { EnableDisableStatusMap } from '@/constants';
import ButtonAdd from '@/pages/system/dict/components/ButtonAdd';
import ButtonDetails from '@/pages/system/dict/components/ButtonDetails';
import ButtonEdit from '@/pages/system/dict/components/ButtonEdit';
import ButtonExport from '@/pages/system/dict/components/ButtonExport';
import ButtonRefresh from '@/pages/system/dict/components/ButtonRefresh';
import ButtonRemove from '@/pages/system/dict/components/ButtonRemove';
import { useActionRefMainTable } from '@/pages/system/dict/model';
import { SysDictTypePostList } from '@/services/sys/SysDictTypeService';
import { convertParams } from '@/utils';
import type { ProColumns, ProTableProps } from '@ant-design/pro-components';
import type { FC } from 'react';
import { useState } from 'react';

const useColumns = (): ProColumns<API.SysDictTypeVo>[] => {
  return [
    { title: '字典编号', dataIndex: 'dictId', key: 'dictId', valueType: 'text', hideInSearch: true },
    { title: '字典名称', dataIndex: 'dictName', key: 'dictName', valueType: 'text' },
    { title: '字典类型', dataIndex: 'dictType', key: 'dictType', valueType: 'text' },
    { title: '状态', dataIndex: 'status', key: 'status', valueType: 'select', valueEnum: EnableDisableStatusMap },
    { title: '备注', dataIndex: 'remark', key: 'remark', valueType: 'textarea', hideInSearch: true },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      valueType: 'dateTime',
      editable: false,
      hideInSearch: true,
      sorter: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createTimeRange',
      key: 'createTimeRange',
      valueType: 'dateTimeRange',
      hideInTable: true,
    },
    {
      title: '操作',
      valueType: 'option',
      render: (dom, entity) => {
        return (
          <>
            <ButtonDetails dictType={entity.dictType} />
            <ButtonEdit record={entity} />
            <ButtonRemove dictId={entity.dictId} />
          </>
        );
      },
    },
  ];
};

const tableAlertOptionRender: ProTableProps<API.SysDictTypeVo, API.SysDictTypeQueryBo>['tableAlertOptionRender'] = ({
  selectedRows,
}) => {
  return (
    <ButtonRemove
      disabled={selectedRows.length === 0}
      isBatch
      dictId={selectedRows.map((i) => i.dictId).join(',') as unknown as number}
    />
  );
};

const TableMain: FC = () => {
  const actionRef = useActionRefMainTable();

  const columns = useColumns();

  const [searchParams, setSearchParams] = useState<API.SysDictTypeQueryBo>({});

  return (
    <BaseProTable<API.SysDictTypeVo, API.SysDictTypeQueryBo>
      rowKey="dictId"
      actionRef={actionRef}
      columns={columns}
      tableAlertOptionRender={tableAlertOptionRender}
      request={async (...p) => {
        const params = convertParams(...p);
        setSearchParams(params);
        return await SysDictTypePostList(params);
      }}
      toolbar={{
        actions: [
          <ButtonRefresh key="ButtonRefresh" />,
          <ButtonExport key="ButtonExport" searchParams={searchParams} />,
          <ButtonAdd key="ButtonAdd" />,
        ],
      }}
    />
  );
};

export default TableMain;
