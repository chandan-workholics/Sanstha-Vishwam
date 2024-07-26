import React, { useState, useEffect } from 'react';
import Navbar from '../Template/Navbar';
import workerImg from '../img/Constructionworker.png';

const Home = () => {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    // const getData = () => {
    //     fetch("http://206.189.130.102:6292/api/v1/get-customer")
    //         .then((res) => res.json())
    //         .then((data) => {
    //             setData(data);
    //             console.log(data);
    //         })
    //         .catch((error) => {
    //             console.error('Error fetching data:', error);
    //         });
    // };

    const getData = async () => {
        try {
            const response = await fetch('http://206.189.130.102:6292/api/v1/get-customer');
            const data = await response.json();
            setData(data?.data);
            // console.log(data.occupations);
        } catch (error) {
            console.error('Error fetching occupations:', error);
        }
    };

    useEffect(() => {
        getData();
    }, []);
    const filteredData = data.filter((item) =>
        // item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        // item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        // item.number.toString().includes(searchTerm.toLowerCase()) ||
        item.ocupation?.name.toLowerCase().includes(searchTerm.toLowerCase())
        // item.city.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (
        <>
            <main className='main-container container-fluid px-0 pt-5 home-page'>
                <Navbar />
                <div className="home-banner bg-body-tertiary py-5">
                    <div className="container">
                        <div className="row justify-content-between">
                            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 d-flex">
                                <div className="pe-3 my-auto">
                                    <div className="banner_caption text-left mb-4">
                                        <h1 className="banner_title ft-normal mb-1"><span className="text-danger fw-bold">अभी खोजे</span><br /> अपने ही शहर में कुशल कारीगर <br /> </h1>
                                        <p className="fs-md ft-regular">यहां पर आपके शहर में सबसे अच्छे कारीगर (Perfect Tradesperson) खोजने के कुछ उपाय दिए गए हैं, यहां एक और ऐप है जो विभिन्न प्रकार की सेवाओं के लिए कारीगरों को खोजने और बुक करने में मदद करता है।</p>
                                    </div>
                                    <form className="">
                                        <span className="fw-semibold">खोजे</span>
                                        <div className="input-group">
                                            <input type="text" className="form-control radius" placeholder="carpenters, plumbers, painters..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                                            <button className="btn text-white input-group-text bg-danger p-3" type="button" id="basic-addon2">
                                                Search<i className="fa-solid fa-magnifying-glass ms-2 text-white"></i>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12 col-12">
                                <div><img src={workerImg} className="img-fluid w-100" alt="" /></div>
                            </div>
                        </div>
                    </div>
                </div>
                <section className='bg-fff0ca py-5'>
                    <div className='container'>

                        <section id="advertisers" class="advertisers-service-sec">
                            <div class="container">
                                <div class="row">
                                    <div class="section-header text-center">
                                        <h2 class="fw-bold fs-1">
                                            <span class="text-danger">कुशल कारीगर </span>
                                        </h2>
                                        <p class="sec-icon"><i class="fa-solid fa-gear"></i></p>
                                    </div>
                                </div>
                                <div class="row mt-5 mt-md-4 row-cols-1 row-cols-sm-1 row-cols-md-3 justify-content-center">


                                    {filteredData?.map((item, index) => (
                                        <div class="col">
                                            <div class="service-card">
                                                <div class="icon-wrapper">
                                                    <i class="fa-solid fa-user text-danger"></i>
                                                </div>
                                                <h3>{item?.name}</h3>
                                                <span className="d-flex align-items-center">
                                                    <p className='mb-1 text-start d-flex align-items-center justify-content-center' style={{ width: "25px" }}><i class="fa-solid fa-briefcase me-2"></i></p>
                                                    <p className='mb-1 text-start d-flex align-items-center'>{item?.ocupation?.name}</p>
                                                </span>
                                                <span className="d-flex align-items-center">
                                                    <p className='mb-1 text-start d-flex align-items-center justify-content-center' style={{ width: "25px" }}><i class="fa-brands fa-whatsapp me-2"></i></p>
                                                    <p className='mb-1 text-start d-flex align-items-center'>{item?.number}</p>
                                                </span>
                                                <span className="d-flex align-items-center">
                                                    <p className='mb-1 text-start d-flex align-items-center justify-content-center' style={{ width: "25px" }}><i class="fa-solid fa-location-dot me-2"></i></p>
                                                    <p className='mb-1 text-start d-flex align-items-center'>{item?.city}</p>
                                                </span>
                                                <p className='mb-1 text-start'><span></span></p>
                                                <p className='mb-1 text-start'><span></span> </p>
                                                {/* <p>  {item?.email} </p>
                                                <p>  {item?.email} </p> */}

                                            </div>
                                        </div>

                                    ))}
                                    {/* <div class="col">
                                        <div class="service-card">
                                            <div class="icon-wrapper">
                                                <i class="fa-solid fa-arrows-down-to-people"></i>
                                            </div>
                                            <h3>Advanced Targeting solution</h3>
                                            <p>
                                                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                                                Quisquam consequatur necessitatibus eaque.
                                            </p>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="service-card">
                                            <div class="icon-wrapper">
                                                <i class="fa-solid fa-globe"></i>
                                            </div>
                                            <h3>Global Reach & Quality Traffic</h3>
                                            <p>
                                                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                                                Quisquam consequatur necessitatibus eaque.
                                            </p>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="service-card">
                                            <div class="icon-wrapper">
                                                <i class="fa-solid fa-money-check-dollar"></i>
                                            </div>
                                            <h3>Flexible pricing models</h3>
                                            <p>
                                                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                                                Quisquam consequatur necessitatibus eaque.
                                            </p>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="service-card">
                                            <div class="icon-wrapper">
                                                <i class="fa-regular fa-circle-check"></i>
                                            </div>
                                            <h3>Advanced optimization technologies & methodologies</h3>
                                            <p>
                                                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                                                Quisquam consequatur necessitatibus eaque.
                                            </p>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="service-card">
                                            <div class="icon-wrapper">
                                                <i class="fa-solid fa-people-group"></i>
                                            </div>
                                            <h3>Dedicated account management team</h3>
                                            <p>
                                                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                                                Quisquam consequatur necessitatibus eaque.
                                            </p>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </section>

                        {/* <div className='row'>
                            <div className='col-md-12'>
                                <h3 className="text-danger fw-bold text-center text-uppercase mb-md-4 mb-3">Tradesperson</h3>


                                <div className="card rounded-4">
                                    <div className="card-body table-responsive">
                                        <table className="table table-hover">
                                            <thead>
                                                <tr>
                                                    <th className='text-warning fw-semibold'>S.No.</th>
                                                    <th className='text-warning fw-semibold'>Name</th>
                                                    <th className='text-warning fw-semibold'>Email</th>
                                                    <th className='text-warning fw-semibold'>Mobile No.</th>
                                                    <th className='text-warning fw-semibold'>Occupation</th>
                                                    <th className='text-warning fw-semibold'>City</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {filteredData?.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{item?.name}</td>
                                                        <td>{item?.email}</td>
                                                        <td>{item?.number}</td>
                                                        <td>{item?.ocupation?.name}</td>
                                                        <td>{item?.city}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </section>
            </main>
        </>
    );
};

export default Home;
