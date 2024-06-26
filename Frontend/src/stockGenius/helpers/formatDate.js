// utils.js

export function formatDate(date) {
    console.log("date",date);
    const dateString= date.toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' })
    console.log("date string",dateString);
    const [month,day, year] = dateString.split('/');
    return `${year}-${month}-${day}`;
  }
  