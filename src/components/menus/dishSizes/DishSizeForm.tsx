/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Button } from '../../ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../ui/form';
import { Input } from '../../ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { useDispatch } from 'react-redux';
import {
  createDishSizeThunk,
  deleteDishSizeThunk,
  getMenusThunk,
  updateDishSizeThunk,
} from '../../../features/menu/menuSlice';
import type { AppDispatch } from '../../../store';
import type { DishSize } from '../../../types/menus.type';
import { toast } from 'react-toastify';

export const dishSchema = z.object({
  name: z.string({ message: '' }),
  price: z.number(),
  menuId: z.number(),
});

export interface DishSizeFormProps {
  menuId: number;
  dishSize: null | DishSize;
  setIsOpened: () => void;
}
function DishSizeForm({ dishSize, menuId, setIsOpened }: DishSizeFormProps) {
  const dispatch = useDispatch<AppDispatch>();
  const form = useForm<z.infer<typeof dishSchema>>({
    resolver: zodResolver(dishSchema),
    defaultValues: dishSize ? { ...dishSize, menuId } : { name: '', price: 0, menuId },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof dishSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    if (dishSize) {
      if (values.name !== dishSize.name || values.price !== dishSize.price) {
        await dispatch(updateDishSizeThunk({ ...values, id: dishSize.id, menuId }))
          .unwrap()
          .then(() => {
            void dispatch(getMenusThunk(1));
            toast.success('Your dish-size successfully updated.');
            setIsOpened();
          });
      }
    } else {
      await dispatch(createDishSizeThunk({ ...values, menuId }))
        .unwrap()
        .then(() => {
          void dispatch(getMenusThunk(1));
          toast.success('Your dish-size successfully created .');
          setIsOpened();
        });
    }
  }

  const handleDeleteDishSize = async () => {
    await dispatch(deleteDishSizeThunk(Number(dishSize?.id)))
      .unwrap()
      .then(() => {
        toast.error('Your dish-size successfully deleted.');
        void dispatch(getMenusThunk(1));
      });
  };
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className=" flex w-full justify-between gap-2 ">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dish size</FormLabel>
                  <FormControl>
                    <Input placeholder="Please fill dish name." {...field} className="w-28" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field: { onChange, ...field } }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Pease fill dish price."
                      type="number"
                      {...field}
                      //   defaultValue={extra?.price}
                      onChange={(e) => {
                        onChange(Number(e.target.value));
                      }}
                      className="w-28"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              variant="destructive"
              className={dishSize ? 'block mt-8' : 'hidden'}
              onClick={handleDeleteDishSize}
            >
              Delete
            </Button>
          </div>
          <Button className="mt-8" variant="default" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default DishSizeForm;
