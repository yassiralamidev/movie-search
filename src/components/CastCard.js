import React from 'react'
import '../style/castCard.css'

function CastCard({cast,imageUrl}) {
  return (
    <div className='cast'>
      <img src={`${imageUrl}${cast.profile_path}`} alt="" />
      <p>{cast.name || cast.original_name}</p>
      <span>{cast.character}</span>
    </div>
  )
}

export default CastCard