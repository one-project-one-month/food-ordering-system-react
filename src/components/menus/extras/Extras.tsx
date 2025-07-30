/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import type { Extra, Menu } from '../../../types/menus.type';
import { Badge } from '../../ui/badge';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../ui/dialog';
import ExtraForm from './ExtraForm';
import { Button } from '../../ui/button';
import { PenLineIcon } from 'lucide-react';

interface ExtraProps {
  items: Extra[];
  menu: Menu;
}

export default function Extras({ items, menu }: ExtraProps) {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (menu) {
    const [extraBox, setExtraBox] = useState<{
      menuId: number | undefined;
      type: string;
      extra: null | Extra;
    }>({
      menuId: menu.id,
      type: 'Create',
      extra: null,
    });
    const [isOpened, setIsOpened] = useState(false);
    const renderform = (type: string) => {
      switch (type) {
        case 'Create':
          return (
            <ExtraForm
              extra={null}
              menuId={Number(menu.id)}
              setIsOpened={() => setIsOpened(false)}
            />
          );
        case 'Update':
          return (
            <ExtraForm
              extra={extraBox.extra}
              menuId={Number(menu.id)}
              setIsOpened={() => setIsOpened(false)}
            />
          );
        default:
          break;
      }
    };
    return (
      <div className="">
        <p className="text-sm font-light text-secondary-foreground pb-2">
          Avaliable Extras: {items.length}
        </p>
        <div className="flex flex-wrap">
          {items.map((item: Extra) => (
            <div key={item.id} className="font-light">
              <Badge variant="outline" className="m-1">
                {item.name}{' '}
                <Button
                  variant="outline"
                  className="size-3 ml-1"
                  onClick={() => {
                    setExtraBox({ ...extraBox, type: 'Update', extra: item });
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
              setExtraBox({ ...extraBox, type: 'Create', extra: null });
              setIsOpened(true);
            }}
          >
            +
          </Badge>
          <Dialog open={isOpened} onOpenChange={setIsOpened}>
            <DialogContent className="sm:min-w-[425px] w-[850px]">
              <DialogHeader>
                <DialogTitle>
                  {extraBox.type} Extra Box for {menu.dish}.
                </DialogTitle>
                {renderform(extraBox.type)}
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    );
  }
}
