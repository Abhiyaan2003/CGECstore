import React from 'react'

const ReturnPolicy = () => {
    return (
        <div className='pt-10 border-t'>
            <div className='text-3xl text-center text-gray-800 mb-10'>
                <span className='font-medium'>Return</span> Policy
            </div>
            <div className='max-w-4xl mx-auto px-4 sm:px-0 text-gray-600 mb-20'>
                <p className='mb-4'>
                    At CGEC Wearables, we strive to ensure you are 100% satisfied with your purchase.
                    If you are not completely happy with your order, we offer a straightforward return process.
                </p>
                <h3 className='text-xl font-medium text-gray-800 mt-6 mb-2'>Eligibility for Returns</h3>
                <ul className='list-disc pl-5 mb-4'>
                    <li>Item(s) must be returned within 7 days from the date of delivery.</li>
                    <li>Item(s) must be unworn, unwashed, and in the exact condition you received them.</li>
                    <li>All original tags and packaging must be intact.</li>
                </ul>
                <h3 className='text-xl font-medium text-gray-800 mt-6 mb-2'>Non-Returnable Items</h3>
                <p className='mb-4'>
                    Due to hygiene reasons, certain items such as masks, innerwear, and customized clothing are non-returnable unless defective.
                </p>
                <h3 className='text-xl font-medium text-gray-800 mt-6 mb-2'>How to Return</h3>
                <p className='mb-4'>
                    To initiate a return, please contact our support team with your order number and the reason for the return.
                    Once approved, we will provide you with the return shipping address and instructions.
                </p>
            </div>
        </div>
    )
}

export default ReturnPolicy
