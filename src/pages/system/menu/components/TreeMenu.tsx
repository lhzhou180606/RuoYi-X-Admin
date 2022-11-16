import { EmptySimple } from '@/components';
import type { MenuType } from '@/constants';
import { useQueryDict } from '@/models';
import TreeContent from '@/pages/system/menu/components/TreeContent';
import TreeTitle from '@/pages/system/menu/components/TreeTitle';
import {
  useAtomStateSelectedMenuData,
  useDeleteMenu,
  useQueryMenuList,
  useResetSelectedMenuData,
  useShowCreateModal,
} from '@/pages/system/menu/model';
import type { SysMenuQueryBo, SysMenuVo } from '@/services/system/data-contracts';
import { CaretDownOutlined, CaretRightOutlined } from '@ant-design/icons';
import { LightFilter, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import type { TreeProps } from 'antd';
import { Button, Dropdown, Tree } from 'antd';
import type { FC } from 'react';
import { useEffect, useState } from 'react';

export const menuTypeColor: Record<MenuType | string, string> = {
  M: 'blue',
  C: 'green',
  F: 'red',
};

const TreeMenu: FC = () => {
  const [searchParams, setSearchParams] = useState<SysMenuQueryBo>({});

  const [selectedKey, setSelectedKey] = useState<number>(0);
  const [expandedKeys, setExpandedKeys] = useState<TreeProps['expandedKeys']>([]);

  const [selectedMenuData, setSelectedMenuData] = useAtomStateSelectedMenuData();
  const resetSelectedMenuId = useResetSelectedMenuData();

  const showCreateModal = useShowCreateModal();

  const { data: dictSysNormalDisable } = useQueryDict('sys_normal_disable');

  const { data: menuData, refetch } = useQueryMenuList(searchParams, (e) => {
    setExpandedKeys(e);
  });

  const deleteMenu = useDeleteMenu();

  const onSelect: TreeProps<SysMenuVo>['onSelect'] = (_, { node: { key } }) => {
    setSelectedKey(key as number);
  };

  const isAllExpanded = expandedKeys?.length !== 0 && expandedKeys?.length === menuData?.parentIds?.length;

  useEffect(() => {
    refetch();
  }, [searchParams]);

  useEffect(() => {
    if (selectedKey > 0) {
      setSelectedMenuData({
        hasSelected: true,
        selectedMenuId: selectedKey,
        selectedMenuName: menuData!.map.get(selectedKey)!.menuName,
      });
    } else {
      resetSelectedMenuId();
    }
  }, [selectedKey]);

  return (
    <>
      <TreeTitle />

      <div className="flex justify-between items-center">
        <Button
          size="small"
          className="my-2"
          icon={isAllExpanded ? <CaretDownOutlined /> : <CaretRightOutlined />}
          onClick={() => setExpandedKeys(isAllExpanded ? [] : menuData?.parentIds)}
        >
          {isAllExpanded ? '全部折叠' : '全部展开'}
        </Button>

        <LightFilter<SysMenuQueryBo>
          onFinish={async (values) => {
            setSelectedKey(0);
            setExpandedKeys([]);
            setSearchParams(values);
          }}
        >
          <ProFormText name="menuName" label="菜单名称" />

          <ProFormSelect
            name="status"
            label="状态"
            valueEnum={dictSysNormalDisable?.mapData ?? {}}
            initialValue={dictSysNormalDisable?.defaultValue}
          />
        </LightFilter>
      </div>

      <Dropdown
        menu={{
          items: [
            {
              label: '新建',
              key: 'create',
              onClick: () => showCreateModal(),
            },
            {
              label: '在根目录下新建',
              key: 'createBase',
              onClick: () => {
                resetSelectedMenuId();
                showCreateModal();
              },
            },
            {
              label: '删除',
              key: 'delete',
              danger: true,
              disabled: !selectedMenuData.hasSelected,
              onClick: () =>
                deleteMenu({
                  menuId: selectedMenuData.selectedMenuId,
                  menuName: selectedMenuData.selectedMenuName,
                }),
            },
          ],
        }}
        trigger={['contextMenu']}
      >
        <div className="h-[calc(100vh-310px)] overflow-auto">
          {menuData?.treeData.length ? (
            <Tree<SysMenuVo>
              blockNode
              selectedKeys={[selectedKey]}
              onSelect={onSelect}
              expandedKeys={expandedKeys}
              titleRender={TreeContent}
              onExpand={setExpandedKeys}
              showLine={{ showLeafIcon: false }}
              fieldNames={{
                title: 'menuName',
                key: 'menuId',
                children: 'children',
              }}
              treeData={menuData?.treeData}
              onRightClick={({ node: { key } }) => setSelectedKey(key as number)}
            />
          ) : (
            <EmptySimple />
          )}
        </div>
      </Dropdown>
    </>
  );
};

export default TreeMenu;
