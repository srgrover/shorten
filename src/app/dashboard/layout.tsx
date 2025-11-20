import { DashboardMenu } from "@/components";

export default function DashboardLayout({ children }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <>
            <DashboardMenu />
            <section className="container my-[15px] flex w-full items-center">
                { children }
            </section>
        </>
    );
  }