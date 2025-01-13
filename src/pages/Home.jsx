import React from 'react'
import { useContext } from 'react'
import { CategContext } from '../context/CategContext'
import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle } from 'reactstrap'
import { NavLink, useNavigate } from "react-router-dom"
import { Truncate } from '@re-dev/react-truncate'
import { sanitizeHTML } from '../utility/utils'

export const Home = () => {

  const { categories } = useContext(CategContext)
  console.log(categories);

  const navigate = useNavigate()

  return (
    <div className='page'>
      <div style={{display:"flex", flexWrap:"wrap", justifyContent:"center"}}>
      {categories && categories.map(obj =>
        <Card
        key={obj.id}
        style={{
            maxHeight: "530px",
            width: "350px",
            borderRadius:"15px",
            margin:"10px",
            border:"3px solid var(--color1)",
            backgroundColor:"var(--bgColor)",
            cursor:"pointer",
            userSelect:"none"
        }}
        onClick={() => navigate('/posts?ctg='+obj.name)}
        >
        <div style={{display:"flex", justifyContent:"center", margin:"15px"}}>
          <img alt={obj.name} src={obj.photoURL} className="img-fluid" style={{borderRadius:"15px", maxHeight:"300px", objectFit:"contain"}}/>
      </div>
      <CardBody style={{textAlign:"center", display:"flex", flexDirection:"column"}}>
          <CardTitle tag="h3" style={{display:"flex", alignItems:"flex-end", justifyContent:"center", height:"100%", color:"var(--color1)"}}>
              <Truncate>
                  {obj.name}
              </Truncate> 
          </CardTitle>
          <CardText style={{color:"var(--greyColor)"}}>
              <Truncate>
                  {sanitizeHTML(obj.description)}
              </Truncate> 
          </CardText>
      </CardBody>
      </Card>
      )}
      </div>
    </div>
  )
}

