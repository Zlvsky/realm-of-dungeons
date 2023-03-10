import React from 'react';

import { PageWrapInterface } from '../../../interfaces/LayoutInterfaces';

function BasicWrapper({ children }: PageWrapInterface) {
    return (
      <div className="container h-full mx-auto">
        <div className=" h-full mx-auto px-5 pb-10 md:pb-0 md:px-0 flex flex-col justify-center items-center">
          <div className="flex flex-col flex-wrap w-full">
            <div className="flex flex-col w-full">
                {children}
            </div>
          </div>
        </div>
      </div>
    );
}

export default BasicWrapper;