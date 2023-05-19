import React, { useEffect, useMemo, useState } from 'react'
import Navbarperfil from '../Perfil/Navbarperfil';
import Navbar from '../../components/Navbar';
import { connect } from 'react-redux';

export const MisPublicaciones = () => {
    const [profile, setProfile] = useState("");
    const [post, setPost] = useState([]);
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
            <Navbar />
            <div className="container-fluid vh-100 h-md-50">
                <div className="row h-100">
                    <Navbarperfil imagen={url}/>
                    <div className="col-md-8">
                        <br />
                        <h2>Mis fotos</h2>
                        <br />
                        <div className="row row-cols-1 row-cols-md-3 g-4">
                            
                            {post && post.map((img, key) => {
                                return <>
                                    <div key={key} className="col">
                                        <div className="card">
                                            <img src={img.imagen} className="card-img-top" alt="Foto 3" />
                                        </div>
                                    </div>
                                </>

                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MisPublicaciones