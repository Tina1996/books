import React,{useEffect, useState} from 'react'
import { useParams, useHistory } from 'react-router-dom'

const EditBook = () => {
    
    const history = useHistory()
    const {bookId} = useParams()
    const [editBook,setEditBook] = useState(null)
    const [bookName,setBookName] = useState("")
    const [authorName,setAuthorName] = useState("")
    const [desc,setDesc] = useState("")
    const [categories,setCategories] = useState([])
    
    // const [url,setUrl] = useState("")

    useEffect(()=>{
        if(bookId){
          
            fetch(`/book/${bookId}`)
                .then(res=>res.json())
                .then(resultBook => {
                    console.log("resulted book in use efect",resultBook)
                    setEditBook(resultBook.book)
                })
                .catch(err=>{
                    console.log(err)
                })
            }
    },[bookId])

    useEffect(()=>{
        if(editBook){
            setBookName(editBook.bookName)
            setAuthorName(editBook.authorName)
            setCategories(editBook.categories)
            setDesc(editBook.desc)
        }
    },[editBook])

    const handleCategories = (e) =>{
        if(e.target.checked){
            setCategories([...categories,e.target.value])
        }
        else{
            const newCat = categories.filter(item=>{
                return item!==e.target.value
            })
            setCategories(newCat)
            
        }
    }

    const updateBook = () => {
        fetch(`/updateBook/${bookId}`,{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Beware "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                bookName,
                authorName,
                categories,
                desc
            })
        })
        .then(res=>res.json())
        .then(result => {
            console.log(result)
            history.goBack()
        })
        .catch(err=>{
            console.log(err)
        })
    } 

    return(
        <div>
            
            {
                editBook ?
                <div className="card input-field" style={{margin:"120px auto",minWidth:"60%",maxWidth:"70%",padding:"3%"}}>
                    <input 
                        type="text" 
                        placeholder="Book Title" 
                        value={bookName}
                        onChange = {(e)=>setBookName(e.target.value)}
                        />
                    <input 
                        type="text"
                        placeholder="Author Name" 
                        value={authorName}
                        onChange = {(e)=>setAuthorName(e.target.value)}
                        />
                    <div className="input-field" style={{display:"flex",justifyContent:"space-around",flexWrap:"wrap",fontFamily: "'Fredoka One', cursive"}}>
                        <p>
                            <label>
                                <input 
                                    type="checkbox"
                                    value="Fiction" 
                                    checked={categories.includes("Fiction") ? true :false}
                                    onChange = {(e)=>{handleCategories(e)}}/>
                                    <span style={{color:"#444"}}>Fiction</span>
                            </label>
                        </p>
                        <p>
                            <label>
                                <input 
                                    type="checkbox" 
                                    value="Romance"
                                    checked={categories.includes("Romance") ? true :false}
                                    onChange = {(e)=>{handleCategories(e)}}/>
                                    <span style={{color:"#444"}}>Romance</span>
                            </label>
                        </p>
                        <p>
                            <label>
                                <input 
                                    type="checkbox"
                                    value="Thrill" 
                                    checked={categories.includes("Thrill") ? true :false}
                                    onChange = {(e)=>{handleCategories(e)}}/>
                                    <span style={{color:"#444"}}>Thrill</span>
                            </label>
                        </p>
                        <p>
                            <label>
                                <input 
                                    type="checkbox" 
                                    value="Horror"
                                    checked={categories.includes("Horror") ? true :false}
                                    onChange = {(e)=>{handleCategories(e)}} />
                                    <span style={{color:"#444"}}>Horror</span>
                            </label>
                        </p>
                        <p>
                            <label>
                                <input 
                                    type="checkbox" 
                                    value="Historical" 
                                    checked={categories.includes("Historical") ? true :false}
                                    onChange = {(e)=>{handleCategories(e)}}/>
                                    <span style={{color:"#444"}}>Historical</span>
                            </label>
                        </p>
                    </div>
                    <input 
                        type="text"
                        placeholder="Description" 
                        value={desc}
                        onChange = {(e)=>setDesc(e.target.value)}
                        />
                    <button className="btn waves-effect waves-light #b71c1c red darken-4" onClick={()=>{updateBook()}}>Update</button>  
                </div>
                :
                <h2 style={{display:"flex",marginTop:"120px",justifyContent:"center"}}>Loading...</h2>
            }
        </div>
    )
}

export default EditBook