import React,{useEffect,useState} from 'react'
import { useHistory,useLocation } from 'react-router'
const FormDetails=()=>{
    const history=useHistory()
    const location=useLocation()
    const [loc,setLoc]=useState(null)
    const [data,setData]=useState(null)
    const [val,setVal]=useState(null)


    useEffect(()=>{
        console.log(1,JSON.parse(sessionStorage.getItem('form')))
        setData(JSON.parse(sessionStorage.getItem('form')))
    },[])

    const onsubmit=()=>{
        history.push("/")
        let obj1={formName:data.formName,questionData:data.questionData.question,anwser:val}
        let res=sessionStorage.getItem("response")
        if(res){
            let arr1=JSON.parse(res)
            arr1.push(obj1)
            sessionStorage.setItem('response',JSON.stringify(arr1))
        }
        else{
            let arr2=[]
            arr2.push(obj1)
            sessionStorage.setItem('response',JSON.stringify(arr2))
        }
    }
    const handleChange=(e)=>{
        setVal(e.target.value)
    }

return(
    <React.Fragment>
        {data?<><h1>Submit your response for {data.formName}</h1>
        <h3 className="text text-danger">{data.questionData.question}</h3>
        {data.questionData.toq=="mcq"?<div className="form-group">
            
            <input onChange={handleChange} className="form-control-inline" name="ans" value={data.questionData.opt.first} type="radio"></input>{data.questionData.opt.first?data.questionData.opt.first:"not defined"}<br/>
            <input onChange={handleChange} className="form-control-inline" name="ans" value={data.questionData.opt.second} type="radio"></input>{data.questionData.opt.second?data.questionData.opt.second:"not defined"}<br/>
            <input onChange={handleChange} className="form-control-inline" name="ans" value={data.questionData.opt.third} type="radio"></input>{data.questionData.opt.third?data.questionData.opt.third:"not defined"}<br/>
            <input onChange={handleChange} className="form-control-inline" name="ans" value={data.questionData.opt.fourth} type="radio"></input>{data.questionData.opt.fourth?data.questionData.opt.fourth:"not defined"}<br/>
        </div>:<input type="text" value={val} onChange={handleChange}></input>}<br/>
        <button className="btn btn-success mt-2" onClick={onsubmit}>Submit</button><br/>
        <button className="btn btn-warning mt-2" onClick={()=>history.push('/')}>Back</button></>:null}
    </React.Fragment>
)
}
export default FormDetails