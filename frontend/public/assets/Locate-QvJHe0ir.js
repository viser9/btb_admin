import{r as c,j as o,S as T}from"./index-V_WygqoY.js";import{G as L}from"./index-9e_-FguT.js";import"./__commonjsHelpers__-4gQjN7DL.js";const H=()=>{c.useState("");const[m,g]=c.useState(""),[C,u]=c.useState(!1);let r="",l="";const x=t=>{const a=t.coords.latitude,e=t.coords.longitude;console.log("Printing Positions:"),r=a,l=e,console.log(a),console.log(e),E()},N=t=>{console.log(t)},A=new L("AIzaSyAZd7u_oOGUApMoylIsBERj1TiD6P9ptXc");async function E(){u(!0),g("");const t=[{category:"HARM_CATEGORY_HARASSMENT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_HATE_SPEECH",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_SEXUALLY_EXPLICIT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_DANGEROUS",threshold:"BLOCK_NONE"}],a=A.getGenerativeModel({model:"gemini-pro"});console.log(r),console.log(l);const e="List the all police stations in an area in bangalore called kengeri, give output in tabular format";console.log(e);const i=await(await a.generateContent(e,t)).response,d=await f(i.candidates[0].content.parts[0].text);g(d),u(!1)}const f=async t=>/\|.*\|/.test(t)?await w(t):y(t),w=async t=>{const e=t.split(`
`).filter(s=>s.trim()!==""),h=e[1].includes("---"),[i,...d]=e,p=h?"th":"td",R=i.split("|").filter(s=>s.trim()!=="").map(s=>s.replace(/\\(.?)\\*/g,(n,b)=>`<strong>${b}</strong>`)).map(s=>`<${p} class="table-header text-black">${s.trim()}</${p}>`).join(""),j=d.map(s=>s.split("|").filter(n=>n.trim()!=="").map(n=>n.replace(/\\(.?)\\*/g,(b,_)=>`<strong>${_}</strong>`)).map(n=>`<td class="table-cell text-black">${n.trim()}</td>`).join("")).map(s=>`<tr class="table-row text-black">${s}</tr>`).join("");return`<table class="table table-bordered text-white"><thead>${R}</thead><tbody>${j}</tbody></table>`},y=t=>(t=t.replace(/\\(.?)\\*/g,(a,e)=>`<strong class="font-weight-bold">${e}</strong>`),t=t.replace(/## (.*?)(\n|$)/g,(a,e)=>`<h2 class="mt-4">${e}</h2>`),t=`<div class="normal-text">${t}</div>`,t);return c.useEffect(()=>{navigator.geolocation.getCurrentPosition(x,N,{enableHighAccuracy:!0,timeout:5e3,maximumAge:0})},[]),o.jsx("div",{className:"container mt-5",children:o.jsx("div",{className:"row justify-content-center",children:o.jsxs("div",{className:"col-md-6",style:{marginTop:"20%"},children:[o.jsx("h1",{className:"text-center",children:"          "}),r&&l&&o.jsxs("div",{className:"text-center",children:[o.jsxs("p",{className:"mb-1",children:["Latitude: ",r]}),o.jsxs("p",{className:"mb-4",children:["Longitude: ",l]})]}),o.jsx("div",{className:"mt-3",children:m?o.jsx("div",{className:"text-white",dangerouslySetInnerHTML:{__html:m}}):o.jsx("p",{className:"text-white",children:"No response found."})}),o.jsx(T,{})]})})})};export{H as default};