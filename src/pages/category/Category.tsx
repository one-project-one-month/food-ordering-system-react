 
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { type AppDispatch, type RootState } from '../../store';
import { Button } from '../../components/ui/button';
import { deleteCategory, getAllCategories } from '../../features/categories/categoriesSlice';
import { Loader2 } from 'lucide-react';
import { CategoryDialog } from './CategoryDialog';
import { DialogToDelete } from '../../components/DialogToDelete';
import { toast } from 'react-toastify';

const Category = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const { data: allData, loading } = useSelector((state:RootState) => state.categories.searched);
  const [allCategoriesData, setAllCategoriesData] = useState<any>([]);
  const [categorySubmitStatus, setCategorySubmitStatus] = useState<boolean>(false)
  const [editData, setEditData] = useState<any>({});
  const [isDeleteDia, setIsDeleteDia] = useState<boolean>(false);
  const [idToDelete, setIdToDelete] = useState<number>(0)

  const getAllCategoriesData = async()=>{
    try{
      await dispatch(getAllCategories())
    }catch(e){
      console.log("error ", e)
    }
  }

  useEffect(()=>{
    void getAllCategoriesData()
  },[categorySubmitStatus])

  useEffect(() => {
    if (allData && allData.length !== 0) {
      setAllCategoriesData(allData);
    }
  }, [allData]);

  const handleSuccess = () => {
    setCategorySubmitStatus(!categorySubmitStatus)
    setIsOpened(false);
  };

  const handleDialog = ()=>{
    setIsOpened((open) => !open);
    setEditData({})
  }
  const editHandler = (data:any)=>{
    setEditData(data)
    setIsOpened((open) => !open);
  }

  const deleteHandler = (data:any)=>{
    setIdToDelete(Number(data.id))
    handleDeleteDialog()
  }
  const handleDeleteCategory = (id: number) => {
    handleDeleteDialog();
    void deleteCategoryData(String(id))
  };

  const handleDeleteDialog = () => {
    setIsDeleteDia((prev) => !prev);
  };

  const deleteCategoryData = async(id: string)=>{
    try{
      const result = await dispatch(deleteCategory({id}))
      const resultPayload = result.payload as any
      if (resultPayload.code===200) {
        toast.success('Category deleted successfully!');
        setCategorySubmitStatus(!categorySubmitStatus)
      } else {
        toast.error('Errors when deleting category!');
      }
    }catch(e){
      console.log("error ", e)
    }
  }

  return (
     <div>
        <div>
            <h2 className="text-3xl font-bold text-gray-700">Categories</h2>
            <p className="text-sm pt-1">Organising your foods into categories allow you to more easily manage your foods</p>
            <div className="flex justify-start pt-6">
              <Button type='button' onClick={handleDialog}>
                  Create New Category
              </Button>
              <CategoryDialog open={isOpened} onOpenChange={handleDialog} data={editData} formType="Category" onSubmitSuccess={handleSuccess} />
              <DialogToDelete
                open={isDeleteDia}
                onOpenChange={handleDeleteDialog}
                id={idToDelete}
                type="category"
                handleDeleteMenu={handleDeleteCategory}
              />
            </div>
              {
                loading ? 
                <div className='flex mt-6 h-full justify-center items-center'>
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div> : 
                <div className='mt-6 flex w-full lg:w-[800px] flex-col gap-2'>
                  {allCategoriesData?.map((data:any)=>
                    <div key={data.id} className='bg-white text-base flex items-center justify-between py-3 px-5 shadow-sm rounded-md'>
                        <h3>{data.name}</h3>
                        <div className='flex gap-2'>
                          <Button type='button' className='h-[30px] text-sm bg-primary' onClick={()=>{ editHandler(data)}}>
                          Edit</Button>
                          <Button type='button' className='h-[30px] text-sm bg-red-500 hover:bg-red-600' disabled={false} onClick={()=>{ deleteHandler(data) }}>
                          Delete</Button>
                        </div>
                    </div>
                    )
                  }
                </div>
              }
        </div>
    </div>
  )
}

export default Category
