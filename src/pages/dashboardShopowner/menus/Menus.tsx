import { useState } from 'react';
import MenuCards from '../../../components/menus/MenuCards';
import { Button } from '../../../components/ui/button';
import { menus } from '../../../data/menus';
import { DialogBox } from '../../../components/Dialog';

export default function Menus() {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const handleCreateMenu = () => {
    setIsOpened((open) => !open);
  };
  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-end right-4">
        <Button onClick={handleCreateMenu}>Create Menu</Button>
      </div>
      <MenuCards menus={menus} />
      <DialogBox open={isOpened} onOpenChange={handleCreateMenu} item={null} formType="menu" />
    </div>
  );
}
