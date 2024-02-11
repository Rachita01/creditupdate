import React, { useEffect, useState } from 'react'
import './Home.css';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
// import usersData from '../../users.json';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [user,setUser] = useState("")
  const [password,setPassword] = useState("");
  const [list,setList] = useState([]);
  const navigate = useNavigate();

  const [pcdata,setPCData] = useState(null);
  useEffect(() => {
    console.log(list,pcdata)
  },[list,pcdata])

  const handleSubmit = async () => {
    const data = {
      user,
      password
    };

    if(list.newValue.length!==0 && (list.newValue.filter(item => item.username === data.user)).length !== 0){
      const filteredData = list.newValue.filter(item => item.username === data.user);
      if((filteredData[0].username === data.user) && (filteredData[0].password === data.password)){
        if(data.user === "JINDAL.SUMEET"){
          navigate('/adminhome',{state:{data:`${JSON.stringify(pcdata)}`}})
        }
        else{
      navigate("/pchome",{ state: { name:`${data.user}`}})
        }
      }
      else{
        alert("Please provide correct username and password")
      }
    }else{
    axios
    .post("http://localhost:5000/users/users",data)
    .then(() => {
      console.log(data);
      navigate("/pchome")
    })
    .catch((error) => {
      console.log(error,data);
      alert("An error happened. Please check console",error);
    })
  }
  };

  useEffect(() => {
    axios
    .get('http://localhost:5000/users/users')
    .then((response) => {
      const newValue = response.data.data
      console.log(newValue);
      setList((prevList) => ({
        ...prevList,newValue
      }));
    })
    .catch((error) => {
      console.log(error.message)
    })

    axios
  .get('http://localhost:5000/creditupdate/creditupdate')
  .then((response) => {
    console.log(response.data.data);
    setPCData(response.data.data);
    console.log(pcdata)
  })
  .catch((error) => {
    console.log(error.message)
  })
},[])

  const handleUserChange =(event) => {
     setUser(event.target.value);
  }

  const handlePassChange = (event) => {
    setPassword(event.target.value);
  }


  return (
    <div className='cardStyle'>
      <div className='loginCard'>
        <h3 className='loginHead'>Login</h3>
        <label className='labelStyle'>Username</label><input type="text" className='userClass' value={user} onChange={handleUserChange}></input>
        <label className='labelStyle'>Password</label><input type="password" className='passwordClass' value={password} onChange={handlePassChange}></input>
        <ButtonComponent label="Submit" change={handleSubmit} disabled={!user || !password}></ButtonComponent>
      </div>
    </div>
  )

}

export default Home