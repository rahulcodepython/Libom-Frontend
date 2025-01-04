"use client"
import React, { useRef } from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { SubmitButton } from './submit-button'
import { addBookAction } from '@/app/actions'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const BookForm = () => {
    const formRef = useRef<HTMLFormElement>(null)
    const router = useRouter()

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const data = {
            name: formData.get("name")?.toString() || "",
            isbn_no: formData.get("isbn_no")?.toString() || "",
            author: formData.get("author")?.toString() || "",
            quantity: parseInt(formData.get("quantity")?.toString() || "1"),
            category: formData.get("category")?.toString() || "",
            image: formData.get("image")?.toString() || "",
        }
        if (data?.name.length <= 0 || data.isbn_no.length <= 0 || data.author.length <= 0 || data.quantity <= 0 || data.category.length <= 0 || data.image.length <= 0) {
            console.log("Invalid data");
            return;
        }
        const result = await addBookAction(data)

        if (result && formRef.current) {
            if (result.status === 201 || result.status === 200) {
                router.push('/books')
                toast(result.data.success)
            } else {
                toast(result.data.error)
            }
            formRef.current.reset()
        }
    }

    return (
        <form ref={formRef} onSubmit={handleSubmit} className='flex flex-col items-center justify-center gap-4 max-w-2xl w-full'>
            <span className='w-full text-start mb-4'>
                <h2 className='text-2xl font-bold'>Add Book</h2>
            </span>
            <div className='w-full flex flex-col gap-2'>
                <Label htmlFor='name'>Book Name</Label>
                <Input type='text' id='name' name='name' />
            </div>
            <div className='w-full flex flex-col gap-2'>
                <Label htmlFor='isbn_no'>ISBN No</Label>
                <Input type='text' id='isbn_no' name='isbn_no' />
            </div>
            <div className='w-full flex flex-col gap-2'>
                <Label htmlFor='author'>Author</Label>
                <Input type='text' id='author' name='author' />
            </div>
            <div className='w-full flex flex-col gap-2'>
                <Label htmlFor='quantity'>Quantity</Label>
                <Input type='number' id='quantity' name='quantity' min={1} />
            </div>
            <div className='w-full flex flex-col gap-2'>
                <Label htmlFor='category'>Category</Label>
                <Input type='text' id='category' name='category' />
            </div>
            <div className='w-full flex flex-col gap-2'>
                <Label htmlFor='image'>Image</Label>
                <Input type='text' id='image' name='image' />
            </div>
            <SubmitButton className='w-full mt-4'>Add Book</SubmitButton>
        </form>
    )
}

export default BookForm
