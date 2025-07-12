import MenuCard from './MenuCard';
import type { Menu, MenuProps } from '../../types/menus';

export default function Menu({ menus }: MenuProps) {
  if (!menus.length) return null;
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(224px,1fr))] gap-4 mt-8 px-4">
      {menus &&
        menus.map((menu: Menu) => (
          <div key={menu.id}>
            <MenuCard menu={menu} />
          </div>
        ))}
    </div>
  );
}
