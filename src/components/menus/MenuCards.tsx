import MenuCard from './MenuCard';
import type { Menu, MenuProps } from '../../types/menus.type';
import { memo } from 'react';

function MenuCards({ menus }: MenuProps) {
  if (menus.length) {
    return (
      // <div className="grid grid-cols-[repeat(auto-fit,minmax(224px,1fr))] gap-4 mt-6 px-4">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4 mt-6 px-4 mx-auto">
        {menus.map((menu: Menu) => (
          <MenuCard key={menu.id} menu={menu} />
        ))}
      </div>
    );
  }
}

export default memo(MenuCards);
