import React from 'react'
import BookItem from './book-item'
import { isAuthenticated, urlGenerator } from '@/utils/utils';
import { BookType } from '@/types';
import { getAccessToken } from '@/app/actions';

const Books = async () => {
    const access = await getAccessToken();
    const isAuth = isAuthenticated(access);

    const response = await fetch(urlGenerator('/book/list/'), {
        method: 'GET',
        headers: isAuth ? {
            'Authorization': `Bearer ${access}`
        } : {}
    });

    const data = await response.json();

    return (
        <section className='w-full grid grid-cols-3 gap-6 container mx-auto'>
            {
                data.length === 0 ? <div className='text-center col-span-3'>No books available</div> :
                    data.map((book: BookType) => <BookItem data={book} key={book.isbn_no} />)
            }
        </section>
    )
}

export default Books
