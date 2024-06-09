import React from 'react'

function HeaderRegistros({handleCloseAll,title,text}) {
    return (
        <div>
            <svg onClick={handleCloseAll} className='stock-genius-click' width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M33.75 18C33.75 17.3787 33.2463 16.875 32.625 16.875H6.09099L13.1705 9.7955C13.6098 9.35616 13.6098 8.64384 13.1705 8.2045C12.7312 7.76516 12.0188 7.76516 11.5795 8.2045L2.5795 17.2045C2.14017 17.6438 2.14017 18.3562 2.5795 18.7955L11.5795 27.7955C12.0188 28.2348 12.7312 28.2348 13.1705 27.7955C13.6098 27.3562 13.6098 26.6438 13.1705 26.2045L6.09099 19.125H32.625C33.2463 19.125 33.75 18.6213 33.75 18Z" fill="#191F2F" />
            </svg>
            <span className="stock-genius-titles" >{title}</span>
            <span className="stock-genius-small-text" >{text}</span>
        </div>
    )
}

export default HeaderRegistros