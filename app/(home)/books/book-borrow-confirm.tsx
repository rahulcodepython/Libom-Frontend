"use client";
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { CheckCircle, XCircle } from 'lucide-react'
import { Span } from '@/components/ui/span';
import { borrowBookAction } from '@/app/actions';
import { toast } from 'sonner';

const BookBorrowConfirmation = ({ isbn_no }: {
    isbn_no: string
}) => {
    const [isOpen, setIsOpen] = React.useState(false)

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger>
                <Span className='w-full'>
                    Borrow
                </Span>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure to borrow?</DialogTitle>
                </DialogHeader>
                <div className='text-base flex items-center justify-center w-full gap-12'>
                    <form>
                        <Button className='gap-2' variant={'outline'} formAction={async (formdata: FormData) => {
                            const response = await borrowBookAction(isbn_no)
                            if (response.status === 201) {
                                toast(response.data.success)
                            } else {
                                toast(response.data.error)
                            }
                            setIsOpen(false)
                        }}>
                            <CheckCircle className='w-3 h-3' />
                            Yes
                        </Button>
                    </form>
                    <Button className='gap-2' variant={'outline'} onClick={() => setIsOpen(false)}>
                        <XCircle className='w-3 h-3' />
                        No
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default BookBorrowConfirmation
