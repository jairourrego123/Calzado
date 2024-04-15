import './SelectedProducts.css'

function SelectedProducts({products=[]}) {
  console.log(products);
  return (
    <>
    {products && products.map((product)=>(

       <div className="stock-genius-selected-products-container" key={product.id}>
        <div className="stock-genius-selected-products">
        {product.estilo}-{product.color}-{product.talla}

        </div>
        <div className="stock-genius-selected-products-input">
        <input type="number"/>
        </div>
        
        </div>

    )
    )}
    </>
 
  )
}

export default SelectedProducts