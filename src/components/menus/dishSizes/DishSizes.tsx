import { useState } from 'react';
import type { DishSize, Menu } from '../../../types/menus.type';
import { Badge } from '../../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../ui/dialog';
import DishSizeForm from './DishSizeForm';
import { Button } from '../../ui/button';
import { PenLineIcon } from 'lucide-react';
// import { AvatarImage } from '@radix-ui/react-avatar';

interface DishSizesProps {
  items: DishSize[] | [];
  menu: Menu;
}
export default function DishSizes({ items, menu }: DishSizesProps) {
  const [dishBox, setDishBox] = useState<{
    menuId: number | undefined;
    isOpenBox: boolean;
    type: string;
    dishSize: null | DishSize;
  }>({
    menuId: menu.id,
    isOpenBox: false,
    type: 'Create',
    dishSize: null,
  });
  return (
    <div className="">
      <p className="text-sm font-light text-secondary-foreground pb-2">
        Avaliable Sizes: {items.length}
      </p>
      <div className="flex flex-wrap">
        {items.map((item: DishSize) => (
          <div key={item.id} className="font-light">
            <Badge variant="outline" className="m-1">
              {item.name}
              <Button
                variant="outline"
                className="size-3 ml-1"
                onClick={() => {
                  setDishBox({ ...dishBox, isOpenBox: true, type: 'Update', dishSize: item });
                }}
              >
                <PenLineIcon className="w-[3px] h-[3px]" />
              </Button>
            </Badge>
          </div>
        ))}
        <Badge
          variant="outline"
          className="m-1"
          onClick={() => {
            setDishBox({ menuId: menu.id, isOpenBox: true, type: 'Create', dishSize: null });
          }}
        >
          +
        </Badge>
        <Dialog
          open={dishBox.isOpenBox}
          onOpenChange={() => {
            setDishBox({ menuId: menu.id, isOpenBox: false, type: 'Create', dishSize: null });
          }}
        >
          <DialogContent className="sm:min-w-[425px] w-[850px]">
            <DialogHeader>
              <DialogTitle>
                {menu.id ? 'Update' : 'Create'} Dish-Size Box for {menu.dish}.
              </DialogTitle>
            </DialogHeader>
            <DishSizeForm
              menuId={Number(menu.id)}
              dishSize={dishBox.type === 'Create' ? null : dishBox.dishSize}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
