import React from 'react'

const EditBookLayout = ({ children }: {
    children: React.ReactNode
}) => {
    return <div className='flex flex-col items-center justify-center w-full'>
        {children}
    </div>
}

export default EditBookLayout
