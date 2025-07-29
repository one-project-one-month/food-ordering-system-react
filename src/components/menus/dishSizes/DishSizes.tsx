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
    type: string;
    dishSize: null | DishSize;
  }>({
    menuId: menu.id,
    type: 'Create',
    dishSize: null,
  });
  const [isOpened, setIsOpened] = useState<boolean>(false);
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
                  setDishBox({ ...dishBox, type: 'Update', dishSize: item });
                  setIsOpened(true);
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
            setDishBox({ menuId: menu.id, type: 'Create', dishSize: null });
            setIsOpened(true);
          }}
        >
          +
        </Badge>
        <Dialog
          open={isOpened}
          onOpenChange={() => {
            setIsOpened(false);
          }}
        >
          <DialogContent className="sm:min-w-[425px] w-[850px]">
            <DialogHeader>
              <DialogTitle>
                {dishBox.type === 'Update' ? 'Update' : 'Create'} Dish-Size Box for {menu.dish}.
              </DialogTitle>
            </DialogHeader>
            <DishSizeForm
              menuId={Number(menu.id)}
              dishSize={dishBox.type === 'Create' ? null : dishBox.dishSize}
              setIsOpened={() => {
                setIsOpened(false);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
