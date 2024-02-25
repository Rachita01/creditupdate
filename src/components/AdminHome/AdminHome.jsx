import React from 'react'
import { useLocation,useNavigate } from 'react-router-dom';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import ExcelCreation from '../ExcelCreation/ExcelCreation';
import './AdminHome.css'
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function AdminHome() {
  const location = useLocation();
  const { data,adminData } = location.state || {};
  console.log(JSON.parse(data));
  const final_data = JSON.parse(data)
  const admin_data = JSON.parse(adminData)
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate("/",{replace:true})
  }
  return (
    <div className='cardStylePC'>
        <Header/>
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
                    {admin_data.map(item => (
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
        <Footer/>
    </div>
  )
}

export default AdminHome