import React from 'react'

const RefundPolicy = () => {
    return (
        <div className='pt-10 border-t'>
            <div className='text-3xl text-center text-gray-800 mb-10'>
                <span className='font-medium'>Refund</span> Policy
            </div>
            <div className='max-w-4xl mx-auto px-4 sm:px-0 text-gray-600 mb-20'>
                <p className='mb-4'>
                    We want to make sure your shopping experience is as seamless as possible. Once we receive and inspect your returned item, we will notify you of the approval or rejection of your refund.
                </p>
                <h3 className='text-xl font-medium text-gray-800 mt-6 mb-2'>Refund Processing</h3>
                <p className='mb-4'>
                    If approved, your refund will be processed, and a credit will automatically be applied to your original method of payment within 5-7 business days. Please note that shipping charges are non-refundable.
                </p>
                <h3 className='text-xl font-medium text-gray-800 mt-6 mb-2'>Late or Missing Refunds</h3>
                <p className='mb-4'>
                    If you haven’t received a refund yet, please check your bank account again and contact your credit card company, as it may take some time before your refund is officially posted.
                </p>
                <p className='mb-4'>
                    If you’ve done all of this and you still have not received your refund, please contact us.
                </p>
                <h3 className='text-xl font-medium text-gray-800 mt-6 mb-2'>Exchanges</h3>
                <p className='mb-4'>
                    We only replace items if they are defective or damaged. If you need to exchange it for the same item, send us an email to initiate the process.
                </p>
            </div>
        </div>
    )
}

export default RefundPolicy
