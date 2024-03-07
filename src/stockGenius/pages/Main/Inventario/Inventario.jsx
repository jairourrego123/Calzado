import Header from "../../../components/Header/Header"
import Search from "../../../components/Search/Search"
import TableWithCheckbox from "../../../components/TableWithCheckbox/TableWithCheckbox"
import Layout from "../../../components/Layout/Layout"

function Inventario() {
  return (
    <>
    <Header title={"Inventario"}/>
    <Search/>
    <Layout/>
    <TableWithCheckbox/>
    </>
  )
}

export default Inventario