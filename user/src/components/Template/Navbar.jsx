import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <>
            <div className="container-fluid shadow bg-white position-fixed w-100 start-0 top-0" style={{zIndex:"1111"}}>
                <nav class="navbar navbar-expand-lg">
                    <div class="container-fluid">
                        <Link class="navbar-brand text-warning" to="#">Sanstha Vishwam</Link>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div class="navbar-nav ms-auto">
                                <Link class="nav-link active" aria-current="page" to="#">Home</Link>
                                <Link class="nav-link" to="#">Features</Link>
                                <Link class="nav-link" to="#">Pricing</Link>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    )
}

export default Navbar