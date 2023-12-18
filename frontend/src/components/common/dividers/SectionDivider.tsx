import React from 'react';

import DividerBg from "../../../assets/images/divider-sprite.png";

function SectionDivider() {
    return (
        <div className='w-full h-10 -mt-5' style={{backgroundImage: `url(${DividerBg})`}}>
            
        </div>
    );
}

export default SectionDivider;