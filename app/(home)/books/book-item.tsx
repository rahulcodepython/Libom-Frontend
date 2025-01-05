import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import { isAuthenticated } from '@/utils/utils';
import BookBorrowConfirmation from './book-borrow-confirm';
import { BookType } from '@/types';

const BookItem = async ({ data }: {
    data: BookType
}) => {
    const isAuth = await isAuthenticated();

    return (
        <div className="grid grid-cols-2 border rounded-lg shadow md:flex-row md:max-w-xl">
            <img className="object-cover w-full rounded-t-lg h-[268px] md:rounded-none md:rounded-s-lg" src={data.image} alt="" />
            <div className="flex flex-col justify-between leading-normal p-2">
                <h5 className="tracking-tight">
                    {data.name}
                </h5>
                <div className='flex flex-col gap-1'>
                    <div className="grid grid-cols-2 gap-1 text-xs mb-2">
                        <span className="text-gray-600">
                            Quantity: {data.quantity}
                        </span>
                        <span className="text-gray-600 col-span-2">
                            Category: {data.category}
                        </span>
                        <span className="text-gray-600 col-span-2">
                            Author: {data.author}
                        </span>
                    </div>
                    {
                        isAuth ? data.request_pending ? <Button className='w-full' disabled>
                            Pending
                        </Button> : data.borrowed ? <Button className='w-full' disabled>
                            Borrowed
                        </Button> : <BookBorrowConfirmation isbn_no={data.isbn_no} /> : (
                            <Link href="/auth/sign-in">
                                <Button className='w-full'>
                                    Sign In
                                </Button>
                            </Link>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default BookItem
