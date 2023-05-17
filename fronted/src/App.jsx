import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Home from './containers/Home';
import Login from './containers/Login';
import Signup from './containers/Signup';
import Activate from './containers/Activate';
import ResetPassword from './containers/ResetPassword';
import ResetPasswordConfirm from './containers/ResetPasswordConfirm';


import { Provider } from 'react-redux';
import store from './store';
import PaginaDeInicio from './containers/PaginaDeInicio';
import Perfil from './containers/Perfil/Perfil';
import NewPostForm from './containers/NewPost';
import CrearPerfil from './containers/Perfil/CrearPerfil';

const App = () => (
  <Provider store={store}>
        <Router>
              <Routes>
                    <Route path='/' element={<Home />}></Route>
                    <Route path='/login' element={<Login />}></Route>
                    <Route path='/signup' element={<Signup />}></Route>
                    <Route path='/activate' element={<Activate />}></Route>
                    <Route path='/reset-password' element={<ResetPassword />}></Route>
                    <Route path='/password/reset/confirm/:uid/:token' element={<ResetPasswordConfirm />}></Route>
                    <Route path='/paginadeinicio' element={<PaginaDeInicio />}></Route>
                    <Route path='/activate/:uid/:token' element={<Activate />}></Route>
                    <Route path='/profile' element={<Perfil />}></Route>
                    <Route path='/pp' element={<NewPostForm />}></Route>
                    <Route path='/crear-perfil' element={<CrearPerfil />}></Route>
              </Routes>
        </Router>
  </Provider>
       
);
export default App
