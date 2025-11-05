// import React from 'react'
// import "./App.css"
// // import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
// // import SignIn from './components/SignInPage'
// // import SignUp from './components/SignUpPage'
// import UploadFile from './components/uploadFile'
// import ChatBox from './components/ChatBox'
// const App = () => {
//   // const user_logged = false
//   return (
//     // <div className='bg-slate-900 h-[100vh] flex flex-row' >
//       <div className='border-r border-t border-white w-[50%] flex items-center justify-center'>
//         <UploadFile/>
//       </div>

//        {/* Right: Chat */}
//       <div className="w-[80%] flex">
//         <ChatBox />
//       </div>
      
//           </div>
//   )
// }

// export default App




import React from "react";
import "./App.css";
import UploadFile from './components/uploadFile'
import ChatBox from "./components/ChatBox.jsx";

const App = () => {
  return (
    <div className="bg-slate-900 h-screen flex">
      {/* Sidebar Upload */}
      <div className="w-[25%] border-r border-gray-700 flex items-center justify-center p-4">
        <UploadFile />
      </div>

      {/* Chat Section */}
      <div className="flex-1 flex flex-col">
        <ChatBox />
      </div>
    </div>
  );
};

export default App;

