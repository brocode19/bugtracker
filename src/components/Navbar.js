import React from 'react'
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import logo from '../images/logo.png'
import { Container } from 'tabler-react';

function Navbar() {
  return (

    <div className='container'>
                      <aside >
              <div className='top'>
                <div className='logo'>
                  <img src={logo} alt=''/>
                  <h2>NK<span className='trouble'>Brand</span></h2>
                </div>
                <div className='close' id='close-btn'>
                <AiIcons.AiOutlineClose/>
                </div>
              </div>

              <div className='sidebar'> 

              {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path} >
                    <span className='sidebar-item'>{item.icon}</span>
                    <span className='sidebar-item'>{item.title}</span>
                  </Link>
                </li>
              );
            })}

              </div>



            </aside>  

    </div>

  )
}

export default Navbar