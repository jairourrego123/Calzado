import React, { useEffect, useState } from 'react'
import { ReactComponent as IconClock } from "../../../assets/icons/clock.svg"
import './Clock.css'
function Clock() {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setDate(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className='stock-genius-component-clock '>
            <IconClock />
            <div>
                <span>
                    {date.toLocaleDateString()} {/* Fecha */}
                </span>

                <span>
                    {date.toLocaleTimeString()} {/* Hora */}
                </span>
            </div>


        </div>
    );

};

export default Clock