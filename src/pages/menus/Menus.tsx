import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import MenuCards from '../../components/menus/MenuCards';
import { Button } from '../../components/ui/button';
import { DialogBox } from '../../components/Dialog';
import type { AppDispatch, RootState } from '../../store';
import { getMenusThunk, getToMenus } from '../../features/menu/menuSlice';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import MenuCard from '../../components/menus/MenuCard';
import type { Menu } from '../../types/menus.type';
import { motion } from 'framer-motion';

export default function Menus() {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [editData, setEditData] = useState<any>(null);
  const [page, setPage] = useState<number>(1);
  const [allpage, setAllPage] = useState(0);
  const { items, loading, error, totalPage } = useSelector((state: RootState) => state.menu);

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    void dispatch(getMenusThunk(page));
    dispatch(getToMenus(items));
    setAllPage(totalPage);
  }, [dispatch, page]);

  const handleCreateMenu = (data: any) => {
    setIsOpened((prev) => !prev);
    setEditData(data);
  };

  if (error) {
    return <div>{error.toString()}</div>;
  }
  if (loading)
    return (
      <div className="flex mt-6 h-full justify-center items-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  return (
    <motion.div
      className="flex flex-col w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex justify-end right-4">
        <Button
          onClick={() => {
            handleCreateMenu({});
          }}
        >
          Create Menu
        </Button>
      </div>
      {items.length && (
        <>
          <div className="grid w-full lg:grid-cols-3 h-full md:grid-cols-2 grid-cols-2 gap-4 mt-6 px-4 mx-auto">
            {items.map((item: Menu) => (
              <MenuCard
                key={item.id}
                menu={item}
                setIsOpened={() => {
                  handleCreateMenu(item);
                }}
              />
            ))}
          </div>
          <div className="flex justify-center">
            <Button
              className="mt-5"
              size="sm"
              variant={'outline'}
              onClick={() => {
                setPage((prev) => (prev === 0 ? prev + 1 : prev - 1));
              }}
            >
              {' '}
              <ChevronLeft />
              Prev Page
            </Button>
            <Button
              className="mt-5"
              size="sm"
              variant={'outline'}
              onClick={() => {
                setPage((prev) => (prev > allpage || page == allpage ? 1 : prev + 1));
              }}
            >
              Next Page <ChevronRight />
            </Button>
          </div>
        </>
      )}
      <DialogBox
        open={isOpened}
        onOpenChange={() => {
          handleCreateMenu({});
        }}
        item={editData}
        formType="menu"
      />
    </motion.div>
  );
}
