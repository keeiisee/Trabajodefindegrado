import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './containers/Home';
import Activate from './containers/Activate';
import ResetPassword from './containers/ResetPassword';
import ResetPasswordConfirm from './containers/ResetPasswordConfirm';


import { Provider } from 'react-redux';
import store from './store';
import PaginaDeInicio from './containers/PaginaDeInicio';
import Perfil from './containers/Perfil/Perfil';
import NewPostForm from './containers/NewPost';
import CrearPerfil from './containers/Perfil/CrearPerfil';
import { Navbar } from './components/Navbar';
import { UserProvider } from './provider/ProviderContext';
import ConPerfil from './containers/Perfil/ConPerfil';
import ActualizarPerfil from './containers/Perfil/ActualizarPerfil';
import { PerfilDeOtro } from './containers/Perfil/PerfilDeOtro';


const App = () => {

      return (
            <UserProvider>
                  <Provider store={store}>
                        <Router>
                              <Routes>
                                    <Route path='/' element={<Home />}></Route>
                                    <Route path='/login' element={<Home />}></Route>
                                    <Route path='/signup' element={<Home />}></Route>
                                    <Route path='/activate' element={<Activate />}></Route>
                                    <Route path='/reset-password' element={<ResetPassword />}></Route>
                                    <Route path='/password/reset/confirm/:uid/:token' element={<ResetPasswordConfirm />}></Route>
                                    <Route path='/paginadeinicio' element={<PaginaDeInicio />}></Route>
                                    <Route path='/activate/:uid/:token' element={<Activate />}></Route>
                                    <Route path='/profile' element={<ConPerfil />}></Route>
                                    <Route path='/pp' element={<NewPostForm />}></Route>
                                    <Route path='/crear-perfil' element={<CrearPerfil />}></Route>
                                    <Route path='/profile/modificar-perfil' element={<ActualizarPerfil />}></Route>
                                    <Route path='/perfil/:id' element={<PerfilDeOtro />}></Route>
                              </Routes>
                        </Router>
                  </Provider>
            </UserProvider>
      )
};
export default App
