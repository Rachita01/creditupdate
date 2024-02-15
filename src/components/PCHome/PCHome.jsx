import React, { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
import './PCHome.css';
import { useLocation } from 'react-router-dom';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import { useNavigate } from 'react-router-dom';

function PCHome() {
    const location = useLocation();
    const navigate = useNavigate();
    const { name } = location.state || {};
    const [amount,setAmount] = useState("");
    const[date,setDate] = useState(null);
    const [dateObj,setDateObj] = useState(null);
    const handleDate = (date) => {
        console.log(date);
        setDateObj(date)
        setDate(formattedDate(date));
    }

    const handleAmount = (e) => {
       setAmount(e.target.value)
    }

    const getCurrentDate = () => {
        const date = new Date();
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
      };
      
    const handleSubmit = () => {
        const currentDate = getCurrentDate();
        console.log(typeof(amount),typeof(date),typeof(name),typeof(currentDate))
        const data = {
            name,
            date,
            amount,
            currentDate
        }

        console.log(data)
        axios
    .post('https://credit-update.onrender.com/creditupdate',data)
    .then(() => {
      console.log(data);
      navigate("/")
    })
    .catch((error) => {
      console.log(error,data);
      alert("An error happened. Please check console",error);
    })
    }
    const formattedDate = (d) => {
        if(d){
            return(
                ('0' + d.getDate()).slice(-2) +
                "/"+
                ("0" + (Number(d.getMonth())+1)).slice(-2)+
                "/"+
                d.getFullYear()
            )
        }
    }

    useEffect(() => {
        const inputElement = document.querySelector('.react-datepicker__input-container input');
        if (inputElement) {
          inputElement.classList.add('inputCustom');
        }
      }, [dateObj]);
  return (
    <div className='cardStylePC'>
        <p className='headStyle'>Please enter following details</p>
        <div className='pcContent'>
            <div className='dateComponent'>
                <p className='pStyle'>DATE</p>
                <div className='dateClass'>
                    <DatePicker
                    selected={dateObj}
                    dateFormat="dd/MM/yyyy"
                    onChange={date => handleDate(date)}
                    />
                </div>
            </div>
            <div className='inputComponent'>
            <p className='pStyle'>AMOUNT</p>
            <input type="number" value={amount} className='inputClass' onChange={handleAmount}/>
            </div>
        </div>
        <div className='submitStyle'>
        <ButtonComponent label="Submit" change={handleSubmit} disabled={false}></ButtonComponent>
        </div>
    </div>
  )
}

export default PCHome