import React from 'react'

const AddBookLayout = ({ children }: {
    children: React.ReactNode
}) => {
    return <div className='flex flex-col items-center justify-center w-full'>
        {children}
    </div>
}

export default AddBookLayout
