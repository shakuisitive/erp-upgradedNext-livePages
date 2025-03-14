"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../../redux/user/userSlice";
import { redirect, useSearchParams } from "next/navigation";

const LoginForm = () => {
  const dispatch = useDispatch();

  const [check, setCheck] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const apiUrl = `${process.env.NEXT_PUBLIC_REACT_APP_CDN_PATH}oauth/token`;

  let params = new URLSearchParams();
  params.append("grant_type", "password");
  params.append("username", username);
  params.append("password", password);

  function getAllTask(data) {
    let mCheck = data ? true : false;

    const loginData = {
      user: mCheck,
      access_token: data.access_token,
      username: data.USERNAME.toString(),
      use_id: data.USE_ID,
    };
    dispatch(setUser(loginData));

    setCheck(mCheck);

    setErrorMessage(error);
  }

  function sendHttpRequest(
    url,
    method,
    payload = null,
    action,
    accessToken = null,
    key = null
  ) {
    fetch(url, {
      method: method,
      body: payload,

      headers: {
        "Content-Type": "application/json",
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        return response.json();
      })
      .then((data) => {
        action(data, key);
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  }

  const handleLogin = () => {
    sendHttpRequest(apiUrl, "POST", params, getAllTask);
  };

  let bool = useSelector((state) => state.user.user);

  if (check) {
    redirect("/dashboard");
  }
  return (
    <div
      id="login-page"
      className="bg-white flex items-center justify-center min-h-screen"
    >
      <section id="section-login" className="py-12 w-full max-w-4xl">
        <div className="container mx-auto">
          <div className="px-4 md:px-0">
            <h1 className="text-4xl text-blue-600 mb-8 text-center">
              Secure Checkout
            </h1>

            <div className="md:flex">
              <div className="md:w-1/2 pr-8 mb-8">
                <p className="text-gray-600 text-center mb-4">
                  To find inventory and country specific catalogues we need you
                  to select where you are located.
                </p>

                <div className="flex flex-wrap gap-6">
                  <div className="w-full md:w-1/2">
                    <button className="bg-white border border-gray-300 rounded-lg shadow-md p-4 w-full">
                      <img
                        src="/media/login/canada.jpg"
                        alt="Canadian Flag"
                        className="w-24 h-24 mx-auto"
                      />
                      <span className="block text-center mt-2 hover:text-yellow-400">
                        Shop Canadian Site
                      </span>
                    </button>
                  </div>

                  <div className="w-full md:w-1/2">
                    <button className="bg-white border border-gray-300 rounded-lg shadow-md p-4 w-full">
                      <img
                        src="/media/login/america.png"
                        alt="American Flag"
                        className="w-24 h-24 mx-auto"
                      />
                      <span className="block text-center mt-2 hover:text-yellow-400">
                        Shop American Site
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="md:w-1/2 pl-8">
                <div className="md:ml-auto w-full">
                  <h2 className="flex items-center text-2xl mb-8">
                    <i className="fas fa-user-circle text-blue-600 mr-2"></i>{" "}
                    Sign In
                  </h2>
                  <p className="text-gray-600 mb-4">
                    If you have an account, sign in with your email address.
                  </p>

                  <form className="mb-8">
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Username
                      </label>
                      <input
                        type="text"
                        placeholder="Please Enter Your Username"
                        // name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        autoFocus
                        className="mt-1 block w-full mx-1 rounded-full p-2 bg-gray-100 shadow-md focus:outline-none text-customblack"
                      />
                    </div>

                    <div className="mb-4 relative">
                      <label className="block text-sm font-medium text-gray-700">
                        Password
                      </label>
                      <input
                        placeholder="Please Enter Your Password"
                        type="password"
                        // name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="mt-1 block w-full mx-1 rounded-full p-2 bg-gray-100 shadow-md text-customblack focus:outline-none"
                      />
                    </div>

                    <div className="flex gap-4">
                      <button
                        onClick={handleLogin}
                        type="button"
                        className="bg-yellow-400 text-white rounded-full px-4 py-3 w-1/2"
                      >
                        Sign In
                      </button>
                      <div className="text-xs flex items-center justify-end w-1/2">
                        <span className="text-blue-600 cursor-pointer">
                          Forgot Password?
                        </span>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div className="flex items-center mt-8">
              <span className="text-blue-600 text-2xl mr-4">
                <i className="fas fa-lock"></i>
              </span>
              <div>
                <h5 className="text-lg">Security & Privacy</h5>
                <p className="text-sm">
                  Every transaction on naturalcalm.ca is secure. Any personal
                  information you give us will be handled accordingly to our{" "}
                  <a href="#" className="text-blue-600">
                    Privacy Policy
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginForm;

//login code for 2025

// "use client";
// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setUser } from "../../../../redux/user/userSlice";
// import { redirect, useSearchParams } from "next/navigation";
// import useApiFetch from "../../../../customHook/useApiFetch";

// const LoginForm = () => {
//   const dispatch = useDispatch();
//   let [error, sendRequest] = useApiFetch();
//   const [check, setCheck] = useState(false);
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState(null);

//   const apiUrl = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}usermanagement/login`;

//   let params = new URLSearchParams();
//   params.append("grant_type", "password");
//   params.append("username", username);
//   params.append("password", password);

//   let userObj = {
//     username: username,
//     password: password,
//   }

//   function getAllTask(data) {
//     let mCheck = data ? true : false;

//     const loginData = {
//       user: mCheck,
//       access_token: data.access_token,
//       username: data.USERNAME.toString(),
//       use_id: data.USE_ID,
//     };
//     dispatch(setUser(loginData));

//     setCheck(mCheck);

//     setErrorMessage(error);
//   }

//   function sendHttpRequest(
//     url,
//     method,
//     payload = null,
//     action,
//     accessToken = null,
//     key = null
//   ) {
//     fetch(url, {
//       method: method,
//       body: payload,

//       headers: {
//         "Content-Type": "application/json",
//         ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
//       },
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Something went wrong");
//         }
//         return response.json();
//       })
//       .then((data) => {
//         action(data, key);
//       })
//       .catch((error) => {
//         setErrorMessage(error.message);
//       });
//   }

//   const handleLogin = () => {
//     sendRequest(apiUrl, "POST", {username: username, password: password}, getAllTask);
//   };

//   let bool = useSelector((state) => state.user.user);

//   if (check) {
//     redirect("/dashboard");
//   }
//   return (
//     <div
//       id="login-page"
//       className="bg-white flex items-center justify-center min-h-screen"
//     >
//       <section id="section-login" className="py-12 w-full max-w-4xl">
//         <div className="container mx-auto">
//           <div className="px-4 md:px-0">
//             <h1 className="text-4xl text-blue-600 mb-8 text-center">
//               Secure Checkout
//             </h1>

//             <div className="md:flex">
//               <div className="md:w-1/2 pr-8 mb-8">
//                 <p className="text-gray-600 text-center mb-4">
//                   To find inventory and country specific catalogues we need you
//                   to select where you are located.
//                 </p>

//                 <div className="flex flex-wrap gap-6">
//                   <div className="w-full md:w-1/2">
//                     <button className="bg-white border border-gray-300 rounded-lg shadow-md p-4 w-full">
//                       <img
//                         src="/media/login/canada.jpg"
//                         alt="Canadian Flag"
//                         className="w-24 h-24 mx-auto"
//                       />
//                       <span className="block text-center mt-2 hover:text-yellow-400">
//                         Shop Canadian Site
//                       </span>
//                     </button>
//                   </div>

//                   <div className="w-full md:w-1/2">
//                     <button className="bg-white border border-gray-300 rounded-lg shadow-md p-4 w-full">
//                       <img
//                         src="/media/login/america.png"
//                         alt="American Flag"
//                         className="w-24 h-24 mx-auto"
//                       />
//                       <span className="block text-center mt-2 hover:text-yellow-400">
//                         Shop American Site
//                       </span>
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               <div className="md:w-1/2 pl-8">
//                 <div className="md:ml-auto w-full">
//                   <h2 className="flex items-center text-2xl mb-8">
//                     <i className="fas fa-user-circle text-blue-600 mr-2"></i>{" "}
//                     Sign In
//                   </h2>
//                   <p className="text-gray-600 mb-4">
//                     If you have an account, sign in with your email address.
//                   </p>

//                   <form className="mb-8">
//                     <div className="mb-4">
//                       <label className="block text-sm font-medium text-gray-700">
//                         Username
//                       </label>
//                       <input
//                         type="text"
//                         placeholder="Please Enter Your Username"
//                         // name="username"
//                         value={username}
//                         onChange={(e) => setUsername(e.target.value)}
//                         required
//                         autoFocus
//                         className="mt-1 block w-full mx-1 rounded-full p-2 bg-gray-100 shadow-md focus:outline-none text-customblack"
//                       />
//                     </div>

//                     <div className="mb-4 relative">
//                       <label className="block text-sm font-medium text-gray-700">
//                         Password
//                       </label>
//                       <input
//                         placeholder="Please Enter Your Password"
//                         type="password"
//                         // name="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                         className="mt-1 block w-full mx-1 rounded-full p-2 bg-gray-100 shadow-md text-customblack focus:outline-none"
//                       />
//                     </div>

//                     <div className="flex gap-4">
//                       <button
//                         onClick={handleLogin}
//                         type="button"
//                         className="bg-yellow-400 text-white rounded-full px-4 py-3 w-1/2"
//                       >
//                         Sign In
//                       </button>
//                       <div className="text-xs flex items-center justify-end w-1/2">
//                         <span className="text-blue-600 cursor-pointer">
//                           Forgot Password?
//                         </span>
//                       </div>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             </div>

//             <div className="flex items-center mt-8">
//               <span className="text-blue-600 text-2xl mr-4">
//                 <i className="fas fa-lock"></i>
//               </span>
//               <div>
//                 <h5 className="text-lg">Security & Privacy</h5>
//                 <p className="text-sm">
//                   Every transaction on naturalcalm.ca is secure. Any personal
//                   information you give us will be handled accordingly to our{" "}
//                   <a href="#" className="text-blue-600">
//                     Privacy Policy
//                   </a>
//                   .
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default LoginForm;
