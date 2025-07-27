import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MenuCards from '../../components/menus/MenuCards';
import { Button } from '../../components/ui/button';
import { DialogBox } from '../../components/Dialog';
import type { AppDispatch, RootState } from '../../store';
import { getMenusThunk, getToMenus } from '../../features/menu/menuSlice';

export default function Menus() {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const { items, loading, error } = useSelector((state: RootState) => state.menu);

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    void dispatch(getMenusThunk());
    dispatch(getToMenus(items));
  }, [dispatch]);

  console.log(items);
  const handleCreateMenu = () => {
    console.log('hello');
    setIsOpened(!isOpened);
    console.log(isOpened);
  };
  console.log(error);
  if (error) {
    return <div>{error.toString()}</div>;
  }
  if (loading)
    return <div className="flex text-center justify-center items-center">Loading ...</div>;
  if (items.length) {
    return (
      <div className="flex flex-col w-full">
        <div className="flex justify-end right-4">
          <Button onClick={handleCreateMenu}>Create Menu</Button>
        </div>
        <MenuCards menus={items} />
        <DialogBox open={isOpened} onOpenChange={handleCreateMenu} item={null} formType="menu" />
      </div>
    );
  }
}
