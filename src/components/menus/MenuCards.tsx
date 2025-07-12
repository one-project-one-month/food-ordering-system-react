import MenuCard from './MenuCard';
import type { Menu, MenuProps } from '../../types/menus';

export default function Menu({ menus }: MenuProps) {
  if (!menus.length) return null;
  return (
    <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-2 gap-4 mt-8 px-4">
      {menus &&
        menus.map((menu: Menu) => (
          <div key={menu.id}>
            <MenuCard menu={menu} />
          </div>
        ))}
    </div>
  );
}
