import React, { useState } from 'react'
import Cookies from 'js-cookie'
import './Addrecipe.css'
import LoadingSpinner from '../../components/Spinner/Spinner'
function Addrecipe() {
  const token = Cookies.get("token")
  const [loading,isLoading]=useState(false)
  const [form,setForm] = useState({
    title:"",
    url:"",
    preperationtime:20,
    serving:4,
    description:"",
    imageurl:""
  })
  function handleChange(e){
    setForm({...form,[e.target.name]:e.target.value})
  }
  const [ing,setIng]=useState([])
  function handleIngredietschange(e){
    setIng({...ing,[e.target.name]:e.target.value})
  }
  async function handleSubmit(e){
    e.preventDefault()
    
    if(form.title==="") return console.log('Please enter details');
    isLoading(true)
    const ingredients = Object.entries(ing)
    .filter(ing=>ing[0].startsWith('ing'))
    .map(ing=>{
      const [_,value] = ing
      return {ingredient:value}
    })
    const data={
      ...form,ingredients
    }
    console.log(data);
    const res=await fetch(`https://recipe-finder-4aj5.onrender.com/api/v1/recipe/create`,{
      method:"post",
      body:JSON.stringify(data),
      headers:{
        Authorization:`Bearer ${token}`,
        "content-type":"application/json"
      }
    })
    if (res.ok){
      //  const data=await res.json()
       isLoading(false)
    }
    
  }
  const [inpFields,addinpField]=useState([])

  function addInput(){
    addinpField(inp=>{
      return [
        ...inp,
        {
          type:"text",
        }
      ]
    })
  }

  return (
    
    <div className='Add'>
      {loading ? <LoadingSpinner/> : 
           
          <form onSubmit={handleSubmit} className='addrecipe-form'>
            <label>Title</label>
            <input type="text" name='title' value={form.title} onChange={handleChange} />
            <label>URL</label>
            <input type="text" name='url' value={form.url} onChange={handleChange}/>
            <label>Preperation time</label>
            <input type="number"  name='preperationtime' value={form.preperationtime} onChange={handleChange}/>
            <label>Serving</label>
            <input type="number" name="serving" value={form.serving} onChange={handleChange} />
            <label>Description</label>
            <textarea  rows="5" cols="10" name="description" value={form.description} onChange={handleChange} />
            <label>Ingredients 1</label>
            <input type="text" name='ing1' value={form.ing1} onChange={handleIngredietschange} />
            <label>Ingredients 2</label>
            <input type="text" name='ing2' value={form.ing2} onChange={handleIngredietschange} />
            <label>Ingredients 3</label>
            <input type="text"  name='ing3' value={form.ing3} onChange={handleIngredietschange}/>
            <label>Ingredients 4</label>
            <input type="text"  name='ing4' value={form.ing4} onChange={handleIngredietschange} />
            <label>Ingredients 5</label>
            <input type="text"  name='ing5' value={form.ing5} onChange={handleIngredietschange} />
            {inpFields.map((el,i)=>{
              return<>
                <label>Ingredients {i*1 + 6}</label>
                <input type={el.type}  name={`ing${i*1 + 6}`} onChange={handleIngredietschange} />
              </> 
            })}
            <a  className='addinp'  onClick={addInput}>Add ingredients</a>
            <label>Upload image URL</label>
            <input type="text" name="imageurl" value={form.imageurl} onChange={handleChange}/>
            <button className='submit-btn' type='submit'>Submit</button>
        </form>
      }

    </div>
  )
}

export default Addrecipe