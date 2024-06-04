import React, { useState } from 'react'
import es from 'date-fns/locale/es';
import DatePicker from 'react-datepicker';
import "./FilterData.css"
function FilterDate() {
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;

    const handleDateChange = (selectedDate) => {
        if (selectedDate > new Date()) {
            return;
        }
        setDateRange(selectedDate);
    }
    return (


        <div className='stock-genius-labels'>
            <span>Fecha: </span>
            <DatePicker
                locale={es}
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                onChange={(update) => {
                    handleDateChange(update);
                }}
                maxDate={new Date()}
                isClearable={true}
                monthsShown={2}
                className={`stock-genius-options stock-genius-filter-date ${startDate&& "active"}`}
                todayButton="Hoy"
                placeholderText="Filtrar por fecha."
            />
        </div>


    )
}

export default FilterDate