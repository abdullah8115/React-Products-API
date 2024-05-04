import './App.css';
import AddProduct from './AddProd/addproducts';
import UpdateProduct from './UpdProd/updateproduct';

function App() {
  return (
    <>
    <div className="App">
      hello
    </div>
    <div className='add-product'>
    <AddProduct /> 
    </div>
    <div className='upd-product'>
    <UpdateProduct /> 
    </div>
    </>
  );
}

export default App;