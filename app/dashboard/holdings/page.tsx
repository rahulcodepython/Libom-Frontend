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
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import HoldingCalendar from './holding-calendar'
import HoldingRecord from './holding-record'
import { getAccessToken, urlGenerator } from '@/utils/utils'
import { HoldingType } from '@/types'

const Holdings = async () => {
    const access = await getAccessToken()

    const response = await fetch(urlGenerator('/book/list/borrowed'), {
        headers: {
            'Authorization': `Bearer ${access}`
        }
    })

    const data: HoldingType[] = await response.json()

    return (
        <div className='w-full flex flex-col gap-4'>
            <div className='flex items-start gap-4 w-full'>
                <Card className='w-full'>
                    <CardHeader>
                        <CardTitle>Card Title</CardTitle>
                        <CardDescription>Card Description</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableCaption>A list of your recent invoices.</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Book</TableHead>
                                    <TableHead>Borrow Date</TableHead>
                                    <TableHead>Maximum Return Date</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    data.map((holding) => (
                                        <TableRow key={holding.book}>
                                            <TableCell>{holding.book}</TableCell>
                                            <TableCell>{holding.borrow_date}</TableCell>
                                            <TableCell>{holding.max_return_date}</TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
                <div className='w-full flex-1'>
                    <HoldingCalendar />
                </div>
            </div>
            <HoldingRecord />
        </div>
    )
}

export default Holdings
