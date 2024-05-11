import React, { useEffect, useState, useRef } from 'react'
import { useDispatchCart, useCart } from './ContextReducer';
import { useNavigate } from 'react-router-dom'


export default function Card(props) {
  let navigate = useNavigate()
let dispatch = useDispatchCart();
let data = useCart();
let foodItems = props.item;
const priceRef = useRef();
  let options = props.options;
  let priceOptions = Object.keys(options);
  const [qty, setQty]= useState(1)
  const [size, setSize]= useState("")
  const handleClick = () => {
    // if (!localStorage.getItem("token")) {
    //   navigate("/entry")
    // }
  }
  const handleQty = (e) => {
    setQty(e.target.value);
  }
  const handleOptions = (e) => {
    setSize(e.target.value);
  }
// let foodItems = props.foodItem;
const handleAddToCart = async ()=>{
 

    await dispatch({type: "ADD", id:props.foodItems._id, name:props.foodItems.name, price: finalPrice, qty: qty, size: size})
 console.log(data);
}


useEffect(()=>{
  setSize(priceRef.current.value)
}, [])

let  finalPrice = qty * parseInt(options[size]);

  return (
    <div><div><div className="card" style={{"width": "18rem"}}>
    <img src={props.foodItems.img} className="card-img-top" alt="..." style={{height: "120px", objectFit: "fill"}}/>
    <div className="card-body">
      <h5 className="card-title">{props.foodItems.name}</h5>

      <div className='container w-100'>
        <select className='m-2 h-100  bg-success rounded' onClick={handleClick} onChange={handleQty}>
          {Array.from(Array(6),(e,i)=>{
            return (
              <option key={i+1} value={i+1}> {i+1}</option>
            )
          })}
        </select>
  
        <select className='m-2 h-100  bg-success rounded' ref={priceRef} onClick={handleClick} onChange={(e)=> setSize(e.target.value)}>
          {priceOptions.map((i)=>{
             return <option key={i} value={i}>{i}</option>
          })}
  
        </select>
        <div className='d-inline h-100 fs-5'>
              {finalPrice}/-
        </div>
      </div>
      <hr>

      </hr>
      <button className= { 'btn btn-success justify-center ms-2 '} onClick={handleAddToCart}>Add to Cart</button>
    </div>
  </div></div></div>
  )
}



