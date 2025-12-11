export default function DashboardLayout({ children }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <>
            <section className="container my-[15px] flex w-full items-center">
                { children }
            </section>
        </>
    );
  }