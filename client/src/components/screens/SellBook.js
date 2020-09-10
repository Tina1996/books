import React,{useState,useEffect} from 'react'
import M from 'materialize-css'
import {useHistory} from 'react-router-dom'
import '../../App.css'

const SellBook = () => {

    const history = useHistory()

    // const {bookId} = useParams()
    // console.log(bookId)

    const [bookName,setBookName] = useState("")
    const [authorName,setAuthorName] = useState("")
    const [desc,setDesc] = useState("")
    const [categories,setCategories] = useState([])
    const [bookImage,setBookImage] = useState("")
    const [bookPrice,setBookPrice] = useState("")
    const [url,setUrl] = useState("")
    

    useEffect(()=>{
        
        if(url){
            fetch('/sellBook',{
                method:"post",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Beware "+localStorage.getItem("jwt")
                },
                body:JSON.stringify({
                    bookName,
                    authorName,
                    price:parseInt(bookPrice),
                    categories,
                    desc,
                    bookImage:url
                })
            })
            .then(res=>res.json())
            .then(data =>{
                if(data.error){
                    M.toast({html:data.error,classes:"#263238 blue-grey darken-4"})
                }
                else{
                M.toast({html: "Book Submitted Successfully",classes:"#263238 blue-grey darken-4"})
                history.push('/')
                }
            })
        }
    },[url])


    const handleCategories = (e) =>{
        if(e.target.checked){
            setCategories([...categories,e.target.value])
        }
        
    }


    const submitBook = () => {
        const data = new FormData()
        data.append("file",bookImage)
        data.append("upload_preset","bookSeize")
        data.append("cloud_name","ankita1960")
        fetch("https://api.cloudinary.com/v1_1/ankita1960/image/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
            setUrl(data.url)
        })
        .catch(err=>{
            console.log(err)
        })
      
    }

    return(
        
        <div className="card input-field" style={{margin:"125px auto",minWidth:"60%",maxWidth:"80%",padding:"3%"}}>
            {/* {console.log("edit",editBook)} */}
           <input 
                type="text" 
                placeholder="Book Title" 
                value={bookName}
                onChange = {(e)=>setBookName(e.target.value)}
                />
            <div className="row" style={{marginTop:"-10px",marginBottom:"-10px"}}>
                <div className="input-field col s8 element">
                    <input 
                    type="text"
                    placeholder="Author Name"
                    value={authorName}
                    onChange = {(e)=>setAuthorName(e.target.value)}
                    />
                </div>

                <div className="input-field col s4 element">
                    <input 
                    type="number"
                    placeholder="Price in Rupees" 
                    value={bookPrice}
                    onChange = {(e)=>setBookPrice(e.target.value)}
                    />
                </div>
            </div>
            
            <div className="input-field" style={{display:"flex",justifyContent:"space-around",flexWrap:"wrap",fontFamily: "'Fredoka One', cursive"}}>
                <p>
                    <label>
                        <input 
                            type="checkbox"
                            value="Fiction" 
                            style={{margin:"0",padding:"0"}}
                            onClick = {(e)=>{handleCategories(e)}}/>
                            <span style={{color:"#444"}}>Fiction</span>
                    </label>
                </p>
                <p>
                    <label>
                        <input 
                            type="checkbox" 
                            value="Romance"
                            onClick = {(e)=>{handleCategories(e)}}/>
                            <span style={{color:"#444"}}>Romance</span>
                    </label>
                </p>
                <p>
                    <label>
                        <input 
                            type="checkbox"
                            value="Thrill" 
                            onClick = {(e)=>{handleCategories(e)}}/>
                            <span style={{color:"#444"}}>Thrill</span>
                    </label>
                </p>
                <p>
                    <label>
                        <input 
                            type="checkbox" 
                            value="Horror"
                            onClick = {(e)=>{handleCategories(e)}} />
                            <span style={{color:"#444"}}>Horror</span>
                    </label>
                </p>
                <p>
                    <label>
                        <input 
                            type="checkbox" 
                            value="Historical" 
                            onClick = {(e)=>{handleCategories(e)}}/>
                            <span style={{color:"#444"}}>Historical</span>
                    </label>
                </p>
            </div>
            <div className="file-field input-field">
                <div className="btn  #424242 grey darken-3">
                    <span>Upload Image</span>
                    <input type="file" onChange={(e) =>{setBookImage(e.target.files[0])} } multiple />
                </div>
                <div className="file-path-wrapper input-field">
                    <input className="file-path" type="text" placeholder="Upload file" />
                </div>
            </div> 
            <input 
                type="text"
                placeholder="One Line Description" 
                value={desc}
                onChange = {(e)=>setDesc(e.target.value)}
                />
             <button className="btn waves-effect waves-light #b71c1c red darken-4" onClick={()=>{submitBook()}}>Submit</button>
        </div>
    )
}

export default SellBook