import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import BookBorrowConfirmation from "./BookBorrowConfirmation";
import { isAuthenticated } from '@/utils/utils';

const BookItem = async () => {
    const isAuth = await isAuthenticated();

    return (
        <div className="grid grid-cols-2 border rounded-lg shadow md:flex-row md:max-w-xl">
            <img className="object-cover w-full rounded-t-lg h-[268px] md:rounded-none md:rounded-s-lg" src="/image-books.jpg" alt="" />
            <div className="flex flex-col justify-between leading-normal p-2">
                <h5 className="tracking-tight">
                    Noteworthy technology acquisitions 2021
                </h5>
                <div className='flex flex-col gap-1'>
                    <div className="grid grid-cols-2 gap-1 text-xs mb-2">
                        <span className="text-gray-600">
                            Quantity:200
                        </span>
                        <span className="text-gray-600">
                            Price:200
                        </span>
                        <span className="text-gray-600 col-span-2">
                            Category:John Doe
                        </span>
                    </div>
                    {
                        isAuth ? (
                            // when user can borrow
                            <BookBorrowConfirmation />

                            // when maximum borrow limit is reached
                            // <Button className='w-full' disabled>
                            //     Hold
                            // </Button>

                            // when user already borrowed this book
                            // <Button className='w-full' disabled>
                            //     Borrowed
                            // </Button>
                        ) : (
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
