"use client";
import { BorrowingType } from '@/types'
import React from 'react'
import {
    TableCell,
} from "@/components/ui/table"
import { CheckCircle2, Hourglass, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { approveBorrowingAction, rejectBorrowingAction } from '@/app/actions';
import { toast } from 'sonner';

const BorrowingAction = ({
    record
}: {
    record: BorrowingType
}) => {
    const [state, setState] = React.useState<BorrowingType['state']>(record.state)

    return (
        <>
            <TableCell>
                {
                    state === 'pending' ? <span className='text-yellow-500'>
                        <Hourglass size={16} className='animate-clock-spin' />
                    </span> :
                        state === 'approved' ? <span className='text-green-500'>
                            <CheckCircle2 size={16} />
                        </span> :
                            <span className='text-red-500'>
                                <XCircle size={16} />
                            </span>
                }
            </TableCell>
            <TableCell className="text-right">
                {
                    state === 'pending' && <div className='flex items-center gap-2 justify-end'>
                        <form>
                            <Button variant={'outline'} size={'icon'} type='submit' formAction={async (formData: FormData) => {
                                const response = await approveBorrowingAction(record.id)
                                if (response.status === 200) {
                                    setState('approved')
                                    toast(response.data.success)
                                } else {
                                    toast(response.data.error)
                                }
                            }}>
                                <span className='text-green-500'>
                                    <CheckCircle2 size={16} />
                                </span>
                            </Button>
                        </form>
                        <form>
                            <Button variant={'outline'} size={'icon'} type='submit' formAction={async (formData: FormData) => {
                                const response = await rejectBorrowingAction(record.id)
                                if (response.status === 200) {
                                    setState('canceled')
                                    toast(response.data.success)
                                } else {
                                    toast(response.data.error)
                                }
                            }}>
                                <span className='text-red-500'>
                                    <XCircle size={16} />
                                </span>
                            </Button>
                        </form>
                    </div>
                }
            </TableCell>
        </>
    )
}

export default BorrowingAction
