import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import type { MenuCardProps } from '../../types/menus';
import { Checkbox } from '../ui/checkbox';
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from '../../utils/acceptedImage';
// import { DialogClose } from '@radix-ui/react-dialog';

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
const formSchema = z.object({
  dish: z.string().nonempty({ message: 'You need to fill dish name.' }),
  price: z.number().min(100, { message: 'Dish price must be above 100 kyats.' }),
  status: z.enum(['active', 'inactive']),
  cat_Id: z.array(z.number()),
  dish_Img: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported.'
    ),
  // picture: typeof window === "undefined" ? z.any() : z.instanceof(File),
});

export function MenuForm({ menu }: MenuCardProps) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: menu
      ? { ...menu, dish_Img: typeof menu.dish_Img === 'string' ? undefined : menu.dish_Img }
      : {
          dish: '',
          price: 100,
          status: 'inactive',
          cat_Id: [],
          dish_Img: undefined,
        },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div className="w-4/5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex w-full justify-between gap-8">
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
                      onChange={(e) => onChange(Number(e.target.value))}
                      className="w-44"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex w-full justify-between gap-8">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Select>
                      <SelectTrigger className="w-44">
                        <SelectValue placeholder="Status" defaultValue={field.value} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dish_Img"
              render={({ field: { onChange } }) => {
                console.log();
                return (
                  <FormItem>
                    <FormLabel>Menu Image</FormLabel>
                    <FormControl>
                      <Input
                        id="picture"
                        type="file"
                        className="w-44"
                        onChange={(event) =>
                          onChange(event.target.files && event.target?.files[0].name)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>
          <FormField
            control={form.control}
            name="cat_Id"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">Category</FormLabel>
                  <FormDescription>Select categories.</FormDescription>
                </div>
                {items.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="cat_Id"
                    render={({ field }) => {
                      return (
                        <FormItem key={item.id} className="flex flex-row items-center gap-2">
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.id])
                                  : field.onChange(
                                      field.value?.filter((value) => value !== item.id)
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">{item.label}</FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <DialogClose asChild> */}
          <Button type="submit">Save Changes</Button>
          {/* </DialogClose> */}
        </form>
      </Form>
    </div>
  );
}
