import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/Footer';

const Authlayout = () => {
    return (
        <div className='flex flex-col min-h-screen'>
          <header><Navbar></Navbar></header>
          <main className='bg-gray-100 grow'><Outlet></Outlet></main>
          <footer><Footer></Footer></footer>
               
        </div>
    );
};

export default Authlayout;