import React from 'react'

const PrivacyPolicy = () => {
    return (
        <div className='pt-10 border-t'>
            <div className='text-3xl text-center text-gray-800 mb-10'>
                <span className='font-medium'>Privacy</span> Policy
            </div>
            <div className='max-w-4xl mx-auto px-4 sm:px-0 text-gray-600 mb-20'>
                <p className='mb-4'>
                    Your privacy is critically important to us. This Privacy Policy outlines how we collect, use, and protect your information when you visit CGEC Wearables.
                </p>
                <h3 className='text-xl font-medium text-gray-800 mt-6 mb-2'>Information We Collect</h3>
                <p className='mb-4'>
                    We collect personal information that you provide to us, such as name, email address, shipping address, and payment information when you make a purchase.
                </p>
                <h3 className='text-xl font-medium text-gray-800 mt-6 mb-2'>How We Use Your Information</h3>
                <ul className='list-disc pl-5 mb-4'>
                    <li>To process and fulfill your orders.</li>
                    <li>To communicate with you regarding order updates and promotional offers.</li>
                    <li>To improve our website and services.</li>
                </ul>
                <h3 className='text-xl font-medium text-gray-800 mt-6 mb-2'>Data Protection</h3>
                <p className='mb-4'>
                    We implement a variety of security measures to maintain the safety of your personal information. Your personal information is contained behind secured networks and is only accessible by a limited number of persons.
                </p>
                <h3 className='text-xl font-medium text-gray-800 mt-6 mb-2'>Sharing of Information</h3>
                <p className='mb-4'>
                    We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties, except trusted third parties who assist us in operating our website or conducting our business, as long as those parties agree to keep this information confidential.
                </p>
            </div>
        </div>
    )
}

export default PrivacyPolicy
