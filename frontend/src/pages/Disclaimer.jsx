import React from 'react'

const Disclaimer = () => {
    return (
        <div className='pt-10 border-t'>
            <div className='text-3xl text-center text-gray-800 mb-10'>
                <span className='font-medium'>Disclaimer</span>
            </div>
            <div className='max-w-4xl mx-auto px-4 sm:px-0 text-gray-600 mb-20'>
                <p className='mb-4'>
                    The information contained on CGEC Wearables is for general information purposes only. While we endeavor to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the website or the information, products, services, or related graphics.
                </p>
                <h3 className='text-xl font-medium text-gray-800 mt-6 mb-2'>Product Representation</h3>
                <p className='mb-4'>
                    We have made every effort to display as accurately as possible the colors and images of our products. We cannot guarantee that your computer monitor's display of any color will be accurate.
                </p>
                <h3 className='text-xl font-medium text-gray-800 mt-6 mb-2'>Limitation of Liability</h3>
                <p className='mb-4'>
                    In no event will we be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this website.
                </p>
                <h3 className='text-xl font-medium text-gray-800 mt-6 mb-2'>External Links</h3>
                <p className='mb-4'>
                    Through this website, you may be able to link to other websites which are not under the control of CGEC Wearables. We have no control over the nature, content, and availability of those sites.
                </p>
            </div>
        </div>
    )
}

export default Disclaimer
