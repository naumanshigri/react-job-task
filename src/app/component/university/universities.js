import React, { useState, useEffect } from "react";
import axios from "axios";
import University from './university'
import { baseUrl } from "../../../config";


const UniversityList = () => {
  const [userData, setUserData] = useState()
//   const [userId, setuserId] = useState()
  const [totalCount, setTotalCount] = useState()

  useEffect(() => {
   
    axios.get(`${baseUrl}/api/university/list`).then(res => {
          console.log('the user response in admin *****', res)
      let result = res.data.body.university
      console.log('the result', result)
      let totalCount = res.data.body.totalItems
          console.log('thetotlaCount *****', totalCount)
      setTotalCount(totalCount)
    //   const userId = localStorage.getItem("userId");
    //       console.log(' ****** userid ', userId )
    //   setuserId(userId)
      setUserData(result)
  
    })

      },[])

  return (
    <div>
      <div className="UniversityComponet">
          <div className="page-header">
                <h3 className="page-title "> University: <span className="totalCount">( {totalCount} )</span> </h3>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>University</a></li>
                    <li className="breadcrumb-item active" aria-current="page">List</li>
                    </ol>
                </nav>
          </div>
            <div className="row">
                { userData && userData.length ?
                            userData.map((university) => (
                            <University
                            key={university._id}
                            id={university._id}
                            name={university.name}
                            website={university.website}
                            city={university.city}
                            logo={university.logo}
                            country={university.countryId}
                            />
                        )) 
                        : null}
            </div>

      </div>

    </div>
  );
}

export default UniversityList