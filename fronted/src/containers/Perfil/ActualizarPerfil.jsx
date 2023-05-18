import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { load_Idprofile, modificar_perfil } from '../../actions/auth';
import { connect } from 'react-redux';

function ActualizarPerfil({ load_Idprofile, modificar_perfil, user }) {


    const [imagen, setImagen] = useState('');
    const [logros, setLogros] = useState([]);
    const [profile, setProfile] = useState(null);
    const [descripcion, setDescripcion] = useState('');
    const opcionesLogros = ['primer logro', 'segundo logro', 'tercer  logro']
    function handleLogrosChange(e) {
        const options = e.target.options;
        const selectedValues = [];
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                selectedValues.push(options[i].value);
            }
        }
        setLogros(selectedValues);
    }
    const navigate = useNavigate();
    const handleDescripcionChange = (event) => {
        setDescripcion(event.target.value);
    };
    function handleImagenChange(event) {
        setImagen(event.target.files[0].name);
    }
    const fechData1 = async () => {
        const datosProfile = await load_Idprofile()
        return datosProfile
    }
    useEffect(() => {
        const fechData = async () => {
            const datosProfile = await load_Idprofile()
            setProfile(datosProfile)
            setDescripcion(datosProfile[0].descripcion)
        }
        fechData()
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();
        modificar_perfil(imagen, descripcion, logros, user, profile[0].id)
        navigate('/profile')
    };

    return (
        <div>
            <Navbar></Navbar>

            <div className="container py-5">
                <h1 className="mb-4">Modificar Perfil</h1>
                <form action="#" method="POST" encType="multipart/form-data">
                    <div className="mb-3">
                        <label htmlFor="imagen" className="form-label">Imagen:</label>
                        <input type="file" className="form-control" onChange={handleImagenChange} id="imagen" name="imagen" placeholder='ejemplo uno' />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="descripcion" className="form-label">Descripción:</label>
                        <textarea className="form-control" onChange={handleDescripcionChange} id="descripcion" name="descripcion" value={descripcion} rows="3"></textarea>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Logros:</label>
                        <select className="form-select" onChange={handleLogrosChange} name="logros" multiple>
                            {opcionesLogros && opcionesLogros.map((logro, key) => {
                                if (profile && profile[0].logros.includes(logro)){
                                    return <option key={key} value={logro} selected>{logro}</option>
                                } else {
                                    return <option key={key} value={logro}>{logro}</option>
                                }
                               
                            })}
                        </select>
                    </div>

                    <button type="submit" onClick={handleSubmit} className="btn btn-primary">Guardar</button>
                </form>
            </div>
        </div>
    )
}
const mapStateToProps = state => ({
    user: state.auth.user
});

export default connect(mapStateToProps, { modificar_perfil, load_Idprofile })(ActualizarPerfil);
