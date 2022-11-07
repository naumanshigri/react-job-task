import React from "react";

const User = (props) =>{
    return (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3, col-xl-2">
                <div className="user-card">
                    <img className="image" src={props.image} alt="User Profile Image" />
                    <div className="user-name text-center"> {props.name} </div>
                </div>
            </div>
    )
}

export default User