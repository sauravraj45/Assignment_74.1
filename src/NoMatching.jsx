import React from 'react';

function NoMatching(){
    return(

        <div className='flex  flex-col gap-10  text-center mt-10 '>
            <h1 className='text-3xl font-medium'>Sorry, no results found!</h1>
            <p className='text-xl text-gray-500'>Please check the spelling or try searching for something else</p>
        </div>
    )
}

export default NoMatching;
