/* eslint-disable @typescript-eslint/no-misused-promises */
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../store';
import Cookies from 'js-cookie';
import { Button } from '../../components/ui/button';
import { useEffect, useState} from 'react';
import { toast } from 'react-toastify';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';
import { categoryFormSchema } from '../../schemas/categoryFormSchema';
import type { CategoryFormProps, categoryProps } from '../../types/category.types';
import { createCategory, updateCategory } from '../../features/categories/categoriesSlice';

type CategoryFormType = z.infer<typeof categoryFormSchema>;

export default function CategoryForm({ defaultValues,onSubmitSuccess }: CategoryFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    setValue,
  } = useForm<CategoryFormType>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: defaultValues ?? undefined,
  });
    const dispatch = useDispatch<AppDispatch>()
    const [ submitType, setSubmitType] = useState<string>('create')

    useEffect(() => {
      if (
        defaultValues &&
        typeof defaultValues === 'object' &&
        Object.keys(defaultValues).length > 0 &&
        'id' in defaultValues
      ) {
        setValue('name',defaultValues.name)
        setSubmitType('update')
      } 
    }, [defaultValues]);
    const onFormSubmit = async (formData: { name: string }) => {
      const fullData: categoryProps = {
        ...formData, 
        restaurantId: Number(Cookies.get("restaurantId")),
      };
      const fullDataToUpdate: categoryProps = {
        ...formData, 
        id: defaultValues?.id,
      };
      if (
        defaultValues &&
        typeof defaultValues === 'object' &&
        Object.keys(defaultValues).length > 0 &&
        'id' in defaultValues
      ) {
        await updateCategoryData(fullDataToUpdate);
      }else{
        await createCategoryData(fullData);
      }
    };

    const createCategoryData = async(data:categoryProps)=>{
        try{
        const result = await dispatch(createCategory(data))
          if (createCategory.fulfilled.match(result)) {
            toast.success('Category created successfully!');
            onSubmitSuccess?.(data);
          } else if (createCategory.rejected.match(result)) {
            toast.error('Errors when creating category!');
          }
        }catch(e){
        console.log("error ", e)
        }
    }

    const updateCategoryData = async(data:categoryProps)=>{
        try{
        const result = await dispatch(updateCategory(data))
          if (updateCategory.fulfilled.match(result)) {
            toast.success('Category updated successfully!');
            onSubmitSuccess?.(data);
          } else if (updateCategory.rejected.match(result)) {
            toast.error('Errors when updating category!');
          }
        }catch(e){
        console.log("error ", e)
        }
    }

  const fields: { label: string; name: keyof CategoryFormType; placeholder: string; type: string; required?: boolean }[] = [
    { label: 'Category Name', name: 'name', placeholder: 'Category', type: 'text', required: true },
  ];

  return (
      <form
        onSubmit={handleSubmit(onFormSubmit)}
       >
        <div className="grid grid-cols-1 gap-8">
          {fields.map(({ label, name, type, placeholder, required }) => (
            <div key={name} className="flex flex-col w-full">
              <label className="text-sm font-medium text-gray-600 mb-2">{label}</label>
              <input
                type={type}
                placeholder={placeholder}
                {...register(name, required ? { required: `Pls Enter Your ${label}` } : {})}
                className="px-4 py-2 w-full text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors[name] && (
                <span className="text-red-500 text-xs mt-1">{errors[name].message ?? ''}</span>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-center pt-6">
          <Button type='submit' disabled={!isDirty}>
            {submitType==='create'?'Create':'Update'}
          </Button>
        </div>
      </form>
  );
}
