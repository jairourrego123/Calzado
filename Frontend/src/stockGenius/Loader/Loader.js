import React from 'react'
import './Loader.css'
import { useLoader } from '../context/LoadingContext';
function Loader() {
    const { loading } = useLoader();
    return (
        loading ?
            <>
                {/* <div className='stock-genius-loader-container'>
                    <div className='loader'>
                    </div>
                </div> */}

                ......
            </>

            : null
    )
}

export default Loader