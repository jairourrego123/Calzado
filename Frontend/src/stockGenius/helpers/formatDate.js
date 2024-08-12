// utils.js

export function formatDate(date) {
    const dateString= date.toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' })
    const [month,day, year] = dateString.split('/');
    return `${year}-${month}-${day}`;
  }
  
export function formatDateFront(dateString) {
  const [year, month, day] = dateString.split("-");
  return `${day}/${month}/${year}`;
  }
  