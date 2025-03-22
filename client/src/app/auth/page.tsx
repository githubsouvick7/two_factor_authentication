// "use client";

// import { CheckCircle, Shield } from "lucide-react";
// import { useState } from "react";
// import LoginPage from "./login";
// import SignupPage from "./register";

// const Page: React.FC = () => {
//   const [state, setState] = useState<string>("login");

//   return (
//     <div className="min-h-screen w-full flex bg-gradient-to-br from-purple-100 to-blue-50">
//       <div className="hidden md:block w-1/2 bg-cover bg-center">
//         <div className="h-full w-full bg-black bg-opacity-40 flex items-center justify-center p-12">
//           <div className="text-white">
//             <div className="flex items-center justify-center mb-6">
//               <Shield className="h-16 w-16 text-blue-300 mr-4" />
//               <h2 className="text-4xl font-bold">Secure Access</h2>
//             </div>
//             <p className="text-xl max-w-md mb-8">
//               Your data is protected with enterprise-grade security protocols.
//             </p>

//             <div className="space-y-4">
//               <div className="flex items-center">
//                 <CheckCircle className="h-6 w-6 text-green-400 mr-3" />
//                 <span className="text-lg">End-to-end encryption</span>
//               </div>
//               <div className="flex items-center">
//                 <CheckCircle className="h-6 w-6 text-green-400 mr-3" />
//                 <span className="text-lg">Two-factor authentication</span>
//               </div>
//               <div className="flex items-center">
//                 <CheckCircle className="h-6 w-6 text-green-400 mr-3" />
//                 <span className="text-lg">ISO 27001 certified</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="w-full md:w-1/2 flex items-center justify-center p-4">
//         {state === "login" ? (
//           <LoginPage setState={setState} />
//         ) : (
//           <SignupPage setState={setState} />
//         )}
//       </div>
//     </div>
//   );
// };

// export default Page;

"use client";

import { CheckCircle, Shield } from "lucide-react";
import { useState } from "react";
import LoginPage from "./login";
import SignupPage from "./register";

const Page: React.FC = () => {
  const [state, setState] = useState<string>("login");

  return (
    <div className="min-h-screen w-full flex bg-gradient-to-br from-purple-100 to-blue-50">
      {/* Security Info Section */}
      <div className="hidden md:block w-1/2 bg-cover bg-center">
        <div className="h-full w-full bg-black bg-opacity-40 flex items-center justify-center p-12">
          <div className="text-white">
            <div className="flex items-center  mb-6">
              <Shield className="h-16 w-16 text-blue-300 mr-4" />
              <h2 className="text-4xl font-bold">Secure Access</h2>
            </div>
            <p className="text-xl max-w-md mb-8">
              Your data is protected with enterprise-grade security protocols.
            </p>

            <div className="space-y-4">
              <div className="flex items-center">
                <CheckCircle className="h-6 w-6 text-green-400 mr-3" />
                <span className="text-lg">End-to-end encryption</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-6 w-6 text-green-400 mr-3" />
                <span className="text-lg">Two-factor authentication</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-6 w-6 text-green-400 mr-3" />
                <span className="text-lg">ISO 27001 certified</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Auth Forms Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4">
        {state === "login" ? (
          <LoginPage setState={setState} />
        ) : (
          <SignupPage setState={setState} />
        )}
      </div>
    </div>
  );
};

export default Page;
