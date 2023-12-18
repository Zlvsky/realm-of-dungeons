import React from 'react';

function ImageWithText( { image, children }: any) {
    return (
        <div className='max-w-7xl mx-auto flex flex-col-reverse md:flex-row justify-center items-center'>
            <div className='w-full md:w-1/2'>
                <img src={image} alt="" className='w-full mx-auto max-w-xl md:pl-20 md:py-10'/>    
            </div>
            <div className='flex flex-col gap-5 w-full md:w-1/2 p-10 md:max-w-md'>
                {children}
            </div>
        </div>
    );
}

export default ImageWithText;