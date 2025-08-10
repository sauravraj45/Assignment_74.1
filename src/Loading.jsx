import React from 'react';
import { BiLoaderCircle } from "react-icons/bi";

function Loading(){
    return(
        <div className='flex items-center justify-center mt-20'>
            <BiLoaderCircle   className='text-6xl text-blue-700 animate-spin'/>
        </div>
    )
}

export default Loading;