import type { DialogProps } from '@radix-ui/react-dialog';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog'
import CategoryForm from '../../pages/category/CategoryForm';
import type { categoryProps } from '../../types/category.types';

interface DialogBoxProps extends DialogProps {
  data: categoryProps | null;
  formType: string;
  onOpenChange: ()=>void;
  onSubmitSuccess?: (value: categoryProps) => void;
}
export function CategoryDialog({ open, onOpenChange, data, formType, onSubmitSuccess }: DialogBoxProps) {
  const renderform = (formType: string) => {
    switch (formType) {
      case 'Category':
        return <CategoryForm type={'create'} defaultValues={data} onSubmitSuccess={(value) => {
            onSubmitSuccess?.(value);
          }}/>;
      default:
        break;
    }
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {formType}
          </DialogTitle>
        </DialogHeader>
        <div>{renderform(formType)}</div>
      </DialogContent>
    </Dialog>
  );
}
