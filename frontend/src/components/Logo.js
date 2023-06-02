import React from 'react';

const Logo = ({title}) => {
  return (
    <p className='logo' style={logoStyle}>{title}</p>
  )
}

const logoStyle = {
    margin: '0',
    fontSize: '30px',
    letterSpacing: '2px',
    fontWeight: '700',
    textShadow: '2px 2px 0 rgba(0,0,0,0.3)'
}

export default Logo