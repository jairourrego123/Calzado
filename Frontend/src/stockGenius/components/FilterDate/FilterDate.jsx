import{ useState } from 'react'
import es from 'date-fns/locale/es';
import DatePicker from 'react-datepicker';
import {ReactComponent as Calendar} from "../../../assets/icons/calendar.svg"

import "./FilterData.css"
function FilterDate({handleFilterDate}) {
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;

    const handleDateChange = (selectedDate) => {
        if (selectedDate > new Date()) {
            return;
        }
        setDateRange(selectedDate);
        const formattedDates = selectedDate.map(date => date ? date.toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' }) : null);
        handleFilterDate(formattedDates);
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
                showIcon
                dateFormat={"dd/MM/yyyy"}
                lo
                maxDate={new Date()}
                isClearable={true}
                icon={<Calendar className={`stock-genius-filter-date-icon ${startDate&& "active"}`}/>}
                // monthsShown={2}
                className={`stock-genius-options stock-genius-filter-date ${startDate&& "active"}`}
                todayButton="Hoy"
                placeholderText="Filtrar por fecha."
            />
        </div>


    )
}

export default FilterDate