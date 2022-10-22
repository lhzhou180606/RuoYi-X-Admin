import { Access } from '@/components';
import { useAtomValueAccess } from '@/models';
import { useAtomValueMainTableActions } from '@/pages/tool/gen/model';
import { GenPostRemove } from '@/services/gen/GenService';
import { DeleteOutlined } from '@ant-design/icons';
import { Button, message, Modal } from 'antd';
import type { FC } from 'react';

const ButtonDelete: FC<{ tableIds: number; isBatch?: boolean; disabled?: boolean }> = ({
  tableIds,
  isBatch = false,
  disabled = false,
}) => {
  const text = isBatch ? '批量删除' : '删除';

  const { canRemoveToolGen } = useAtomValueAccess();

  const tableActions = useAtomValueMainTableActions();

  const handleDelete = () => {
    Modal.confirm({
      title: '删除代码',
      content: `确定删除 表ID ${tableIds} 生成的代码吗？`,
      onOk: async () => {
        await GenPostRemove({ tableIds });
        tableActions?.reload();
        tableActions?.clearSelected?.();
        message.success('删除成功');
      },
    });
  };

  return (
    <Access accessible={canRemoveToolGen}>
      <Button danger icon={<DeleteOutlined />} type="link" onClick={handleDelete} disabled={disabled}>
        {text}
      </Button>
    </Access>
  );
};

export default ButtonDelete;
