import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { deleted_user, load_Idprofile, modificar_perfil } from '../../actions/auth';
import { useDispatch, useSelector } from 'react-redux';
import Navbarperfil from './Navbarperfil';
import { NavbarSuperPerfil } from '../../components/NavbarSuperPerfil';

function ActualizarPerfil() {
    const user = useSelector(state => state.auth.user);
    const [logros, setLogros] = useState([]);
    const [profile, setProfile] = useState('');
    const opcionesLogros = ['primer logro', 'segundo logro', 'tercer  logro']
    const navigate = useNavigate();
    const dispatch = useDispatch()
    // function handleLogrosChange(e) {
    //     const options = e.target.options;
    //     const selectedValues = [];
    //     for (let i = 0; i < options.length; i++) {
    //         if (options[i].selected) {
    //             selectedValues.push(options[i].value);
    //         }
    //     }
    //     setLogros(selectedValues);
    // }
    
    const onChange = e => {
        if (e.target.type === 'file') {
          setFormData({ ...formData, [e.target.name]: e.target.files[0] });
        } else {
          setFormData({ ...formData, [e.target.name]: e.target.value });
        }
      };
      const [formData, setFormData] = useState({
        descripcion: '',
        imagen: null
      });
      const { descripcion, imagen } = formData;
    useEffect(() => {
        const fechData = async () => {
            const datosProfile = await dispatch(load_Idprofile())
            setProfile(datosProfile)
            setFormData({...formData, ["descripcion"]:datosProfile[0].descripcion})
        }
        fechData()
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();
        dispatch(modificar_perfil(imagen, descripcion, user))
        navigate('/profile')
    };

    function sacarAvisoEliminar(e){
        e.preventDefault()
        console.log("er")
        dispatch(deleted_user())
        navigate('/')
    }

    return (
        <>
        <NavbarSuperPerfil/>
        <div>
        <div className="sm:ml-64 mr-6">
                <div className="p-4 ml-6 sm:ml-14 border-4 nav-border bg-marron rounded-lg dark:border-gray-700">
                    <div className="col-md-8">
                        <br />
                    <h2 className="mb-4">Modificar Perfil</h2>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="imagen" className="form-label">Imagen:</label>
                            <input type="file" className="form-control" onChange={(e) => onChange(e)} id="imagen" name="imagen" placeholder='ejemplo uno' />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="descripcion" className="form-label">Descripción:</label>
                            <textarea type="text" className="form-control" onChange={(e) => onChange(e)} id="descripcion" name="descripcion" value={descripcion} rows="3"></textarea>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Logros:</label>
                            <select className="form-select" onChange={(e) => onChange(e)} name="logros" multiple>
                                {opcionesLogros && opcionesLogros.map((logro, key) => {
                                    if (profile && profile[0].logros.includes(logro)) {
                                        return <option key={key} value={logro} selected>{logro}</option>
                                    } else {
                                        return <option key={key} value={logro}>{logro}</option>
                                    }

                                })}
                            </select>
                        </div>

                        <button type="submit" onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">Guardar</button>
                    </form>
                    <button
                className="mt-2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
                onClick={(e) => { sacarAvisoEliminar(e) }}
              >Eliminar Cuenta</button>
                </div>
            </div>
        </div>
        </div>
        </>
        
    )
}

export default ActualizarPerfil;
