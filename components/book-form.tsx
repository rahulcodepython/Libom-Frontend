"use client"
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { SubmitButton } from './submit-button'
import { addBookAction, editBookAction } from '@/app/actions'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { BookFormType } from '@/types'

const BookForm = ({
    edit,
    defaultData,
    isbn_no,
}: {
    edit?: boolean
    defaultData?: BookFormType
    isbn_no?: string
}) => {
    const { register, handleSubmit, setValue, reset } = useForm<BookFormType>()
    const router = useRouter()

    useEffect(() => {
        if (edit && defaultData) {
            setValue("name", defaultData.name)
            setValue("isbn_no", defaultData.isbn_no)
            setValue("author", defaultData.author)
            setValue("quantity", defaultData.quantity)
            setValue("category", defaultData.category)
            setValue("image", defaultData.image)
        }
    }, [edit, defaultData, setValue])

    const onSubmit = async (data: BookFormType) => {
        if (!data.name || !data.isbn_no || !data.author || !data.quantity || !data.category || !data.image) {
            toast("Invalid data")
            return
        }

        const result = (edit && isbn_no) ? await editBookAction(data, isbn_no) : await addBookAction(data)

        if (result) {
            if (result.status === 201 || result.status === 200) {
                router.push('/books')
                toast(result.data.success)
            } else {
                toast(result.data.error)
            }
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-center gap-4 max-w-2xl w-full">
            <span className="w-full text-start mb-4">
                <h2 className="text-2xl font-bold">
                    {edit ? 'Edit Book' : 'Add Book'}
                </h2>
            </span>
            <div className="w-full flex flex-col gap-2">
                <Label htmlFor="name">Book Name</Label>
                <Input
                    type="text"
                    id="name"
                    {...register('name', { required: "Book name is required" })}
                />
            </div>

            <div className="w-full flex flex-col gap-2">
                <Label htmlFor="isbn_no">ISBN No</Label>
                <Input
                    type="text"
                    id="isbn_no"
                    {...register('isbn_no', { required: "ISBN is required" })}
                    readOnly={edit}
                />
            </div>

            <div className="w-full flex flex-col gap-2">
                <Label htmlFor="author">Author</Label>
                <Input
                    type="text"
                    id="author"
                    {...register('author', { required: "Author is required" })}
                />
            </div>

            <div className="w-full flex flex-col gap-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                    type="number"
                    id="quantity"
                    min={1}
                    {...register('quantity', { required: "Quantity is required", valueAsNumber: true })}
                />
            </div>

            <div className="w-full flex flex-col gap-2">
                <Label htmlFor="category">Category</Label>
                <Input
                    type="text"
                    id="category"
                    {...register('category', { required: "Category is required" })}
                />
            </div>

            <div className="w-full flex flex-col gap-2">
                <Label htmlFor="image">Image</Label>
                <Input
                    type="text"
                    id="image"
                    {...register('image', { required: "Image is required" })}
                />
            </div>

            <SubmitButton className="w-full mt-4" pendingText={edit ? 'Updating...' : 'Adding...'}>
                {edit ? 'Update Book' : 'Add Book'}
            </SubmitButton>
        </form>
    )
}

export default BookForm
