import React from 'react'
import Navbar from '../components/Navbar';

export const PaginaDeInicio = () => {
  return (
    <>
  <Navbar/>
  <div className="container my-4">
    <div className="row">
      <div className="col-6">
        <div className="card">
          <img src="https://picsum.photos/800/600" className="card-img-top post-image" alt="..."/>
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
  </div>
    </>
  )
}

export default PaginaDeInicio;