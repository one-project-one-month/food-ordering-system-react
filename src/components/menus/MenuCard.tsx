import { Separator } from '@radix-ui/react-separator';
import type { MenuCardProps } from '../../types/menus';
import { Button } from '../ui/button';
import { useState } from 'react';
import { DialogBox } from '../Dialog';
import { DialogToDelete } from '../DialogToDelete';

export default function MenuCard({ menu }: MenuCardProps) {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [isDeleteDia, setIsDeleteDia] = useState<boolean>(false);
  const handleEditMenu = () => {
    setIsOpened((prev) => !prev);
  };
  const handleCloseDialog = () => {
    setIsDeleteDia((prev) => !prev);
  };
  const handleDeleteMenu = (id: number) => {
    console.log(id);
    handleCloseDialog();
  };
  if (menu)
    return (
      <div className=" w-56 h-80 bg-card border-2 flex items-center flex-col p-4 align-middle rounded-md">
        <div className="w-full flex justify-between">
          <span className="underline p-1 text-sm text-clip-600">Active</span>
        </div>
        <img
          src={
            typeof menu.dish_Img === 'string'
              ? menu.dish_Img
              : menu.dish_Img
                ? URL.createObjectURL(menu.dish_Img)
                : undefined
          }
          alt={`${menu.dish} photo`}
          className=" size-36"
        />
        <Separator />
        <div className="flex w-full  space-y-4 flex-col items-center">
          <h6>{menu.dish}</h6>
          <div className="flex w-full gap-4 justify-between">
            <p>{menu.price} Kyats</p>
            <p className="text-yellow-300">{menu.cat_Id?.length} Categories</p>
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
          id={menu.id}
          type="menu"
          handleDeleteMenu={handleDeleteMenu}
        />
      </div>
    );
}
