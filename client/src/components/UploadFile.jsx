// import React from "react";
// import UploadFileIcon from '@mui/icons-material/UploadFile';
// import PublishIcon from '@mui/icons-material/Publish';

// const UploadFile = () => {
// const HandleFileUpload = ()=>{
//     const el = document.createElement("input")
//     el.setAttribute('type','file')
//     el.setAttribute('accept', 'application/pdf')
//     el.addEventListener('change', (ev)=>{
//             const file = el.files.item(0);
//         if(file){
//             const formData = new FormData();
//             formData.append('pdf', file);

//             fetch("http://localhost:8000/upload/pdf",{
//                 method: 'POST',
//                 body : formData
//             })
//             console.log("file Uploaded")
//         }
//     })
//     el.click()


// }

//   return (
//     <div className=" justify-center items-center flex flex-col text-white">
//         <div onClick={HandleFileUpload} className="bg-blue-950 border border-white rounded-lg p-4 m-4 flex flex-col items-center">
//         <h3 className="max-w-30">Upload Your File</h3>
//     <PublishIcon className="max-w-80 max-h-40"/>
//     </div>
//     </div>
//   );
// };

// export default UploadFile;





import React from "react";
import PublishIcon from "@mui/icons-material/Publish";

const UploadFile = () => {
  const HandleFileUpload = () => {
    const el = document.createElement("input");
    el.setAttribute("type", "file");
    el.setAttribute("accept", "application/pdf");
    el.addEventListener("change", () => {
      const file = el.files.item(0);
      if (file) {
        const formData = new FormData();
        formData.append("pdf", file);

        fetch("http://localhost:8000/upload/pdf", {
          method: "POST",
          body: formData,
        });
        console.log("file Uploaded");
      }
    });
    el.click();
  };

  return (
    <div
      onClick={HandleFileUpload}
      className="cursor-pointer bg-gray-800 border border-gray-700 rounded-xl p-6 flex flex-col items-center justify-center hover:border-blue-500 hover:bg-gray-700 transition"
    >
      <PublishIcon className="text-blue-400 text-5xl mb-3" />
      <h3 className="text-lg font-medium text-white">Upload Your PDF</h3>
      <p className="text-gray-400 text-sm mt-2">Click to select a file</p>
    </div>
  );
};

export default UploadFile;

