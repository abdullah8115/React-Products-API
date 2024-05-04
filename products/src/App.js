import './App.css';
import AddProduct from './AddProd/addproducts';
import UpdateProduct from './UpdProd/updateproduct';
import DeleteProduct from './DltProd/deleteproduct';

function App() {
  return (
    <div className="App">
      hello
      <div className='add-product'>
        <AddProduct /> 
      </div>
      <div className="row">
        <div className='column'>
          <UpdateProduct /> 
        </div>
        <div className='column'>
          <DeleteProduct /> 
        </div>
      </div>
    </div>
  );
}

export default App;