import React from "react";
import pageNotFoundImg from "../img/404-ErrorPagenotFound.png"

const PageNotFound = () => {
	return (
		<>
			<div className="container d-flex justify-content-center align-items-center" style={{minHeight:"100vh"}}>
				<img src={pageNotFoundImg} alt="" className="w-50 img-fluid" />
			</div>
		</>
	);
}

export default PageNotFound;