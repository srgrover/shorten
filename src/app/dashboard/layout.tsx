import { DashboardMenu } from "@/components";

export default function DashboardLayout({ children }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <>
            <DashboardMenu />
            <div className="px-20 py-4">
                { children }
            </div>
        </>
    );
  }