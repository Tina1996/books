import React,{useEffect,useContext, useState} from 'react'
import {UserContext} from '../../App'
import M from 'materialize-css'
import {Link} from 'react-router-dom'

const Cart = () => {

    const {state,dispatch} = useContext(UserContext)
    
    const [total,setTotal] = useState(0)
    const [cartData,setCartData] = useState([])

    useEffect(()=>{
        fetch('/getCart',{
            method:"get",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Beware "+localStorage.getItem("jwt")
            }
        })
        .then(res=>res.json())
        .then(result => {
            // console.log(result)
            setCartData(result.books)
            setTotal(result.total)
        })
        .catch(err=>{
            console.log(err)
        })
    },[state])

    

    const removeFromCart = (bookId) => {
        fetch('/removeFromCart',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Beware "+localStorage.getItem("jwt") 
            },body:JSON.stringify({
                bookId:bookId
            })
        })
        .then(res=>res.json())
        .then(result=>{
            // console.log(result)
            M.toast({html:"Successfully Removed From Cart",classes:"#263238 blue-grey darken-4"})
                dispatch({type:"UPDATECART",payload:result.cart})
                localStorage.setItem("user",JSON.stringify({...state,cart:result.cart}))
        })
        .catch(err=>{
            console.log(err)
        })
    }

    return(
        <>
        { 
            cartData.length > 0
            ? 
            <>
            <div style={{display:"flex",justifyContent:"space-around",margin:"120px auto"}}>
            <div className="cartCard" style={{width:"60%"}}>
                <div className="card" style={{width:"100%",backgroundColor:"#eee"}}>
                    <p className="yourCart" style={{margin:"2%",fontSize:"7vh",fontWeight:"bold"}}>YOUR CART ({cartData.length})</p>
                </div>
                {cartData.map(item=>{
                    return(
                       
                    <div key={item._id} className="card" style={{display:"flex",justifyContent:"space-around",margin:"3% auto",padding:"10px",backgroundColor:"#eee",width:"100%"}}>
                        
                        <div className="imageCard" style={{border:"1px solid #aaa",width:"20%",height:"150px"}}>
                            {/* {console.log("item",item)} */}
                            <Link to={`/book/${item._id}`}>
                                <img src={item.bookImage}  alt={item.bookName} style={{width:"100%",height:"150px",padding:"5%"}} />
                            </Link>
                        </div>
                        
                        <div style={{width:"70%",paddingLeft:"1%"}}>
                            <Link className="nameCart" to={`/book/${item._id}`}><h6 style={{fontSize:"2.6vw"}}>{item.bookName}</h6></Link>
                            <h6 className="authorNameCart" style={{fontSize:"1.5vw",fontStyle:"italic"}}>By {item.authorName}</h6>
                            <h6 className="priceCart" style={{fontSize:"1.3vw"}}>1 Qty - Rs. {item.price}</h6>
                                <button className="removeCart" style={{fontSize:"1.8vw",padding:"0.7% 2%"}} onClick={()=>removeFromCart(item._id)}>Remove</button>
                        </div>
                    </div>
                    )
                })}
                
            </div>
            <div className="checkoutCard" style={{width:"30%",height:"100%",backgroundColor:"#222",marginTop:"1%"}}>
                <div style={{borderBottom:"1px solid #444"}}>
                    <p style={{fontWeight:"bold",color:"#fff",marginLeft:"5%"}}>SUMMARY</p>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",color:"#fff",margin:"1px 18px",borderBottom:"1px solid #444"}}>
                    <p>SUBTOTAL</p>
                    <p>Rs. {total}</p>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",color:"#fff",margin:"1px 18px",borderBottom:"1px solid #444"}}>
                    <p>Estimated Shipping</p>
                    <p>Rs. 50</p>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",color:"#fff",margin:"1px 18px",borderBottom:"1px solid #444"}}>
                    <p>Tax</p>
                    <p>Rs. {(0.04*total).toFixed(2)}</p>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",color:"#fff",margin:"1px 18px",borderBottom:"1px solid #444"}}>
                    <p style={{fontWeight:"bold"}}>TOTAL</p>
                    <p style={{fontWeight:"bold"}}>Rs. {total + 50 + (0.04*total)}</p>
                </div>
                <div style={{width:"100%",margin:"10px auto",padding:"0px 10px"}}>
                    <button  style={{width:"100%",height:"40px",padding:"30% auto",margin:"0px auto",backgroundColor:"orange"}}>CHECKOUT</button>
                </div>
            </div>
        </div>
            <div className="smallCart"  style={{display:"none",width:"80%",margin:"-100px auto 20px auto",height:"100%",backgroundColor:"#222"}}>
                <div style={{borderBottom:"1px solid #444"}}>
                    <p style={{fontWeight:"bold",color:"#fff",marginLeft:"5%",paddingTop:"7px"}}>SUMMARY</p>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",color:"#fff",margin:"1px 18px",borderBottom:"1px solid #444"}}>
                    <p>SUBTOTAL</p>
                    <p>Rs. {total}</p>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",color:"#fff",margin:"1px 18px",borderBottom:"1px solid #444"}}>
                    <p>Estimated Shipping</p>
                    <p>Rs. 50</p>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",color:"#fff",margin:"1px 18px",borderBottom:"1px solid #444"}}>
                    <p>Tax</p>
                    <p>Rs. {(0.04*total).toFixed(2)}</p>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",color:"#fff",margin:"1px 18px",borderBottom:"1px solid #444"}}>
                    <p style={{fontWeight:"bold"}}>TOTAL</p>
                    <p style={{fontWeight:"bold"}}>Rs. {total + 50 + (0.04*total)}</p>
                </div>
                <div style={{width:"100%",margin:"10px auto",padding:"5px 10px"}}>
                    <button  style={{width:"100%",height:"40px",padding:"30% auto",margin:"0px auto",backgroundColor:"orange"}}>CHECKOUT</button>
                </div>
            </div>
        </>
         :
         <div style={{width:"80%",margin:"140px auto"}}>
                {/* {console.log("cartdfsfsfsgsgsg")} */}
            <div className="card" style={{width:"100%",backgroundColor:"#eee"}}>
                <p style={{margin:"2%",fontSize:"7vh",fontWeight:"bold"}}>NO ITEMS ADDED TO CART</p>
            </div>
         </div>
        }
        </>
    )
}

export default Cart