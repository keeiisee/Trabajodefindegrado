import React, { useState } from 'react'
import { PublicacionDeOtro } from '../Post/PublicacionDeOtro';
import MisMeGusta from '../Post/MisMeGusta';

const TabSelectorOtro = () => {
    const [activeTab, setActiveTab] = useState('publications');

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
            <div className="button-container mt-10 flex justify-center">
                <button
                    onClick={() => {
                        handleClick('publications');
                        scrollToButtons();
                    }}
                    className={`px-4 py-2 mx-2 border-2 rounded ${activeTab === 'publications' ? 'border-indigo-500 text-indigo-500' : 'border-gray-300 text-gray-500'
                        }`}
                >
                    Sus publicaciones
                </button>
                <button
                    onClick={() => {
                        handleClick('likes');
                        scrollToButtons();
                    }}
                    className={`px-4 py-2 mx-2 border-2 rounded ${activeTab === 'likes' ? 'border-indigo-500 text-indigo-500' : 'border-gray-300 text-gray-500'
                        }`}
                >
                    Sus me gusta
                </button>
            </div>
            {activeTab === 'publications' && <PublicacionDeOtro />}
            {activeTab === 'likes' && <MisMeGusta />}
        </>

    );
};

export default TabSelectorOtro