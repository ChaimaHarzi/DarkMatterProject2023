/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Member from './member'
const AboutUs : React.FC=()=>{

   return(
    <section className='flex flex-col bg-white py-20 text-3xl md:text-4xl  '>
     <div className="container mx-auto px-11 relative ">
   
      
      <div className='hover-reveal container image01 absolute w-[300px] h-[400px]  top-[50%] margin-auto overflow-hidden opacity-0 scale-[0.8] '  >
        <img className='hidden-img w-full h-full object-cover relative  ' src="/logo1.png" alt=""></img>
      </div>
    </div>
     <div className="container mx-auto px-11 text-center mt-28">
        <h2 className='font-semibold'>Our Team </h2>
        <div className='mt-2'>Cosmic Architects</div>
        <div className='mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 lg:gap-20 '>

            <Member source='/oussema1.jpeg' name="Oussama Trabelsi" socialId='Project Manager' link="https://github.com/Szymon20000"/>
            <Member source='/hichem1.jpeg' name="Hichem Jabnouni" socialId='Brand Designer' link="https://github.com/Szymon20000"/>
            <Member source='/loay1.jpeg' name="Louay Sheikh" socialId='DevOps Engineer' link="https://github.com/Szymon20000"/>
            <Member source='/moataz1.jpeg' name="Moatez Saii" socialId='Product Manager' link="https://github.com/Szymon20000"/>
            <Member source='/chaima1.jpeg' name="Rahma Mestiri" socialId='Marketing Expert' link="https://github.com/Szymon20000"/> 
            <Member source='/mourad1.jpeg' name="Mourad Derwich" socialId='Full Stack Developer' link="https://github.com/Szymon20000"/>
            <Member source='/aziz1.jpeg' name="Aziz Ben Othman" socialId='AI Specialist' link="https://github.com/Szymon20000"/>
            <Member source='/rahma1.jpeg' name="Rahma Bouzid" socialId='Social Media Manager' link="https://github.com/Szymon20000"/>
            <Member source='/azza1.jpeg' name="Azza Gorrab" socialId='Advertising Director' link="https://github.com/Szymon20000"/>
            <Member source='/zouhour.jpeg' name="Zouhour Chebbi" socialId='Data Scientist' link="https://github.com/Szymon20000"/>

            
           
        </div>
     </div>
    </section>
   )
}
export default AboutUs