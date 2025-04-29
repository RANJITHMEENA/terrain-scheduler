import React, { use, useMemo, useState } from "react";
import { useEffect } from "react";
import useFetchHelper from './helper'

const ForTest = () => {
const [first,setFirst] = useState()
const [seecond, setSecond] = useState()
const [count,setCount] = useState()

const [data] = useFetchHelper('https://microsoftedge.github.io/Demos/json-dummy-data/64KB.json')


console.log(data , "kiss")

    return(
        <>
              <p>Testing</p>
        <input 
        type="number"
        onChange={(e) => setFirst(parseInt(e.target.value))}
        />
        <input 
        type="number"
        onChange={(e) => setSecond(parseInt(e.target.value))}
        />
        {/* <button onClick={handleAdd}>Add</button> */}
        <p>{count}</p>
        </>
  
    )
}

export default ForTest