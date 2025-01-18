import React, {useState,useEffect} from "react";

const HrPortfolio = () => {
//   return (
//     <>
//       {/* {window.location.pathname === "/hr/anjalitomar" &&
//         (window.location.href = "/portfolio/html/index.html")} */}
//          <iframe
//         src="/portfolio/html/index.html"
//         width="100%"
//         height="600px"
//         title="Portfolio"
//       ></iframe>
//     </>
//   );
// };
const [htmlContent, setHtmlContent] = useState("");

useEffect(() => {
  fetch("/portfolio/html/index.html")
    .then((response) => response.text())
    .then((data) => setHtmlContent(data));
}, []);

return (
  <div>
    <h1>Loaded HTML Page</h1>
    <div dangerouslySetInnerHTML={{ __html: htmlContent }}></div>
  </div>
);
};

export default HrPortfolio;
