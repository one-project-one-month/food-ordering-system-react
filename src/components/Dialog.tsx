import type { DialogProps } from '@radix-ui/react-dialog';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import type { Menu } from '../types/menus.type';
import { MenuForm } from './menus/MenuForm';

interface DialogBoxProps extends DialogProps {
  item: Menu | null;
  formType: string;
  onOpenChange: () => void;
}
export function DialogBox({ open, onOpenChange, item, formType }: DialogBoxProps) {
  console.log('Dialog', open);
  const renderform = (formType: string) => {
    switch (formType) {
      case 'menu':
        return item ? (
          <MenuForm menu={item} setIsOpened={onOpenChange} />
        ) : (
          <MenuForm menu={null} setIsOpened={onOpenChange} />
        );
      default:
        break;
    }
  };
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
