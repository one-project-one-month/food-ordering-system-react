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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Do you want to delete this {type}?</DialogTitle>
          <DialogDescription>
            Are you sure to delete this {type}? You cannot redo this action.Be careful!
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
  );
}
