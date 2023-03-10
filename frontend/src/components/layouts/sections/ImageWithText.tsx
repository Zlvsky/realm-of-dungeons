import React from 'react';

function ImageWithText( { image, children }: any) {
    return (
        <div className='max-w-7xl mx-auto flex row justify-around items-center'>
            <div className='w-1/3'>
                <img src={image} alt="" className='max-w-xl p-10'/>    
            </div>
            <div className='flex flex-col gap-5 w-1/3 p-10'>
                {children}
            </div>
        </div>
    );
}

export default ImageWithText;