import React from 'react'
import '../styles/loading-spinner.scss'

const LoadingSpinner = ({ message = 'Loading...' }) => {
    return (
        <div className='loading-spinner-container'>
            <div className='loading-spinner'>
                <div className='spinner-ring'></div>
                <div className='spinner-ring'></div>
                <div className='spinner-ring'></div>
                <div className='spinner-ring'></div>
            </div>
            <p className='loading-message'>{message}</p>
        </div>
    )
}

export default LoadingSpinner
