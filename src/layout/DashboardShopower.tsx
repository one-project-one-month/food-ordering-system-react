import { Outlet } from 'react-router-dom';
import { AppSidebar } from '../components/ShopowerSidebar';
import { Separator } from '../components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '../components/ui/sidebar';

export default function DashboardShopOwner() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center fixed top-0 z-40 w-full bg-card gap-2 border-b">
          <div className="flex items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </div>
        </header>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
