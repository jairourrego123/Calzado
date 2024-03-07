import  { useState } from 'react';

function TableWithCheckbox() {
  const [rows, setRows] = useState([
    { id: 1, name: 'Row 1', isChecked: false },
    { id: 2, name: 'Row 2', isChecked: false },
    { id: 3, name: 'Row 3', isChecked: false },
  ]);

  const handleCheckboxChange = (id) => {
    setRows(rows.map(row => {
      if (row.id === id) {
        return { ...row, isChecked: !row.isChecked };
      }
      return row;
    }));
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Select</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(row => (
          <tr key={row.id}>
            <td>
              <input
                type="checkbox"
                checked={row.isChecked}
                onChange={() => handleCheckboxChange(row.id)}
              />
            </td>
            <td>{row.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableWithCheckbox;
