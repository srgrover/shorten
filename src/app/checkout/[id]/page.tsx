'use client'

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User } from '@/interfaces';
import { Suscription } from '@/interfaces/suscription.interface';
import {
  Trash2,
  CreditCard,
  Truck,
  Shield,
} from 'lucide-react';
import { redirect } from 'next/navigation';
import { useState } from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
}

interface Props {
  suscription: Suscription,
  user: User | null,
  params: {
    slug: string;
  };
}

export default async function CheckoutPage({ suscription, user, params }: Props) {
  // const [cartItem, setCartItem] = useState<CartItem>({});

  const total = suscription.specialPrice ? suscription.specialPrice : suscription.price;

  const removeItem = () => {
    redirect('/suscriptions');
  };

  return (
    <div className="mx-auto w-full max-w-7xl p-6">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main Cart Section */}
        <div className="space-y-6 lg:col-span-2">
          <div>
            <h1 className="text-2xl font-semibold">Checkout order</h1>
            <p className="text-muted-foreground">
              in your cart
            </p>
          </div>

          <div className="space-y-4">
              <Card key={suscription.id} className="overflow-hidden p-0">
                <CardContent className="p-0">
                  <div className="flex h-full flex-col md:flex-row">                  
                    {/* Product Details */}
                    <div className="flex-1 p-6 pb-3">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-medium">{suscription.name}</h3>
                          <p className="text-muted-foreground text-sm">
                            { suscription.description }
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem()}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <div className="text-right">
                          <div className="font-medium">
                            ${(suscription.price)}
                          </div>
                          {suscription.specialPrice && (
                            <div className="text-muted-foreground text-sm line-through">
                              ${(suscription.specialPrice).toFixed(2)}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
          </div>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
              <CardDescription>
                Review your order details and shipping information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Promo Code */}
              <div className="space-y-2">
                <Label>Promo Code</Label>
                <div className="flex gap-2">
                  <Input placeholder="Enter promo code" />
                  <Button variant="outline">Apply</Button>
                </div>
              </div>

              {/* Order Summary */}
              <div className="space-y-2">
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>${total}</span>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-4 border-t pt-4">
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="text-primary h-4 w-4" />
                  <span>Secure payment</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Truck className="text-primary h-4 w-4" />
                  <span>Fast delivery</span>
                </div>
              </div>

              {/* Checkout Button */}
              <Button className="w-full">
                <CreditCard className="mr-2 h-4 w-4" />
                Proceed to Checkout
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}