import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import logo from '../images/logo.png'
import { IconContext } from 'react-icons';

function Navbar() {

    const [isActive, setIsActive] = useState(false);

    const handleClick = () => {
      // 👇️ toggle
      setIsActive(current => !current);
  
      // 👇️ or set to true
      // setIsActive(true);
    };


  return (

    <>
                          <aside style={{
          display: isActive ? 'block' : '',
          
        }}>
              <div className='top'>
                <div className='logo'>
                  <img src={logo} alt=''/>
                  <h2>NK<span className='trouble'>Brand</span></h2>
                </div>
                <IconContext.Provider
                value={{ color: 'black', size:'2em' }}>
                <div className='close' id='close-btn'>
                <AiIcons.AiOutlineClose onClick={handleClick}/>
                </div>
                </IconContext.Provider>

              </div>

              <div className='sidebar'> 

              <IconContext.Provider
                value={{ color: '#ff7782' }}
                >

              {SidebarData.map((item, index) => {
              return (
                <h2 key={index} className={item.cName}>
                  <Link
                  style={{textDecoration:"none"}}
                   to={item.path} >
                    <span className='sidebar-item'>{item.icon}</span>
                    <span className='sidebar-item'>{item.title}</span>
                  </Link>
                </h2>
              );
            })}

            </IconContext.Provider>

              </div>



            </aside>  

            <div className='nav-bar'>

            <IconContext.Provider
                value={{ color: 'black', size:'2em' }}
                
                >
                <div className='menu-bars'>                       
                    <Link to='#' className='menu-bars'><FaIcons.FaBars onClick={handleClick}/></Link>
                    </div>
                </IconContext.Provider>

                <div className='user-info'>
            
                <div className='profile'>
                    <div className='infor'>
                        <p>hey, <b>Tinashe</b> </p>
    
                    </div>
                    <div className='profile-photo'>
                        <img src={logo} alt='profile pic'/>
                    </div>
                </div>
                    


                </div>
               
            </div>
    </>






  )
}

export default Navbar