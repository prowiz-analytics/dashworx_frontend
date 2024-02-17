import React, { useState } from 'react'
import logo from '../Assets/logo.svg';
import loginIcon from '../Assets/Login_icon 1.svg';
import DownArrow from '../Assets/downArrow.svg'
import { useNavigate } from 'react-router-dom';

function Header(props) {
  const {isNavigatable} = props;
  console.log(isNavigatable);
  const navigate = useNavigate();
  const [hover,setHover] =useState(false);
  return (
    <div className="w-full h-20 flex flex-row justify-between items-center p-4 profile">
        <img src={logo} alt="" className='h-14 w-[250px] rounded-sm cursor-pointer' onClick={()=>{if(isNavigatable){navigate('/dashboards')}}}/>
        <div className="w-[auto] relative h-8 bg-hoverColor text-[#ffffff] flex flex-row gap-2 mr-4 rounded-md justify-between items-center px-2 profile" onMouseOver={()=>setHover(true)} onMouseOut={()=>setHover(false)}>
            <img src={loginIcon} alt="" className='w-6 h-6' />
            <p className='font-bold'>My Account</p>
            <img src={DownArrow} alt="" />
            
        </div>
        {hover && <div className="absolute w-[157px] bg-[#D9D9D9] h-auto  mt-28 py-4 px-2 right-[48px] rounded-[10px] no-profile flex flex-col font-[600]" onMouseOver={()=>setHover(true)} onMouseOut={()=>setHover(false)}>
                <p className='cursor-pointer' onClick={()=>{if(isNavigatable){navigate('/dashboards')}}}>Home</p>    
                <p className='cursor-pointer' onClick={()=>{navigate('/login');localStorage.removeItem('data')}}>Log Out</p>    
                <p className='cursor-pointer'onClick={()=>navigate('/resetpassword')}>Change Password</p>   
        </div>}
        
    </div>
  )
}

export default Header