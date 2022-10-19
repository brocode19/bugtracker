import React from 'react'
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';

function Navbar() {
  return (
    <ul>
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
    </ul>
  )
}

export default Navbar