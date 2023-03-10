import React from 'react';

interface TextInterface {
  children: React.ReactNode;
}

function Description({ children }: TextInterface) {
    return <p className="text-secondary">{children}</p>;
}

export default Description;