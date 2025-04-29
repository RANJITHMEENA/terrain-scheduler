import { useEffect, useState } from "react"

const useFetchHelper = (url) => {
const [data,setData] = useState("")
useEffect(() => {
    fetch(url).then((res) => res.json()).then((val) => setData(val))

},[])
return [data];
}

export default useFetchHelper