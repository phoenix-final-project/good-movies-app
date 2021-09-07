import React from 'react';

// importing styling
import './FormBanner.scss';

export default function FormBanner({ title, children }) {
    return (
        <React.Fragment>
            <div className="main-form">
                <h1 className='text-form'>{title}</h1>
                { children }
            </div>
        </React.Fragment>
    )
}
