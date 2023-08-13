import {PayPalScriptProvider} from '@paypal/react-paypal-js'
import {useRoutes,HashRouter} from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import RootLayout from './components/RootLayout';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import EditProductScreen from './screens/EditProductScreen';
import OrderListScreen from './screens/OrderListScreen';

const RouterComponent=()=> {
  const routes = useRoutes([
    {path: '/',
      element: <RootLayout/>,
      children : [
        {path:'/', element: <HomeScreen/>},
        {path:'/login', element:<LoginScreen/>},
        {path:'/register', element:<RegisterScreen/>},
        {path:'/profile', element:<ProfileScreen/>},
        {path:'/shipping', element:<ShippingScreen/>},
        {path:'/placeorder', element:<PlaceOrderScreen/>},
        {path:'/order/:id', element:<OrderScreen/>},
        {path:'/payment', element:<PaymentScreen/>},
        {path:'/product/:id', element: <ProductScreen/>},
        {path:'/cart/:id?', element: <CartScreen/>},
        {path:'/admin/userlist',element:<UserListScreen/>}, 
        {path:'/admin/user/:id/edit',element:<UserEditScreen/>},
        {path:'/admin/productlist/',element:<ProductListScreen/>},
        {path:'/admin/product/:id/edit',element:<EditProductScreen/>},    
        {path:'/admin/orderlist',element:<OrderListScreen/>},
      ]}
   ])
  return routes
};

function App() {
  return (
    <main>
      
      <PayPalScriptProvider options={{"client-id":"AdFwOwBeOtYu1Xmq0gUlBVlYIDrwNPMdmjqgrjEm_q-DRPgKHTRLrAOHo0P1-rm6h6U2kHgESUDo4xfx",
                                      components: "buttons",
                                      currency: "USD"}}>
        <RouterComponent/>
      </PayPalScriptProvider>
      
    </main>   
  )
}

export default App;
