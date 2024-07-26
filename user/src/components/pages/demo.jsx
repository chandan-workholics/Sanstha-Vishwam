import React, { useState, useEffect } from 'react'

const demo = () => {


    const [data, setData] = useState();

    const getData = () => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((res) => {
                return res.json()
            }).then((data) => {
                setData(data);
            })
    }

    useEffect(() => {
        getData();
    }, [])


    return (
        <div>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12'>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>name</th>
                                    <th>username</th>
                                    <th>Email</th>
                                </tr>
                            </thead>
                            <tbody>

                                {data?.map((val, i) => {
                                    <tr key={i}>
                                        <td>{val.name}</td>
                                        <td>{val.username}</td>
                                        <td>{val.email}</td>
                                    </tr>
                                })}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default demo