import Sidebar from "./Sidebar";
import BottomNav from "./BottomNav";
import TopBar from "./TopBar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="lg:ml-64">
        <TopBar />
        <main className="min-h-[calc(100vh-64px)] pb-24 lg:pb-8">
          {children}
        </main>
      </div>
      <BottomNav />
    </div>
  );
}
