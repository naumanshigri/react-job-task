// import React, { useState } from "react";
// import { Link, useHistory } from "react-router-dom";
// import { Form } from "react-bootstrap";
// import axios from "axios";
// import { baseUrl } from "../../config";

// const Login = () => {
//   const [userToken, setUserToken] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");

//   const handleChange = (event) => {
//     let { name, value } = event.target;
//     setUserToken({ ...userToken, [name]: value });
//   };

//   let history = useHistory();
//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     let { email, password } = userToken;

//     let data = {
//       email,
//       password,
//     };
//     try {
//       setError("");
//       let res = await axios.post(`${baseUrl}/api/user/login`, data);
//       let { token, user } = res.data;
//       console.log("res", user);
//       localStorage.setItem("token", token);
//       localStorage.setItem("user", JSON.stringify(user));
//       // history.push("/dashboard");
//     } catch (error) {
//       const { message } = error.response.data;
//       setError(message);
//     }
//   };

//   return (
//     <div className="">
//       <div
//         className="d-flex align-items-center auth px-0"
//         style={{ paddingTop: "200px" }}
//       >
//         <div className="row w-100 mx-0">
//           <div className="col-lg-4 mx-auto">
//             <div className="auth-form-light text-left py-5 px-4 px-sm-5">
//               <div className="brand-logo">
//                 <img
//                   src={
//                     "https://i.ibb.co/Yby500z/pngtree-cartoon-dark-degree-graduation-cap-png-image-2175282-removebg-preview.png"
//                   }
//                   alt="logo"
//                 />
//               </div>
//               <h4 className="loginHeader">Welcome to International Studies</h4>
//               {error && (
//                 <div className="alert-login">
//                   <strong>{error}</strong>
//                 </div>
//               )}

//               <form onSubmit={handleSubmit}>
//                 <Form.Group className="d-flex search-field">
//                   <Form.Control
//                     type="email"
//                     placeholder="Username"
//                     required
//                     size="lg"
//                     name="email"
//                     className="h-auto"
//                     onChange={handleChange}
//                     value={userToken.email}
//                   />
//                 </Form.Group>
//                 <Form.Group className="d-flex search-field">
//                   <Form.Control
//                     type="password"
//                     name="password"
//                     placeholder="Password"
//                     required
//                     size="lg"
//                     className="h-auto"
//                     onChange={handleChange}
//                     value={userToken.password}
//                   />
//                 </Form.Group>
//                 <button
//                   type="submit"
//                   className="btn btn-block btn-icicb auth-form-btn"
//                 >
//                   SIGN IN
//                 </button>
//                 <div className="mt-3"></div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
