import {useState} from 'react'

export default function Square({text, callback}) {
  
  return(
    <div 
      onClick={callback}
      className="square"
      >
       {text}     
    </div>
  );

}