import BookForm from '@/components/book-form'
import { getAccessToken, urlGenerator } from '@/utils/utils'
import React from 'react'

const EditBook = async ({ params }: { params: Promise<{ isbn_no: string | undefined }> }) => {
    const isbn_no = (await params).isbn_no
    const access = await getAccessToken();

    try {
        const response = await fetch(urlGenerator(`/book/${isbn_no}/`), {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${access}`,
            }
        });
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'An error occurred while fetching the book data.');
        }

        return (
            <BookForm edit defaultData={data} isbn_no={isbn_no} />
        )
    } catch (error: any) {
        return (
            <p>{error.message}</p>
        )
    }
}

export default EditBook
