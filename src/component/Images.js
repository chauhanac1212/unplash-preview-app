import React from 'react'

function Images(props) {
  return (
        
        <div className='col-md-4 mt-3 col-lg-4'>
         <img class="img-fluid" src={props.img} alt="image" style={{width:"300px",height:"200px",objectFit: 'cover'}} />
         </div>
  )
}

export default Images