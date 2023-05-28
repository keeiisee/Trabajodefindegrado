import React from 'react';
import { HomeIcon, DocumentTextIcon, ChatAltIcon, ShoppingCartIcon, UserIcon } from '@heroicons/react/solid';

function BottomNavbar() {
    return (
        <>
                 <div className="fixed inset-x-0 bottom-0 lg:hidden flex justify-center">
        <div className="bg-white shadow-md py-4 w-full flex justify-around border-t border-gray-300">
          <div className="group">
            <HomeIcon className="h-8 w-8 text-gray-600 group-hover:text-blue-600 transition-transform duration-200 ease-in-out transform hover:-translate-y-1" />
          </div>
          <div className="group">
            <DocumentTextIcon className="h-8 w-8 text-gray-600 group-hover:text-blue-600 transition-transform duration-200 ease-in-out transform hover:-translate-y-1" />
          </div>
          <div className="group">
            <ChatAltIcon className="h-8 w-8 text-gray-600 group-hover:text-blue-600 transition-transform duration-200 ease-in-out transform hover:-translate-y-1" />
          </div>
          <div className="group">
            <ShoppingCartIcon className="h-8 w-8 text-gray-600 group-hover:text-blue-600 transition-transform duration-200 ease-in-out transform hover:-translate-y-1" />
          </div>
          <div className="group">
            <UserIcon className="h-8 w-8 text-gray-600 group-hover:text-blue-600 transition-transform duration-200 ease-in-out transform hover:-translate-y-1" />
          </div>
        </div>
      </div>
            <div className="hidden lg:flex fixed inset-x-0 top-8 justify-center">
        <div className="bg-blue-400 shadow-md py-4 px-6 rounded-lg flex space-x-10 transition-colors duration-200 ease-in-out hover:bg-gray-400">
                    <div className="group">
                        <HomeIcon className="h-8 w-8 text-gray-600 group-hover:text-blue-600 transition-transform duration-200 ease-in-out transform hover:-translate-y-1" />
                    </div>
                    <div className="group">
                        <DocumentTextIcon className="h-8 w-8 text-gray-600 group-hover:text-blue-600 transition-transform duration-200 ease-in-out transform hover:-translate-y-1" />
                    </div>
                    <div className="group">
                        <ChatAltIcon className="h-8 w-8 text-gray-600 group-hover:text-blue-600 transition-transform duration-200 ease-in-out transform hover:-translate-y-1" />
                    </div>
                    <div className="group">
                        <ShoppingCartIcon className="h-8 w-8 text-gray-600 group-hover:text-blue-600 transition-transform duration-200 ease-in-out transform hover:-translate-y-1" />
                    </div>
                    <div className="group">
                        <UserIcon className="h-8 w-8 text-gray-600 group-hover:text-blue-600 transition-transform duration-200 ease-in-out transform hover:-translate-y-1" />
                    </div>
                </div>
            </div>
        </>

    );
}

export default BottomNavbar;