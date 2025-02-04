import React from 'react'
import { useSelector } from 'react-redux'

const About = () => {

  const theme = useSelector(state => state.theme.theme);

  return (
    <section className='about pad-start flex justify-center items-center my-20'>
        <div className='container flex flex-col justify-center items-center  gap-10'>
      <h2 className={`md:text-7xl text-3xl text-neutral-700 font-bold ${theme === 'dark' && 'text-white'}`}>We love <span className='bg-blue-600 text-white p-2 rounded-2xl px-5'>Vkand</span>  </h2>
      <p className='md:w-1/2'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam itaque ea natus a impedit sed libero voluptate reiciendis modi quis iure quod vel explicabo iste minus, reprehenderit earum mollitia! Architecto reprehenderit earum sit sed soluta deleniti accusantium incidunt corporis nulla ab sapiente harum itaque magnam facere totam necessitatibus, hic beatae.
      </p>
        </div>
    </section>
  )
}

export default About