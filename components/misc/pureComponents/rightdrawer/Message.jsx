import React from 'react'
import parse from "html-react-parser"
export const Message = ({string}) => {
  console.log(string)
  return (
    <div>
      {parse(string)}
      </div>
  )
}
