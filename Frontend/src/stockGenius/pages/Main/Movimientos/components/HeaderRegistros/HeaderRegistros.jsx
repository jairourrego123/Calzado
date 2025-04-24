import React from 'react'

function HeaderRegistros({handleCloseAll,title,text,handleGoBack}) {

    return (
        <div>
            <span className="stock-genius-titles" >{title}</span>
            <span className="stock-genius-small-text" >{text}</span>
        </div>
    )
}

export default HeaderRegistros