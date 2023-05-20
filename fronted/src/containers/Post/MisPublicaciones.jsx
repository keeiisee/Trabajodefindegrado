import React, { useEffect, useMemo, useState } from 'react'
import Navbarperfil from '../Perfil/Navbarperfil';
import Navbar from '../../components/Navbar';
import { connect } from 'react-redux';
import ImagenInicio from '../../Inicio/ImagenInicio';
import PopupInicio from '../../Inicio/PopupInicio';

export const MisPublicaciones = () => {
    const [profile, setProfile] = useState("");
    const [post, setPost] = useState([]);
    const [popupImagen, setPopupImagen] = useState(null);

    const handleClick = (imagen) => {
      setPopupImagen(imagen);
    };
  
    const handleClosePopup = () => {
      setPopupImagen(null);
    };
    useEffect(() => {
        const fetchData = async () => {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`,
                }
            };
            try {
                const responseProfile = await fetch('http://localhost:8000/accounts/profile/', config);
                const dataProfile = await responseProfile.json();
                setProfile(dataProfile)
                if (dataProfile) {
                    const responsePost = await fetch(`http://localhost:8000/accounts/publicaciones/${dataProfile[0].id}/`, config);
                    const dataPost = await responsePost.json()
                    setPost(dataPost)
                }
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, []);

    const url = useMemo(() => {
        if (profile) {
            return profile[0].imagen;
        }
        return '';
    }, [profile]);

    return (

        <>

            <div className="container-fluid vh-100 h-md-50">
                <div className="row h-100">
                    <Navbarperfil imagen={url} />
                    <div className="col-md-8">
                        <br />
                        <h2>Mis fotos</h2>
                        <br />
                        <div className="App">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
                                {post.map((imagen) => (
                                    <ImagenInicio key={imagen} imagen={imagen} onClick={handleClick} />
                                ))}
                            </div>
                            {popupImagen && <PopupInicio imagen={popupImagen} onClose={handleClosePopup} />}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MisPublicaciones