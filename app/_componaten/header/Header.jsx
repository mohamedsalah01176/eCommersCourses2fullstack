"use client"
import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import styles from "./header.module.scss"
// import { useUser } from '@clerk/nextjs';
// import { UserButton } from "@clerk/nextjs";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import CartDetails from '../cartDedails/CartDetails';
import { CartContext } from '../../_context/CartContext';


export default function Header({searchParams}) {

  const apiKey=process.env.NEXT_PUBLIC_REST_API_KEY

  let [openCart,setOpenCart]=useState()

  function openCartfun(){
    if(openCart === true){
      setOpenCart(false)
    }else{
      setOpenCart(true)
      
    }
  }
  

  // const [userin,setuserin]=useState (false)
  // const [userup,setuserup]=useState (false)

  const [userlocation,setUserlocation]=useState(false)
  
  useEffect(()=>{
    // setuserin(window.location.href.toString().includes('sign-in'))
    // setuserup(window.location.href.toString().includes('sign-up'))
    setUserlocation(searchParams.toString().includes("login"))
  },[])
 
  // const {user}=useUser()


  // let userName=''
  // let localEmail=''
  // let localPasswodr=''
  // if(typeof window !== 'undefined'){
  //   userName=JSON.parse(localStorage.getItem('userName'))
  //   localEmail=JSON.parse(localStorage.getItem("email"))
  //   localPasswodr=JSON.parse(localStorage.getItem("password") )
  // } 

  const  [userName, setUserName] = useState("")
  const  [localEmail, setEmail] = useState("")
  const  [localPasswodr, setPassword] = useState("")
  
  useEffect(()=>{
    setUserName(JSON.parse(localStorage.getItem("userName")))
    setEmail(JSON.parse(localStorage.getItem("email")))
    setPassword(JSON.parse(localStorage.getItem("password")))

  },[])
  // console.log(user.fullName)
  const {card,setCard}=useContext(CartContext)
  console.log("kkklk",card)
  useEffect(()=>{
    if(localEmail && localPasswodr){
      getCard()
    }
  },[])

  async function getCard(){
    await axios.create({baseURL:`http://localhost:1337/api`,headers:{Authorization:`Bearer  ${apiKey}`}})
    .get(`/cards?populate[products][populate]=image&filters[email][$eq]=${localEmail}`)
    .then(res=>{res.data.data.forEach(citem=>{
      setCard((oldCard)=>[
        ...oldCard,
        {
          id:citem.id,
          product:citem.attributes.products.data[0]
        }
      ])

    })
  })
  
  }
  function logout(){
    localStorage.removeItem("userName")
    localStorage.removeItem("email")
    localStorage.removeItem("password")
    window.location.reload()
  }
  
  if(!userlocation){ 
    return  (
  
      <Navbar expand='md'    className="bg-body-tertiary shadow " >
        <Container >
          <Link className={`${styles.logo} fs-1 mx-2`} href="/">MS</Link>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0" 
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Link href="/" className={` ${styles.link} ms-2`}>Home</Link>
              <Link href="#explore" className={` ${styles.link} ms-2`}>Eplore</Link>
              <Link href="#projrct" className={` ${styles.link} ms-2`}>Projects</Link>
              <Link href="#about" className={` ${styles.link} ms-2`}>About US</Link>
              <Link href="#contact" className={` ${styles.link} ms-2`}>Conatct US</Link>
              
            </Nav>
            
          </Navbar.Collapse>
          {!localEmail && !localPasswodr?
          <>
          <Link className='btn btn-success ' href={"../../login"}> Login</Link>
          <Link className='btn btn-primary ms-1' href={"../../register"}> Regiter</Link>
          </>
          :
          <div className="h-screen d-flex gap-2 " style={{position:"relative"}}>
            <h3 onClick={()=>{console.log(openCart); openCartfun()}} style={{cursor:"pointer"}}><ShoppingCartIcon/>({card.length})</h3>
            {openCart === true?<CartDetails  />:" "}
            
            <h5>{userName}</h5>
            <div className='btn btn-danger' onClick={logout}>logout</div>

          </div>
          }
        </Container>
      </Navbar>
  
    )
  }
}
