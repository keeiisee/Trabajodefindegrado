import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import ImagenInicio from '../Inicio/ImagenInicio';
import imagenesInicio from '../Inicio/imagenesInicio.json';
import PopupInicio from '../Inicio/PopupInicio';

export const PaginaDeInicio = () => {

  const [popupImagen, setPopupImagen] = useState(null);

  const handleClick = (imagen) => {
    setPopupImagen(imagen);
  };

  const handleClosePopup = () => {
    setPopupImagen(null);
  };

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
        if (dataProfile && dataProfile.length > 0) {
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


  // Aquí irá el código para mostrar las imágenes y el popup
  return (
    <>
      {/* <div className="container my-4">
        <div className="row">
          <div className="col-6">
            <div className="card">
              <img src="https://picsum.photos/800/600" className="card-img-top post-image" alt="..." />
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className="post-like me-3">
                    <a href="#">
                      <i className="far fa-heart"></i>
                    </a>
                    <div className="post-comment me-3">
                      <a href="#">
                        <i className="far fa-comment"></i>
                      </a>
                    </div>
                    <div className="post-bookmark">
                      <a href="#">
                        <i className="far fa-bookmark"></i>
                      </a>
                    </div>
                  </div>
                  <h5 className="card-title my-3">Título de la publicación</h5>
                  <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor nisi libero, nec dictum neque bibendum quis. Sed et sapien euismod, ornare libero et, euismod nibh. In hac habitasse platea dictumst.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <div className="App">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
          {post.map((imagen) => (
            <ImagenInicio key={imagen.id} imagen={imagen} onClick={handleClick} />
          ))}
        </div>
        {popupImagen && <PopupInicio imagen={popupImagen} onClose={handleClosePopup} />}
      </div>
    </>
  )
}
export default PaginaDeInicio;