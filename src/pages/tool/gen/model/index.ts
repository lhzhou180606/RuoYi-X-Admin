import { useInitActionType } from '@/hooks';
import type { ActionType } from '@ant-design/pro-components';
import { atom, useAtomValue, useSetAtom } from 'jotai';
import { atomWithReset, useResetAtom } from 'jotai/utils';

const atomMainTableActions = atom<ActionType | undefined>(undefined);
export const useActionRefMainTable = () => useInitActionType(atomMainTableActions);
export const useAtomValueMainTableActions = () => useAtomValue(atomMainTableActions);

const atomSelectedTableId = atomWithReset({
  open: false,
  previewId: 0,
});
export const useAtomValuePreviewModal = () => useAtomValue(atomSelectedTableId);
export const useShowPreviewModal = () => {
  const setAtom = useSetAtom(atomSelectedTableId);
  return (previewId: number) => {
    setAtom({ open: true, previewId });
  };
};
export const useHidePreviewModal = () => useResetAtom(atomSelectedTableId);
