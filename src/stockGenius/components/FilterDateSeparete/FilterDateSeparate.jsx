import es from 'date-fns/locale/es';
import DatePicker from 'react-datepicker';
import {ReactComponent as Calendar} from "../../../assets/icons/calendar.svg"
function FilterDateSeparate({date,setDate,maxRange, minRange}) {

    const handleDateChange = (selectedDate) => {
        setDate(selectedDate);
    }
    return (


        <div className=''>
            
            <DatePicker
                locale={es}
                toggleCalendarOnIconClick
                showIcon
                showYearDropdown
                scrollableYearDropdown
                selected={date}
                onChange={(update) => {
                    handleDateChange(update);
                }}
                icon={<Calendar className={`stock-genius-filter-date-icon ${date&& "active"}`}/>}
                maxDate={ maxRange||new Date()}
                dateFormat={"dd/MM/yyyy"}
                minDate={minRange}
                isClearable={true}
                className={`stock-genius-options stock-genius-filter-date ${date&& "active"}`}
                todayButton="Hoy"
                placeholderText="Selecciona una  fecha."
            />
        </div>


    )
}

export default FilterDateSeparate