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
  // const [users,setUsers] = useState([])
  const [pcdata,setPCData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = require("../../userslist.json")
        setList(response.users);
        console.log(response.users)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    console.log(list,pcdata)
  },[list,pcdata])

  const handleSubmit = async () => {
    const data = {
      user,
      password
    };

      const filteredData = list.filter(item => item.username === data.user);
      if(filteredData[0] && (filteredData[0].username === data.user) && (filteredData[0].password === data.password)){
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
    };

  useEffect(() => {
  axios
  .get('/.netlify/functions/get_credit_update')
  .then((response) => {
    console.log(response.data.data);
    setPCData(response.data.data);
    console.log(pcdata)
  })
  .catch((error) => {
    console.log(error.message)
  })
},[pcdata])

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