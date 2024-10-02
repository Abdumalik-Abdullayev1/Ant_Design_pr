import React from 'react'
import img from '../../assets/404.avif'

const Index = () => {
  return (
    <div>
      <img src={img} alt="Page not found" className='w-screen h-screen object-cover' />
    </div>
  )
}

export default Index
