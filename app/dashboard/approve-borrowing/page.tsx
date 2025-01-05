import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { getAccessToken, urlGenerator } from '@/utils/utils'
import { BorrowingType } from '@/types'
import BorrowingAction from './borrowing-action'

const ApproveBorrowing = async () => {
    const access = await getAccessToken()

    const response = await fetch(urlGenerator('/book/list/borrow/request/'), {
        headers: {
            'Authorization': `Bearer ${access}`,
        }
    })
    const data: BorrowingType[] = await response.json()

    return (
        <div className='w-full flex flex-col gap-4'>
            <Card className='w-full'>
                <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                    <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ISBN No</TableHead>
                                <TableHead>User</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">
                                    Action
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                data.length === 0 ? <TableRow>
                                    <TableCell colSpan={6} className="text-center">No data found</TableCell>
                                </TableRow> :
                                    data.map(record => {
                                        return <TableRow key={record.id}>
                                            <TableCell className="font-medium">
                                                {record.isbn_no}
                                            </TableCell>
                                            <TableCell>
                                                {record.user}
                                            </TableCell>
                                            <TableCell>
                                                {record.date}
                                            </TableCell>
                                            <BorrowingAction record={record} />
                                        </TableRow>
                                    })
                            }
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}

export default ApproveBorrowing
