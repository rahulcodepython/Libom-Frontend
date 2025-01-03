import Navbar from '@/components/navbar';
import React from 'react'

const HomeLayout = ({ children }: {
    children: React.ReactNode;
}) => {
    return (
        <main className="min-h-screen flex flex-col items-center">
            <div className="flex-1 w-full flex flex-col gap-20 items-center">
                <Navbar />
                <div className="flex flex-col gap-20 p-5 w-full">
                    {children}
                </div>
            </div>
        </main>
    )
}

export default HomeLayout
