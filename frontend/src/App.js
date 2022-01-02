import Footer from "./components/Footer";
import Header from "./components/Header";

import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import WishlistScreen from './screens/WishlistScreen'

import OrderScreen from './screens/OrderScreen'

import LoginScreen from './screens/AccountScreens/LoginScreen'
import RegisterScreen from './screens/AccountScreens/RegisterScreen'
import ActivateScreen from './screens/AccountScreens/ActivateScreen';



import ResetPasswordScreen from './screens/AccountScreens/ResetPasswordScreen';
import ResetPasswordConfirmScreen from './screens/AccountScreens/ResetPasswordConfirmScreen';


import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'


import OrderListScreen from './screens/OrderListScreen'


import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'

import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'

import CategoricallyProductsScreen from "./screens/CategoricallyProductsScreen";
import CategoryListScreen from './screens/CategoryListScreen';
import CategoryEditScreen from './screens/CategoryEditScreen';
import HowToPayScreen from './screens/HowToPayScreen.js';

import ContactUsScreen from './screens/BlogScreens/ContactUsScreen.js';
import AboutUsScreen from './screens/BlogScreens/AboutUsScreen.js';
import FAQScreen from './screens/BlogScreens/FAQScreen'
import PrivacyPolicyScreen from './screens/BlogScreens/PrivacyPolicyScreen'
import TermsAndConditionsScreen from './screens/BlogScreens/TermsAndConditionsScreen'
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, useLocation } from 'react-router-dom'
// import sidebar from ''


function App() {

  return (
    <Router>
      <Header />

      <Route path='/about-us' component={AboutUsScreen} />
      <Route path='/contact-us' component={ContactUsScreen} />
      <Route path='/faqs' component={FAQScreen} />
      <Route path='/privacy-policy' component={PrivacyPolicyScreen} />
      <Route path='/terms-and-conditions' component={TermsAndConditionsScreen} />


      <main className="py-3">
        <Container>
          <Route path="/" component={HomeScreen} exact />
         

          <Route path="/category/:id" component={CategoricallyProductsScreen} exact />

          <Route path="/login" component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/activate/:id/:token' component={ActivateScreen} />


          <Route path='/reset-password' component={ResetPasswordScreen} />
          <Route path='/password/reset/confirm/:id/:token' component={ResetPasswordConfirmScreen} />


          <Route path='/profile' component={ProfileScreen} />
          <Route path='/shipping' component={ShippingScreen} />
          <Route path='/payment' component={PaymentScreen} />

          <Route path='/placeorder' component={PlaceOrderScreen} />
          <Route path='/how-to-pay' component={HowToPayScreen} />
          <Route path='/order/:id' component={OrderScreen} />

          <Route path='/admin/userlist' component={UserListScreen} />
          <Route path='/admin/user/:id/edit' component={UserEditScreen} />
          <Route path='/admin/productlist' component={ProductListScreen} />
          <Route path='/admin/orderlist' component={OrderListScreen} />

          <Route path="/admin/categorylist" component={CategoryListScreen} />
          <Route path="/admin/categorylist/:id/edit" component={CategoryEditScreen} />



          <Route path="/product/:id" component={ProductScreen} />
          <Route path='/admin/product/:id/edit' component={ProductEditScreen} />



          <Route path='/wishlist/:id?' component={WishlistScreen} />
          <Route path="/cart/:id?" component={CartScreen} />







        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
