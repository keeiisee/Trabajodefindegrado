import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, Link } from 'react-router-dom';
import Activate from './containers/Activate';
import ResetPassword from './containers/ResetPassword';
import ResetPasswordConfirm from './containers/ResetPasswordConfirm';

import { Provider } from 'react-redux';
import store from './store';
import PaginaDeInicio from './containers/PaginaDeInicio';
import CrearPerfil from './containers/Perfil/CrearPerfil';
import { UserProvider } from './provider/ProviderContext';
import ConPerfil from './containers/Perfil/ConPerfil';
import ActualizarPerfil from './containers/Perfil/ActualizarPerfil';
import PerfilDeOtro from './containers/Perfil/PerfilDeOtro';
import NewPost from './containers/Post/NewPost';
import MisPublicaciones from './containers/Post/MisPublicaciones';
import { Error403 } from './Error403';
import Layout from './hocs/Layout';
import { useSelector } from 'react-redux';
import { Navbarhome } from './containers/Home/Navbarhome';
import { NotiRecibidas } from './containers/Notificaciones/NotiRecibidas';
import { PublicacionDeOtro } from './containers/Post/PublicacionDeOtro';
import { Parques } from './parque/Parques';
import { MisAmigos } from './containers/Perfil/MisAmigos';
import LocationForm from './parque/LocationForm';
import MisMeGusta from './containers/Post/MisMeGusta';

export const PrivateRoute = ({ children }) => {
      //const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
      var isAuthenticated = true;

      if (isAuthenticated) {
            return children
      }

      return window.location.replace('/error403');
}

const App = () => {

      return (
            <UserProvider>
                  <Provider store={store}>
                        <Router>
                              <Layout>
                                    <Routes>
                                          <Route path='/error403' element={<Error403 />}></Route>
                                          <Route path='/' element={<Navbarhome />}></Route>
                                          <Route path='/activate' element={<Activate />}></Route>
                                          <Route path='/reset-password' element={<ResetPassword />}></Route>
                                          <Route path='/password/reset/confirm/:uid/:token' element={<ResetPasswordConfirm />}></Route>
                                          <Route path='/paginadeinicio' element={<PrivateRoute><PaginaDeInicio /></PrivateRoute>}></Route>
                                          <Route path='/activate/:uid/:token' element={<Activate />}></Route>
                                          <Route path='/profile' element={<PrivateRoute><ConPerfil /></PrivateRoute>}></Route>
                                          <Route path='/crear-perfil' element={<PrivateRoute><CrearPerfil /></PrivateRoute>}></Route>
                                          <Route path='/profile/modificar-perfil' element={<PrivateRoute><ActualizarPerfil /></PrivateRoute>}></Route>
                                          <Route path='/perfil/:id' element={<PrivateRoute><PerfilDeOtro /></PrivateRoute>}></Route>
                                          <Route path='/profile/crear-post' element={<PrivateRoute><NewPost /></PrivateRoute>}></Route>
                                          <Route path='/profile/mispublicaciones' element={<PrivateRoute><MisPublicaciones /></PrivateRoute>}></Route>
                                          <Route path='/suspublicaciones/:id' element={<PrivateRoute><PublicacionDeOtro /></PrivateRoute>}></Route>
                                          <Route path='/profile/notificaciones-recibidas' element={<PrivateRoute><NotiRecibidas /></PrivateRoute>}></Route>
                                          <Route path='/parques' element={<Parques />}></Route>
                                          <Route path='/FiltroParques' element={<LocationForm />}></Route>
                                          <Route path='/misAmigos' element={<MisAmigos />}></Route>
                                          <Route path='/profile/misMeGusta' element={<MisMeGusta />}></Route>

                                    </Routes>
                              </Layout>
                        </Router>
                  </Provider>
            </UserProvider>
      )
};

export default App
