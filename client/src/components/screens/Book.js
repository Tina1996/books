import React, { useState,useEffect,useContext } from 'react'
import Home from './Home'
import { useParams,Link,useHistory } from 'react-router-dom'
import {UserContext} from '../../App'
import M from 'materialize-css'

const Book = () => {

    const history = useHistory()
    const {bookId} = useParams()
    const [book,setBook] = useState(null)
    const {state,dispatch} = useContext(UserContext)
    console.log("state",state)

    useEffect(()=>{
        if(bookId){
        window.scrollTo(0, 0)
        fetch(`/book/${bookId}`)
        .then(res=>res.json())
        .then(book=>{
            setBook(book)
        })
        .catch(err=>{
            console.log(err)
        })
    }
    },[bookId])

    const addToCart = (bookId) => {
        if(state.cart.includes(bookId)){
            M.toast({html:"Already Added to Cart",classes:"#263238 blue-grey darken-4"})
        }
        else{
            fetch(`/addToCart`,{
                method:"put",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Beware "+localStorage.getItem("jwt")
                },
                body:JSON.stringify({
                    bookId:bookId
                })
            })
            .then(res=>res.json())
            .then(result => {
                console.log("addtocart",result)
                if(result){
                    M.toast({html:"Successfully Added to Cart",classes:"#263238 blue-grey darken-4"})
                    dispatch({type:"UPDATECART",payload:result.cart})
                    localStorage.setItem("user",JSON.stringify({...state,cart:result.cart}))
                    // history.push('/profile')
                }
            })
            .catch(err =>{
                console.log(err)
            })
        }
    }

    const deleteBook = (bookId) => {
        console.log(bookId)
        fetch(`/deleteBook/${bookId}`,{
            method:"delete",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Beware "+localStorage.getItem("jwt")
            }
        })
        .then(res=>res.json())
        .then(result => {
            if(result){
                M.toast({html:"Successfully Deleted Posted Book",classes:"#263238 blue-grey darken-4"})
                history.push('/profile')
            } 
        })
        .catch(err =>{
            console.log(err)
        })
    }

    const editBook = (bookId) => {
        history.push({pathname:`/editBook/${bookId}`})
    }
    
    return(
        <React.Fragment>
            {/* {state 
            ? 
            null:
                    <>
                        {localStorage.clear()}
                        {dispatch({type:"CLEAR"})}
                        {history.push('/login')}
                    </>
                        } */}
            {
                book ? 

                <div style={{marginLeft:"4%",marginTop:"110px",maxWidth:"90%"}}>
                <div style={{display:"flex",justifyContent:"space-around",borderBottom:"1px solid #444"}}>
                    <div style={{width:"30%"}}>
                        <img 
                            style={{width:"100%",padding:"6%",borderRadius:"25px",height:"350px"}} 
                            src={book.book.bookImage}
                            alt={book.book.bookName}
                        />
                    </div>
                    <div style={{width:"55%"}}>
                        <div style={{fontSize:"30px",marginTop:"5px",fontWeight:"bolder"}}>{book.book.bookName}</div>
                            <p style={{fontSize:"20px",fontStyle:"italic",fontWeight:"bold",color:"darkblue"}}> -By {book.book.authorName}</p>
                            <p style={{fontSize:"18px",fontWeight:"bold"}}>Price - Rs. {book.book.price}</p>
                        <div>
                            <p style={{fontSize:"15px",fontWeight:"bold",textAlign:"justify"}}>Description - <span style={{fontWeight:"normal",color:"black"}}>{book.book.desc}</span> </p>
                        </div>
                        <div>
                            <p style={{fontSize:"15px",fontWeight:"bold"}}>Posted By-</p>
                            <p style={{marginTop:"-10px",color:"black"}}><Link to={`/profile/${book.book.postedBy._id}`}>{book.book.postedBy.firstName +" "+ book.book.postedBy.lastName} </Link> - {book.book.postedBy.city +", "+ book.book.postedBy.state +", "+book.book.postedBy.country}</p>
                        </div>
                        <div>
                            
                                    {state ?
                                        <>
                                        { state._id !== book.book.postedBy._id ?
                                        <button  style={{cursor:"pointer",width:"150px",height:"30px",backgroundColor:"green",margin:"10px"}} onClick={()=>{addToCart(book.book._id)}}>Add To Cart</button>  : null }
                                        </>
                                         : null}
                                    {state ?
                                        <>
                                        { state._id === book.book.postedBy._id ?
                                            <div>
                                                <button  style={{cursor:"pointer",width:"150px",height:"40px",backgroundColor:"#b71c1c",margin:"10px",borderRadius:"5px"}} onClick={()=>deleteBook(book.book._id)}>Delete Book</button> 
                                                <button  style={{cursor:"pointer",width:"150px",height:"40px",backgroundColor:"#b71c1c",margin:"10px",borderRadius:"5px"}} onClick={()=>editBook(book.book._id)}>Edit Book</button>   
                                            </div>
                                            
                                            : null 
                                        }
                                        </>
                                         : null}
                            
                        
                        </div>
                    </div>
                </div>
                <div>
                <div>
                    <p style={{fontSize:"20px",fontWeight:"bold"}}><u>More Books</u></p>
                        <div style={{marginTop:"-100px"}}>
                            <Home />
                        </div>
                    </div>
                </div>
                </div>
                :
                <h2 style={{display:"flex",marginTop:"120px",justifyContent:"center"}}>Loading...</h2>
            }
        

            
        
        </React.Fragment>
    )
} 

export default Book