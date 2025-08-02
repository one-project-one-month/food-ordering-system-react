/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../../components/ui/dialog';
import { Button } from '../../../components/ui/button';

interface DeleteDialogBoxProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  handleDeleteAddress: () => void;
}

export default function DeleteDialogBox({
  open,
  onOpenChange,
  handleDeleteAddress,
}: DeleteDialogBoxProps) {
  return (
    <div>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px] z-[9999]">
          <DialogHeader>
            <DialogTitle>Do you want to delete this address?</DialogTitle>
            <DialogDescription>
              Are you sure to delete this address? You cannot redo this action.Be careful!
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button variant="destructive" onClick={handleDeleteAddress}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
