import React from 'react'

export const Perfil = () => {
  return (
    <>
    <div class="container my-4">
        <div class="row">
        <div class="col-6">
            <div class="card">
            <img src="https://picsum.photos/800/600" class="card-img-top post-image" alt="..."/>
            <div class="card-body">
                <div class="d-flex align-items-center">
                <div class="post-like me-3">
                    <a href="#">
                    <i class="far fa-heart"></i>
                    </a>
                <div class="post-comment me-3">
                    <a href="#">
                    <i class="far fa-comment"></i>
                    </a>
                </div>
                <div class="post-bookmark">
                    <a href="#">
                    <i class="far fa-bookmark"></i>
                    </a>
                </div>
                </div>
                <h5 class="card-title my-3">Título de la publicación</h5>
                <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor nisi libero, nec dictum neque bibendum quis. Sed et sapien euismod, ornare libero et, euismod nibh. In hac habitasse platea dictumst.</p>
            </div>
            </div>
        </div>
        </div>
    </div>
    </>
  )
}
