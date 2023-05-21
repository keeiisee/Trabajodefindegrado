import React from 'react'
import { useSelector } from 'react-redux';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
const ImagenInicio = ({ imagen, profile, onClick }) => {
    const user = useSelector(state => state.auth.user);
    return (
        <>
            {/* <div className="border border-gray-400 rounded">
            
          <div className="bg-yellow-100 p-1 rounded-lg hover:bg-red-500">
        <img
          src={imagen.url}
          alt={imagen.descripcion}
          className="w-full h-auto cursor-pointer rounded"
          onClick={() => onClick(imagen)}
        />
      </div>
      </div> */}
            <div className="container py-5 text-white">

                <Card className="mb-3 h-100 game-card">


                    <Card.Img variant="top" className="game-image" onClick={() => onClick(imagen)} src={imagen.imagen} alt={imagen.descripcion} />

                    <Card.Body className="p-5">

                        <Card.Title className="text-gray-900 font-bold text-2xl tracking-tight mb-2">{user.name}</Card.Title>

                        <Card.Text className="font-normal text-gray-700 mb-3">{imagen.descripcion} fecha: {imagen.fecha_publicacion}</Card.Text>
                    </Card.Body>
                </Card>
                <div className="max-w-lg">
                </div>
            </div>
        </>



    );
};

export default ImagenInicio