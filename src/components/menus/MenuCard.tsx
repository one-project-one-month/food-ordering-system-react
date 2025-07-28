import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Separator } from '@radix-ui/react-separator';
import { Button } from '../ui/button';
import { DialogBox } from '../Dialog';
import { DialogToDelete } from '../DialogToDelete';
import DropZoneMenuImage from './DropZoneMenuImge';
import Extras from './extras/Extras';
import DishSizes from './dishSizes/DishSizes';
import {
  deleteMenuThunk,
  deleteToMenu,
  getMenusThunk,
  uploadMenuPhotoThunk,
} from '../../features/menu/menuSlice';
import type { AppDispatch, RootState } from '../../store';
import type { MenuCardProps } from '../../types/menus.type';

export default function MenuCard({ menu }: MenuCardProps) {
  const item = useSelector((state: RootState) => state.menu.items);
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [isDeleteDia, setIsDeleteDia] = useState<boolean>(false);
  const [dropDown, setDropDrown] = useState<File | undefined>(undefined);
  const dispatch = useDispatch<AppDispatch>();
  const handleEditMenu = () => {
    setIsOpened(!isOpened);
  };
  const handleCloseDialog = () => {
    setIsDeleteDia((prev) => !prev);
  };
  const handleDeleteMenu = (id: number) => {
    void dispatch(deleteMenuThunk(id));
    dispatch(deleteToMenu(id));
    handleCloseDialog();
  };
  useEffect(() => {
    const fetchMenuImage = async () => {
      if (dropDown && menu && typeof menu.id === 'number') {
        await dispatch(uploadMenuPhotoThunk({ dishImg: dropDown, id: menu.id })).then(() =>
          dispatch(getMenusThunk())
        );
      }
    };
    void fetchMenuImage();
  }, [dispatch, dropDown]);
  if (menu) {
    return (
      <div
        className={`${menu.status === 'ACTIVE' ? ' opacity-100' : ' opacity-30'} w-80 min-h-[400px] bg-card border-2 flex items-center flex-col  align-middle rounded-md`}
      >
        {menu.dishImg ? (
          <img
            src={typeof menu.dishImg === 'string' ? menu.dishImg.substring(53) : undefined}
            loading="lazy"
            decoding="async"
            alt={`${menu.dish} photo`}
            className="w-full h-36"
          />
        ) : (
          <DropZoneMenuImage
            setDropDrown={(files: File[]) => {
              setDropDrown(files[0]);
            }}
          />
        )}
        <Separator />
        <div className="flex w-full  space-y-4 flex-col items-center p-4">
          <div className="flex w-full gap-4 justify-between">
            <h6 className="font-medium">{menu.dish}</h6>
            <p>{menu.price} Kyats</p>
          </div>
          <div className="flex w-full justify-between">
            <Extras items={menu.extras ?? []} menu={menu} />
          </div>
          <div className="flex w-full justify-between">
            <DishSizes items={menu.dishSizes ?? []} menu={menu} />
          </div>
          <div className="flex justify-between w-full">
            <Button variant="secondary" onClick={handleEditMenu}>
              Edit
            </Button>
            <Button variant="destructive" onClick={handleCloseDialog}>
              Delete
            </Button>
          </div>
        </div>
        <DialogBox open={isOpened} onOpenChange={handleEditMenu} item={menu} formType="menu" />
        <DialogToDelete
          open={isDeleteDia}
          onOpenChange={handleCloseDialog}
          id={Number(menu.id)}
          type="menu"
          handleDeleteMenu={handleDeleteMenu}
        />
      </div>
    );
  }
}
