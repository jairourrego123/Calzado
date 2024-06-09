import {useState} from 'react'
import './Calendar.css'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es';

function Calendar() {

    const [date, setDate] = useState(new Date());
    
    const handleDateChange = (selectedDate) => {
      if (selectedDate > new Date()) {
         return;
      }
  
      setDate(selectedDate);
    }
    return (
        

        <div className='stock-genius-date'> 
            
            <DatePicker
                showIcon
                locale={es}
                selected={date}
                onChange={handleDateChange}
                dateFormat="dd/MM/yyyy h:mm aa" 
                toggleCalendarOnIconClick
                // customInput={}
                // minDate={new Date()}
                maxDate={new Date()}
                icon={<img className='stock-genius-calendar-icon' src='/assets/icons/calendar.svg' alt='calendar'/>
                }
                // withPortal
                className='stock-genius-calendar'
                // readOnly 
            />
        
        </div>


    )
}

export default Calendar