import type { DialogProps } from '@radix-ui/react-dialog';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import type { Menu } from '../types/menus.type';
import { MenuForm } from './menus/MenuForm';
import { useCallback, useEffect, useState } from 'react';
import { getAllCategories } from '../features/categories/categoriesSlice';
import type { AppDispatch, RootState } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import type { Category } from '../types/category.types';

interface DialogBoxProps extends DialogProps {
  item: Menu | null;
  formType: string;
  onOpenChange: () => void;
}
export function DialogBox({ open, onOpenChange, item, formType }: DialogBoxProps) {
  const [categories, setCategories] = useState<Category[] | []>([]);
  const { data: allData } = useSelector((state: RootState) => state.categories.searched);
  const dispatch = useDispatch<AppDispatch>();

  const getAllCategoriesData = async () => {
    await dispatch(getAllCategories());
  };

  useEffect(() => {
    void getAllCategoriesData();
  }, []);

  useEffect(() => {
    if (allData && allData.length !== 0) {
      setCategories(allData);
    }
  }, []);

  const renderform = useCallback(
    (formType: string) => {
      switch (formType) {
        case 'menu':
          return item ? (
            <MenuForm menu={item} setIsOpened={onOpenChange} categories={categories} />
          ) : (
            <MenuForm menu={null} setIsOpened={onOpenChange} categories={categories} />
          );
        default:
          break;
      }
    },
    [item]
  );
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:min-w-[425px] w-[850px]">
        <DialogHeader>
          <DialogTitle>
            {item?.dish ? 'Edit ' : 'Create '}
            {formType}
          </DialogTitle>
        </DialogHeader>
        <div>{renderform(formType)}</div>
      </DialogContent>
    </Dialog>
  );
}
