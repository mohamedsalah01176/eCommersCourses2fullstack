'use client'
import React, { useState } from 'react'
import styles from "./register.module.scss"
import Header from '../_componaten/header/Header'
import Footer from '../_componaten/footer/Footer'
export default function page({searchParams}) {
  const [userName,setUserName]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [image,setImage]=useState("")



  
  


  console.log(userName)
  function valided(e){
    e.preventDefault();
    localStorage.setItem("userName",JSON.stringify(userName))
    localStorage.setItem("email",JSON.stringify(email))
    localStorage.setItem("password",JSON.stringify(password))
    localStorage.setItem("image",image)


    if(email !=="" && password !== ""  && userName !== ""){
      window.location="/"
      
    }else{
      alert("fill the inputs")
    }
  }

  function imageUrl(file){
    let reader=new FileReader()
    reader.readAsDataURL(file)
    reader.onload=function(){
        setImage(reader.result)
    }
  }
  let file;
  return (
    <>
      <Header searchParams= {searchParams}/>
      <section className={`container  ${styles.hught}`}>
          <form  onSubmit={valided} className={`${styles.form} d-flex flex-column  justify-content-center  align-items-center `} action="">
              <h3 className="text-primary mb-3">Register</h3>
              <input className={`${styles.input}`} type="text" placeholder="Your UserName" onChange={(e)=>setUserName(e.target.value)} />
              <input className={`${styles.input}`} type="email" placeholder="Your Email" onChange={(e)=>setEmail(e.target.value)} />
              {/* <input className={`${styles.input}`} type="file" placeholder="Your image" onChange={(e)=>console.log(e)} /> */}
              <input className={`${styles.input}`} type="password" placeholder="Your Password" onChange={(e)=>setPassword(e.target.value)} />
              <button type="submit" className="btn btn-success mt-2" >Submit</button>
          </form>
      </section>
      <Footer searchParams={searchParams}/>
    </>
  )
}
