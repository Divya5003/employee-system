import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const UpdateEmployee = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [employee, setEmployee] = useState({
        id: id,
        firstName: "",
        lastName: "",
        emailId: ""
    });

    const updateEmployee = (e) => {
        e.preventDefault();
        try {
            const response = axios.put(`http://localhost:8080/api/v1/employees/${id}`, employee);
            navigate("/employeeList");
        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (e) => {
        const value = e.target.value;
        setEmployee({ ...employee, [e.target.name]: value })
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/v1/employees/${id}`);
                setEmployee(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, []);


    return (
        <div className='flex mx-auto max-w-2xl shadow border-b'>
            <div className='px-8 py-8'>
                <div className='font-thin text-2xl tracking-wider'>
                    <h1>Update Employee</h1>
                </div>
                <div className='items-center justify-center h-14 w-full my-4'>
                    <label className='block text-gray-600 text-sm font-normal'>
                        First Name
                    </label>
                    <input
                        type='text'
                        name='firstName'
                        value={employee.firstName}
                        onChange={(e) => handleChange(e)}
                        className='h-10 w-96 border mt-2 px-2 py-2'
                    />
                </div>
                <div className='items-center justify-center h-14 w-full my-4'>
                    <label className='block text-gray-600 text-sm font-normal'>
                        Last Name
                    </label>
                    <input
                        type='text'
                        name='lastName'
                        value={employee.lastName}
                        onChange={(e) => handleChange(e)}
                        className='h-10 w-96 border mt-2 px-2 py-2'
                    />
                </div>
                <div className='items-center justify-center h-14 w-full my-4'>
                    <label className='block text-gray-600 text-sm font-normal'>
                        Email
                    </label>
                    <input
                        type='email'
                        name='emailId'
                        value={employee.emailId}
                        onChange={(e) => handleChange(e)}
                        className='h-10 w-96 border mt-2 px-2 py-2'
                    />
                </div>
                <div className='items-center justify-center h-14 w-full my-4 space-x-4 pt-4'>
                    <button onClick={updateEmployee} className='rounded text-white font-semibold bg-green-400 hover:bg-green-700 bg- py-2 px-6'>
                        Update
                    </button>
                    <button onClick={() => navigate("/employeeList")} className='rounded text-white font-semibold bg-red-400 hover:bg-red-700 py-2 px-6'>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UpdateEmployee