import React from 'react';

import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Activate from './containers/Activate';
import ResetPassword from './containers/ResetPassword';
import ResetPasswordConfirm from './containers/ResetPasswordConfirm';
import 'animate.css/animate.min.css';
import { Provider } from 'react-redux';
import store from './store';
import CrearPerfil from './containers/Perfil/CrearPerfil';
import { UserProvider } from './provider/ProviderContext';
import ConPerfil from './containers/Perfil/ConPerfil';
import MisPublicaciones from './containers/Post/MisPublicaciones';
import { Error403 } from './Error403';
import Layout from './hocs/Layout';
import { Navbarhome } from './containers/Home/Navbarhome';
import { Parques } from './parque/Parques';
import MisMeGusta from './containers/Post/MisMeGusta';
import NewPostForm from './containers/Post/NewPostForm';
import PaginaDeInicio1 from './containers/PaginaDeInicio1';
import PerfilDeOtro1 from './containers/Perfil/PerfilDeOtro1';
import CrearRutina from './containers/Rutinas/CrearRutina';
import Medio from './containers/Rutinas/Medio';


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
                                          <Route path='/paginadeinicio' element={<PrivateRoute><PaginaDeInicio1 /></PrivateRoute>}></Route>
                                          <Route path='/activate/:uid/:token' element={<Activate />}></Route>
                                          {/* <Route path='/profile' element={<PrivateRoute><Navbar /></PrivateRoute>}></Route> */}
                                          <Route path='/crear-perfil' element={<PrivateRoute><CrearPerfil /></PrivateRoute>}></Route>
                                          <Route path='/perfil/:id' element={<PrivateRoute><PerfilDeOtro1 /></PrivateRoute>}></Route>
                                          <Route path='/perfilPorimg/:id' element={<PrivateRoute><PerfilDeOtro1 /></PrivateRoute>}></Route>
                                          <Route path='/profile/crear-post' element={<PrivateRoute><NewPostForm /></PrivateRoute>}></Route>
                                          <Route path='/profile/mispublicaciones' element={<PrivateRoute><MisPublicaciones /></PrivateRoute>}></Route>
                                          <Route path='/crearRutina' element={<CrearRutina />}></Route>
                                          <Route path='/parques' element={<Parques />}></Route>
                                          <Route path='/profile/misMeGusta' element={<MisMeGusta />}></Route>
                                    </Routes>
                              </Layout>
                        </Router>
                  </Provider>
            </UserProvider>
      )
};

export default App
