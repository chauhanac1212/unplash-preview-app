import React from 'react'

const Images=(props)=> {
  return (
        
        <div className='col-md-4 mt-3 col-lg-4'>
         <img className="img-fluid" src={props.img} alt="image" style={{width:"300px",height:"200px",objectFit: 'cover',marginBottom:"15px"}} />
         </div>
  )
}

export default Images