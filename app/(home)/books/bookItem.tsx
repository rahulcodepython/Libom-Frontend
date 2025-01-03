import { createClient } from "@/utils/supabase/server";
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import BookBorrowConfirmation from "./BookBorrowConfirmation";

const BookItem = async () => {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    return (
        <div className="grid grid-cols-2 border rounded-lg shadow md:flex-row md:max-w-xl">
            <img className="object-cover w-full rounded-t-lg h-[268px] md:rounded-none md:rounded-s-lg" src="/image-books.jpg" alt="" />
            <div className="flex flex-col justify-between leading-normal p-2">
                <h5 className="tracking-tight">
                    Noteworthy technology acquisitions 2021
                </h5>
                <div className='flex flex-col gap-4'>
                    <div className='flex items-center gap-2 text-xs'>
                        <span className="text-gray-600">
                            Author:John Doe
                        </span>
                        <span className="text-gray-600">
                            Price:200
                        </span>
                    </div>
                    {
                        user ? (
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
