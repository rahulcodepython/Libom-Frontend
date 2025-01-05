import { subscribeAction } from '@/app/actions'
import { Button } from '@/components/ui/button'
import React from 'react'

const Checkout = () => {
    return (
        <div className='flex flex-col justify-center items-center w-full'>
            <div className="mt-6 w-full space-y-6 max-w-md">
                <div className="flow-root">
                    <div className="-my-3 divide-y divide-gray-200 dark:divide-gray-800">
                        <dl className="flex items-center justify-between gap-4 py-3">
                            <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Subtotal</dt>
                            <dd className="text-base font-medium text-gray-900 dark:text-white">$8,094.00</dd>
                        </dl>

                        <dl className="flex items-center justify-between gap-4 py-3">
                            <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Savings</dt>
                            <dd className="text-base font-medium text-green-500">0</dd>
                        </dl>

                        <dl className="flex items-center justify-between gap-4 py-3">
                            <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Store Pickup</dt>
                            <dd className="text-base font-medium text-gray-900 dark:text-white">$99</dd>
                        </dl>

                        <dl className="flex items-center justify-between gap-4 py-3">
                            <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Tax</dt>
                            <dd className="text-base font-medium text-gray-900 dark:text-white">$199</dd>
                        </dl>

                        <dl className="flex items-center justify-between gap-4 py-3">
                            <dt className="text-base font-bold text-gray-900 dark:text-white">Total</dt>
                            <dd className="text-base font-bold text-gray-900 dark:text-white">$8,392.00</dd>
                        </dl>
                    </div>
                </div>
                <form className='w-full'>
                    <Button className='w-full' type='submit' formAction={async (formData: FormData) => {
                        "use server"
                        await subscribeAction('Basic-1');
                    }}>
                        Checkout
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default Checkout
