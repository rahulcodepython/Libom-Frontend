import { getAccessToken, urlGenerator } from '@/utils/utils'
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PricingType } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from 'next/link';

const Subscription = async () => {
    const access = await getAccessToken();

    const response = await fetch(urlGenerator('/transaction/subscription/'), {
        headers: {
            Authorization: `Bearer ${access}`
        }
    })
    const data: PricingType[] = await response.json()

    return (
        <div className="flex flex-col items-center justify-center gap-8 w-full mx-auto container">
            <section className="flex flex-col items-center justify-center gap-1">
                <h2 className="text-2xl font-bold">
                    Pricing Plans
                </h2>
                <p>
                    Choose the plan that's right for you
                </p>
            </section>
            <Tabs defaultValue="0" className="max-w-[60rem] w-full flex flex-col gap-4">
                <div className="w-full flex items-center justify-center">
                    <TabsList className="grid grid-cols-2 max-w-[15rem]">
                        <TabsTrigger value="0">Montly</TabsTrigger>
                        <TabsTrigger value="1">Yearly</TabsTrigger>
                    </TabsList>
                </div>
                <TabsContent value="0">
                    <div className="grid grid-cols-3 gap-4">
                        {
                            data.map((plan: PricingType) => {
                                return (
                                    plan.duration === 30 && <PricingCard plan={plan} key={plan.id} />
                                )
                            })
                        }
                    </div>
                </TabsContent>
                <TabsContent value="1">
                    <div className="grid grid-cols-3 gap-4">
                        {
                            data.map((plan: PricingType) => {
                                return plan.duration === 365 && <PricingCard plan={plan} key={plan.id} />
                            })
                        }
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}

const PricingCard = ({ plan }: {
    plan: PricingType
}) => (
    <Card>
        <CardHeader className="">
            <CardTitle className="text-zinc-700 dark:text-zinc-300 text-lg">{plan.id.split('-')[1]}</CardTitle>
            <div className="flex gap-0.5">
                <h3 className="text-3xl font-bold">
                    ₹{plan.amount}
                </h3>
                <span className="flex flex-col justify-end text-sm">{plan.duration === 365 ? "/year" : "/month"}</span>
            </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
            <div className="flex gap-2">
                <CheckCircle2 size={18} className="my-auto text-green-400" />
                <p className="pt-0.5 text-zinc-700 dark:text-zinc-300 text-sm">
                    {plan.max_borrow} books per week
                </p>
            </div>
            <div className="flex gap-2">
                {
                    plan.journal_access ? <CheckCircle2 size={18} className="my-auto text-green-400" /> :
                        <XCircle size={18} className="my-auto text-red-400" />
                }
                <p className="pt-0.5 text-zinc-700 dark:text-zinc-300 text-sm">
                    Journal Access
                </p>
            </div>
            <div className="flex gap-2">
                {
                    plan.premium_book_access ? <CheckCircle2 size={18} className="my-auto text-green-400" /> :
                        <XCircle size={18} className="my-auto text-red-400" />
                }
                <p className="pt-0.5 text-zinc-700 dark:text-zinc-300 text-sm">
                    Premimum Book Access
                </p>
            </div>
            <div className="flex gap-2">
                <CheckCircle2 size={18} className="my-auto text-green-400" />
                <p className="pt-0.5 text-zinc-700 dark:text-zinc-300 text-sm">
                    {plan.holding_time} days holding time
                </p>
            </div>
            <Link href={'/dashboard/checkout'} className="w-full">
                <Button className="w-full mt-4" disabled={plan.subscribed}>
                    Get Started
                </Button>
            </Link>
        </CardContent>
    </Card>
)

export default Subscription
