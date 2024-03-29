import React, { useEffect, useState } from 'react'
import './Home.css';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
// import usersData from '../../users.json';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

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

      const filteredData = list.filter(item => item.username.toLowerCase() === data.user.toLowerCase());
      if(filteredData[0] && (filteredData[0].username.toLowerCase() === data.user.toLowerCase()) && (filteredData[0].password.toLowerCase() === data.password.toLowerCase())){
        if(data.user.toLowerCase() === "jindal.sumeet" || data.user.toLowerCase() === "jindal.sanjay"){
          navigate('/adminhome',{state:{data:`${JSON.stringify(pcdata)}`,adminData:`${JSON.stringify(pcdata.slice(-25))}`}})
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
  .get('https://credit-update.onrender.com/creditupdate')
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
      <Header/>
      <div className='loginCard'>
        <h3 className='loginHead'>Login</h3>
        <label className='labelStyle'>Username</label><input type="text" className='userClass' value={user} onChange={handleUserChange}></input>
        <label className='labelStyle'>Password</label><input type="password" className='passwordClass' value={password} onChange={handlePassChange}></input>
        <ButtonComponent label="Submit" change={handleSubmit} disabled={!user || !password}></ButtonComponent>
      </div>
      <Footer/>
    </div>
  )

}

export default Home