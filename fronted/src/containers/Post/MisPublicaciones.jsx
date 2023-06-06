import React, { useEffect, useMemo, useState } from 'react'
import Post1 from './Post1';

export const MisPublicaciones = () => {
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
                const responseProfile = await fetch('https://trabajodefindegrado-production-1dd0.up.railway.app/accounts/profile/', config);
                const dataProfile = await responseProfile.json();

                if (dataProfile) {
                    const responsePost = await fetch(`https://trabajodefindegrado-production-1dd0.up.railway.app/accounts/publicaciones/${dataProfile[0].id}/`, config);
                    const dataPost = await responsePost.json()
                    setPost(dataPost)
                }
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, []);

    return (

        <>

            {post.length <= 0 && (
                <div className="mt-20 ml-20 mr-20 mb-20 text-center animate-bounce">
                    <h1 className="text-4xl font-bold text-gray-700 animate-pulse">No hay publicaciones que ver</h1>
                    <p className="mt-4 text-gray-500">Lo sentimos, no hay contenido disponible en este momento.</p>
                </div>
            )}

            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8">
                        {post.map((post) => (
                            <div
                                key={post.id}
                                className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                            >
                                <Post1 imagen={post} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </>
    )
}

export default MisPublicaciones