import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const EmployeeList = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true)
    const [employees, setEmployees] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get("http://localhost:8080/api/v1/employees");
                setEmployees(response.data);
            } catch (error) {
                console.log(error.response);
            }
            setLoading(false);
        }
        fetchData();
    }, []);

    const deleteEmployee = async (e, id) => {
        e.preventDefault();
        try {
            const response = await axios.delete(`http://localhost:8080/api/v1/employees/${id}`);
            if (employees) {
                setEmployees((prevElement) => {
                    return prevElement.filter((employee) => employee.id !== id);
                });
            }
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    const editEmployee = async (e, id) => {
        e.preventDefault();
        navigate(`/editEmployee/${id}`);
    }

    return (
        <div className='container mx-auto my-8'>
            <div className='h-12'>
                <button className='rounded bg-slate-600 text-white px-6 py-2 font-semibold' onClick={() => navigate("/addEmployee")}>Add Employee</button>
            </div>
            <div className='flex shadow border-b'>
                <table className='min-w-full'>
                    <thead className='bg-gray-50 font-medium text-gray-500 uppercase tracking-wider'>
                        <tr>
                            <th className='text-left py-3 px-6'>First Name</th>
                            <th className='text-left py-3 px-6'>Last Name</th>
                            <th className='text-left py-3 px-6'>Email ID</th>
                            <th className='text-right py-3 px-6'>Actions</th>
                        </tr>
                    </thead>
                    {!loading && (
                        <tbody className='bg-white whitespace-nowrap text-sm text-gray-500'>
                            {employees.map((employee) => (
                                <tr key={employee.id}>
                                    <td className='text-left px-6 py-4'>{employee.firstName}</td>
                                    <td className='text-left px-6 py-4'>{employee.lastName}</td>
                                    <td className='text-left px-6 py-4'>{employee.emailId}</td>
                                    <td className='text-right px-6 py-4 font-medium'>
                                        <a onClick={(e, id) => editEmployee(e, employee.id)} className='text-indigo-600 hover:text-indigo-800 px-4 cursor-pointer'>Edit</a>
                                        <a onClick={(e, id) => deleteEmployee(e, employee.id)} className='text-indigo-600 hover:text-indigo-800 px-4 cursor-pointer'>Delete</a>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    )}

                </table>
            </div>
        </div>

    )
}

export default EmployeeList