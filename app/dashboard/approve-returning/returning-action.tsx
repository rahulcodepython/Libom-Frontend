"use client";
import { ReturningType } from '@/types'
import React from 'react'
import {
    TableCell,
} from "@/components/ui/table"
import { CheckCircle2, Hourglass } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { approveReturningAction } from '@/app/actions';
import { toast } from 'sonner';

const ReturningAction = ({
    record
}: {
    record: ReturningType
}) => {
    const [state, setState] = React.useState<ReturningType['state']>(record.state)

    return (
        <>
            <TableCell>
                {
                    state === 'pending' ? <span className='text-yellow-500'>
                        <Hourglass size={16} className='animate-clock-spin' />
                    </span> : <span className='text-green-500'>
                        <CheckCircle2 size={16} />
                    </span>
                }
            </TableCell>
            <TableCell className="text-right">
                {
                    state === 'pending' && <div className='flex items-center gap-2 justify-end'>
                        <form>
                            <Button variant={'outline'} size={'icon'} type='submit' formAction={async (formData: FormData) => {
                                const response = await approveReturningAction(record.id)
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
                    </div>
                }
            </TableCell>
        </>
    )
}

export default ReturningAction
