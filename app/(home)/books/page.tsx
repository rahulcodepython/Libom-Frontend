import React from 'react'
import BookItem from './bookItem'

const Books = () => {
    return (
        <section className='w-full grid grid-cols-3 gap-6 container mx-auto'>
            <BookItem />
        </section>
    )
}

export default Books
