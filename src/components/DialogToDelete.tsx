import type { DialogProps } from '@radix-ui/react-dialog';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';

interface DialogBoxProps extends DialogProps {
  id: number;
  type: string;
  onOpenChange: (open: boolean) => void;
  handleDeleteMenu: (id: number) => void;
}
export function DialogToDelete({ open, onOpenChange, id, type, handleDeleteMenu }: DialogBoxProps) {
  return (
    <div className="absolute top-0 left-0 z-50">
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] z-[9999]">
        <DialogHeader>
          <DialogTitle className='mb-4'>Do you want to delete this {type}?</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this {type}? You cannot redo this action. Be careful!
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button variant="destructive" onClick={() => { handleDeleteMenu(id); }}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
      </div>
  );
}
