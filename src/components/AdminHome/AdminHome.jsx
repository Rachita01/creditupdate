import React from 'react'
import { useLocation,useNavigate } from 'react-router-dom';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import ExcelCreation from '../ExcelCreation/ExcelCreation';
import './AdminHome.css'

function AdminHome() {
  const location = useLocation();
  const { data } = location.state || {};
  console.log(JSON.parse(data));
  const final_data = JSON.parse(data)
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate("/")
  }
  return (
    <div className='cardStylePC'>
        <p className='headStyle'>Details of All PC</p>
        <div className='adminContent'>
            <table className='tableStyle'>
                <thead>
                    <th>PC Name</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Date Added On</th>
                </thead>
                <tbody>
                    {final_data.map(item => (
                        <tr key={item.id}>
                            <td>{item.pcname}</td>
                            <td>{item.date}</td>
                            <td>{item.amount}</td>
                            <td>{item.addedon}</td>
                        </tr>))}
                </tbody>
            </table>
        </div>
       
        <div className='submitStyle'>
        <ExcelCreation data={final_data}/>
        <ButtonComponent label="Logout" change={handleSubmit} disabled={false}></ButtonComponent>
        </div>
    </div>
  )
}

export default AdminHome