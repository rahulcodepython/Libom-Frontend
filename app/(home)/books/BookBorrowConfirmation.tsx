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

const BookBorrowConfirmation = () => {
    const [isOpen, setIsOpen] = React.useState(false)

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger>
                <Button className='w-full'>
                    Borrow
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure to borrow?</DialogTitle>
                </DialogHeader>
                <div className='text-base flex items-center justify-center w-full gap-12'>
                    <Button className='gap-2' variant={'outline'}>
                        <CheckCircle className='w-3 h-3' />
                        Yes
                    </Button>
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
