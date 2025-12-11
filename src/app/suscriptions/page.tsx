import { Badge, Button, SuscriptionCard } from "@/components";
import { getAllSuscriptions, getUserByEmail } from "@/actions";
import { auth } from "@/auth.config";
import { Suscription } from "@/interfaces/suscription.interface";
import { User } from "@/interfaces";
import { TimerIcon } from "lucide-react";

export default async function DashboardPage() {
    let { suscriptions } = await getAllSuscriptions();
    const session = await auth();
    const { ok, message, user } = await getUserByEmail(session?.user!);

    return (
        <section className="py-12 md:py-12 lg:py-12">
          <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <Badge variant="outline" className="px-3 py-1 text-sm">
                Limited Time Offer
              </Badge>
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Choose your plan
                </h2>
                <p className="text-muted-foreground mx-auto max-w-[700px] md:text-xl/relaxed">
                  Get starter or upgrade now your plan for a better experience 
                </p>
              </div>
            </div>
    
            <div className="mx-auto mt-12 grid min-h-10xl gap-6 md:grid-cols-4">
              {suscriptions.map((suscription) => (
                <SuscriptionCard suscription={ suscription as Suscription } user={ user as User } key={ suscription.id } />
              ))}
            </div>
    
            <div className="bg-card mx-auto mt-16 max-w-3xl rounded-lg border p-8">
              <div className="flex flex-col items-center gap-4 text-center md:flex-row md:text-left">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-center gap-2 md:justify-start">
                    <TimerIcon className="text-primary h-5 w-5" />
                    <h3 className="text-xl font-medium">Don&apos;t miss out!</h3>
                  </div>
                  <p className="text-muted-foreground">
                    This offer is only available for a limited time. Sign up now to
                    lock in these special prices.
                  </p>
                </div>
                <Button size="lg" asChild>
                  <a href="/signup">Claim Your Discount</a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      );
}
