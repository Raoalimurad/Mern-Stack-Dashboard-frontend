
import './App.css';
import Footer from './components/footer';
import Navbar from './components/navbar';
import { BrowserRouter,Routes ,Route} from 'react-router-dom';
import SinUp from './components/signUp';
import PrivateComponents from './components/privateComponents';
import AddProduct from './components/addProduct';
import Update from './components/update';
import Product from './components/product';
import Login from './components/login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
       {/* making routes here */}
       <Routes>

        <Route element={<PrivateComponents/>}>
        <Route path='/' element={<Product/>} />
        <Route path='/add' element={<AddProduct/>} />
        <Route path='/update/:id' element={<Update/>} />
        <Route path='/logout' element={<h1>logout page</h1>} />
        </Route>

        <Route path='/signup' element={<SinUp/>} />
        <Route path='/login' element={<Login/>}/>
       </Routes>




      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
