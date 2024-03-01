import React, { useEffect } from 'react'
import './App.css'
export const Pagination = ({data,pagehandler}) => {
    const pageNumbers=[];
    for(let i=1;i<Math.ceil(data.length/20)+1;i++)
    {
        pageNumbers.push(i);
    }
    useEffect(()=>{pagehandler(1)},[]);
  return (
    <div> 
     
        <center>
        <div>
          <div className="b">
         {pageNumbers.map((page)=><div className=''><button className=' btn btn-success' onClick={()=>pagehandler(page)}>{page}</button></div>)}
         </div>
         </div>
         </center>
    </div>
  )
}
