import './Paginations.css'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
function Paginations({totalPages,currentPage,handleChangePage}) {

  return (
    <Stack spacing={2}>
    <Pagination count={totalPages} page={currentPage} color="primary" size="small"  onChange={handleChangePage}/>
  </Stack>

  )
}

export default Paginations