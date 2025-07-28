/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { Button } from '../../ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../ui/form';
import { Input } from '../../ui/input';
import {
  // addToExtra,
  createExtraThunk,
  deleteExtraThunk,
  updateExtraThunk,
  updateToExtra,
} from '../../../features/menu/menuSlice';
import type { AppDispatch } from '../../../store';
import type { Extra } from '../../../types/menus.type';
// import type { AppDispatch } from '../../../store';

export const extraSchema = z.object({
  name: z.string(),
  price: z.number(),
  // eslint-disable-next-line @typescript-eslint/unbound-method
  menuId: z.number(),
});

interface ExtraFromProps {
  extra: null | Extra;
  menuId: number;
}

function ExtraForm({ extra, menuId }: ExtraFromProps) {
  // const data = useSelector((state: RootState) => state.menu);
  const dispatch = useDispatch<AppDispatch>();
  const form = useForm<z.infer<typeof extraSchema>>({
    resolver: zodResolver(extraSchema),
    defaultValues: extra ? { ...extra, menuId } : { name: '', price: 0, menuId },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof extraSchema>) {
    if (extra) {
      await dispatch(
        updateExtraThunk({ ...values, id: extra.id, menuId: Number(menuId) })
      ).unwrap();
      dispatch(updateToExtra({ ...values, menuId, id: extra.id }));
    } else {
      await dispatch(createExtraThunk({ ...values, menuId: Number(menuId) }))
        .unwrap()
        .then(() => {
          console.log('Created extra');
        });
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className=" flex w-full justify-between gap-2 ">
            <FormField
              control={form.control}
              name="name"
              render={({ field: { onChange, ...field } }) => (
                <FormItem>
                  <FormLabel>Extra Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Please fill dish name."
                      {...field}
                      //   defaultValue={extra?.name}
                      onChange={(e) => {
                        onChange(String(e.target.value));
                      }}
                      className="w-28"
                    />
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
                      placeholder="Pease fill extra price."
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
              className={extra?.id ? 'block mt-8' : 'hidden'}
              onClick={() => dispatch(deleteExtraThunk(Number(extra?.id)))}
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

export default ExtraForm;
