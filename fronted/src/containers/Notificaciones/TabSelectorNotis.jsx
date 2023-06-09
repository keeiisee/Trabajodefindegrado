import React, { useState } from 'react'
import ListaDePEtionDeAmistad from './ListaDePEtionDeAmistad';


const TabSelectorNotis = () => {
    const [activeTab, setActiveTab] = useState('amistad');

    const handleClick = (tab) => {
        setActiveTab(tab);
    };
    //puede que lo quite, en ese caso hay que cambiar el div de abajo por el siguiente <div className="mt-10 flex justify-center">
    const scrollToButtons = () => {
        const scrollOptions = {
          top: document.querySelector('.button-container').getBoundingClientRect().top + window.pageYOffset,
          behavior: 'smooth',
        };
      
        window.scrollTo(scrollOptions);
      };
    return (
        <>
            <div className="button-container mt-10 flex justify-center mb-10">
                <button
                    onClick={() => {
                        handleClick('amistad');
                        scrollToButtons();
                    }}
                    className={`px-4 py-2 mx-2 border-2 rounded ${activeTab === 'amistad' ? 'border-indigo-500 text-indigo-500' : 'border-gray-300 text-gray-500'
                        }`}
                >
                    Solicitudes de amistad
                </button>
                {/* <button
                    onClick={() => {
                        handleClick('likes');
                        scrollToButtons();
                    }}
                    className={`px-4 py-2 mx-2 border-2 rounded ${activeTab === 'likes' ? 'border-indigo-500 text-indigo-500' : 'border-gray-300 text-gray-500'
                        }`}
                >
                    Me gustas recibidos
                </button> */}
            </div>
            {activeTab === 'amistad' && <ListaDePEtionDeAmistad/>}
            {activeTab === 'likes' && <MisMeGusta />}
        </>

    );
};
export default TabSelectorNotis