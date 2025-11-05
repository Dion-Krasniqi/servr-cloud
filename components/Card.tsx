import { Models } from 'node-appwrite'
import React from 'react'

const Card = ({file}:{ file:Models.Document}) => {
  return (
    <div>{file.Name}</div>
  )
}

export default Card