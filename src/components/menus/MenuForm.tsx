/* eslint-disable @typescript-eslint/no-misused-promises */
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import type { MenuCardProps } from '../../types/menus.type';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store';
import { createMenuThunk, updateMenuThunk, updateToMenus } from '../../features/menu/menuSlice';

const items: { id: number; label: string }[] = [
  {
    id: 1,
    label: 'Propular',
  },
  {
    id: 2,
    label: 'Salad',
  },
  {
    id: 3,
    label: 'Breakfast',
  },
  {
    id: 4,
    label: 'Juice',
  },
  {
    id: 5,
    label: 'Snack',
  },
];
export const menuSchema = z.object({
  dish: z.string().nonempty({ message: 'You need to fill dish name.' }),
  price: z.number().min(100, { message: 'Dish price must be above 100 kyats.' }),
  status: z.enum(['ACTIVE', 'INACTIVE']),
  categoryId: z.number(),
});

export function MenuForm({ menu, setIsOpened }: MenuCardProps) {
  // 1. Define your form.
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector((state: RootState) => state.menu);
  console.log(data);
  const form = useForm<z.infer<typeof menuSchema>>({
    resolver: zodResolver(menuSchema),
    defaultValues: menu
      ? {
          ...menu,
          categoryId: menu.categoryId,
        }
      : {
          dish: '',
          price: 0,
          status: 'ACTIVE',
          categoryId: 0,
        },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof menuSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    if (values.dish) {
      if (menu !== null) {
        if (menu.id) {
          await dispatch(
            updateMenuThunk({
              ...values,
              id: menu.id,
              extras: menu.extras,
              dishSizes: menu.dishSizes,
            })
          ).unwrap();
          dispatch(
            updateToMenus({
              ...values,
              id: menu.id,
              extras: menu.extras,
              dishImg: menu.dishImg,
              dishSizes: menu.dishSizes,
            })
          );
        }
      } else {
        await dispatch(createMenuThunk(values)).unwrap();
      }
      setIsOpened(false);
    }
  }

  return (
    <div className="w-11/12 mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex w-full justify-between gap-6">
            <FormField
              control={form.control}
              name="dish"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dish Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Please fill dish name." {...field} className="w-44" />
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
                      className="w-44"
                      onChange={(e) => {
                        onChange(Number(e.target.value));
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex w-full justify-between gap-6">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                      }}
                    >
                      <SelectTrigger className="w-44">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ACTIVE">Active</SelectItem>
                        <SelectItem value="INACTIVE">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    value={field.value ? String(field.value) : ''}
                    onValueChange={(value) => {
                      field.onChange(Number(value));
                    }}
                  >
                    <SelectTrigger className="w-44">
                      <SelectValue placeholder="Join Category." />
                    </SelectTrigger>
                    <SelectContent>
                      {items.map((item: { id: number; label: string }) => (
                        <SelectItem key={item.id} value={String(item.id)}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* <div className="flex w-full justify-between flex-col gap-4">
            <div className="w-full flex justify-between gap-4">
              <h1>Extras</h1>
            </div>
            <AppendForm form={form} extras={menu?.extras} />
            <div className="w-full flex justify-between gap-4">
              <h1>Dish-size</h1>
            </div>
            <AppendForm form={form} dishes={menu?.dishSizes} />
          </div> */}
          <Button type="submit">Save Changes</Button>
        </form>
      </Form>
    </div>
  );
}
