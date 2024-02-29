'use client'
import React, { useState , useEffect} from 'react'
import styles from "./login.module.scss"
import Header from '../_componaten/header/Header'
import Footer from '../_componaten/footer/Footer'
export default function page({searchParams}) {
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")

  useEffect(()=>{
    setEmail(JSON.parse(localStorage.getItem("email")))
    setPassword(JSON.parse(localStorage.getItem("password")))

  },[])

  function vailided(e){
    e.preventDefault();
    if(email !=="" && password !== ""){
      if(email === localEmail && password === localPasswodr ){
        window.location="/"
      }else{
        alert("Write Email Or Password  Wrong!")
      }
    }else{
      alert("fill the inputs")
    }
  }
  return (
    <>
      <Header searchParams={searchParams}/>
      <section className={`container  ${styles.hught}`}>
          <form onSubmit={vailided} className={`${styles.form} d-flex flex-column  justify-content-center  align-items-center `} action="">
              <h3 className="text-primary mb-3">Login</h3>
              <input className={`${styles.input}`} type="email" placeholder="Your Email" id="email" onChange={(e)=>setEmail(e.target.value)}/>
              <input className={`${styles.input}`} type="password" placeholder="Your Password" id="password" onChange={(e)=>setPassword(e.target.value)}/>
              <button type="submit" className="btn btn-success mt-2" id="submit">Submit</button>
          </form>
      </section>
      <Footer searchParams={searchParams}/>
    </>
  )
}
