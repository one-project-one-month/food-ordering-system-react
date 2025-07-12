import type { DialogProps } from '@radix-ui/react-dialog';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import type { Menu } from '../types/menus';
import { MenuForm } from './menus/MenuForm';

interface DialogBoxProps extends DialogProps {
  item: Menu | null;
  formType: string;
}
export function DialogBox({ open, onOpenChange, item, formType }: DialogBoxProps) {
  const renderform = (formType: string) => {
    switch (formType) {
      case 'menu':
        return item ? <MenuForm menu={item} /> : <MenuForm menu={null} />;
        break;
      default:
        break;
    }
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {item?.dish.length ? 'Edit ' : 'Create '}
            {formType}
          </DialogTitle>
        </DialogHeader>
        <div>{renderform(formType)}</div>
        {/* <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit">Save changes</Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
