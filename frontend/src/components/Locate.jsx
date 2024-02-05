import React, { useEffect, useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import Particles from 'react-tsparticles';
const Locate = () => {
//   const [latitude, setLatitude] = useState('');
//   const [longitude, setLongitude] = useState('');
  const [search, setSearch] = useState('');
  const [aiResponse, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  let latitude='';
  let longitude='';

  const successCallback = (position) => {
    const newLatitude = position.coords.latitude;
    const newLongitude = position.coords.longitude;
    // setLatitude(newLatitude);
    // setLongitude(newLongitude);
    console.log("Printing Positions:");
    latitude=newLatitude;
    longitude=newLongitude;
    console.log(newLatitude);
    console.log(newLongitude);
    aiRun();

  };

  const errorCallback = (error) => {
    console.log(error);
  };
  const genAI = new GoogleGenerativeAI('AIzaSyAZd7u_oOGUApMoylIsBERj1TiD6P9ptXc');

    async function aiRun() {
        setLoading(true);
        setResponse('');
        const safety_settings=[
          {
              "category": "HARM_CATEGORY_HARASSMENT",
              "threshold": "BLOCK_NONE",
          },
          {
              "category": "HARM_CATEGORY_HATE_SPEECH",
              "threshold": "BLOCK_NONE",
          },
          {
            "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            "threshold": "BLOCK_NONE",
          },
          {
              "category": "HARM_CATEGORY_DANGEROUS",
              "threshold": "BLOCK_NONE",
          }];
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        console.log(latitude);
        console.log(longitude);
        const prompt = `List the all police stations in an area in bangalore called kengeri, give output in tabular format`;
        console.log(prompt);
        const result = await model.generateContent(prompt,safety_settings
            );
        const response = await result.response;
        const text = await formatResponse(response.candidates[0].content.parts[0].text);
        setResponse(text);
        setLoading(false);
    }
    
    const handleChangeSearch = (e) => {
        setSearch(e.target.value);
    }

    const handleClick = () => {
        aiRun();
    }

    const formatResponse = async (response) => {
        // Check if the response contains a pattern indicative of a table
        if (/\|.*\|/.test(response)) {
            // Convert Markdown table to HTML table
            const htmlTable = await markdownTableToHtml(response);
            return htmlTable;
        } else {
            // Format simple text, bold words, and headings
            return formatText(response);
        }
    }

    const markdownTableToHtml = async (markdownTable) => {
        // Split the table content into rows
        const rows = markdownTable.split('\n');
      
        // Remove empty rows
        const nonEmptyRows = rows.filter(row => row.trim() !== '');
      
        // Determine if the table has a header row
        const hasHeader = nonEmptyRows[1].includes('---');
      
        // Extract header and body rows
        const [headerRow, ...bodyRows] = nonEmptyRows;
      
        // Determine the tag for the header row
        const headerTag = hasHeader ? 'th' : 'td';
      
        // Process header row
        const headers = headerRow
          .split('|')
          .filter(cell => cell.trim() !== '')
          .map(header => {
            // Check for bolded text within header cell
            return header.replace(/\\(.?)\\*/g, (match, boldText) => {
              return `<strong>${boldText}</strong>`;
            });
          })
          .map(header => `<${headerTag} class="table-header text-black">${header.trim()}</${headerTag}>`)
          .join('');
      
        // Process body rows
        const body = bodyRows
          .map(row =>
            row
              .split('|')
              .filter(cell => cell.trim() !== '')
              .map(cell => {
                // Check for bolded text within body cell
                return cell.replace(/\\(.?)\\*/g, (match, boldText) => {
                  return `<strong>${boldText}</strong>`;
                });
              })
              .map(cell => `<td class="table-cell text-black">${cell.trim()}</td>`)
              .join('')
          )
          .map(row => `<tr class="table-row text-black">${row}</tr>`)
          .join('');
      
        // Create HTML table with Bootstrap styling and white text
        return `<table class="table table-bordered text-white"><thead>${headers}</thead><tbody>${body}</tbody></table>`;
      };
      
      

    const formatText = (text) => {
        // Use regular expression to replace *bold* with <strong>bold</strong>
        text = text.replace(/\\(.?)\\*/g, (match, boldText) => {
            return `<strong class="font-weight-bold">${boldText}</strong>`;
        });
  
        // Use regular expression to replace ## Heading with <h2>Heading</h2>
        text = text.replace(/## (.*?)(\n|$)/g, (match, headingText) => {
            return `<h2 class="mt-4">${headingText}</h2>`;
        });
  
            text = `<div class="normal-text">${text}</div>`;
            return text;
  
    }
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    });
  }, []); // empty dependency array ensures that it only runs once when the component mounts

  return (
    <div className="container mt-5">
  <div className="row justify-content-center">
    <div className="col-md-6" style={{marginTop:'20%'}}>
      <h1 className="text-center">          </h1>
      {latitude && longitude && (
        <div className="text-center">
          <p className="mb-1">Latitude: {latitude}</p>
          <p className="mb-4">Longitude: {longitude}</p>
        </div>
      )}
      <div className="mt-3">
        {aiResponse ? (
          <div className="text-white" dangerouslySetInnerHTML={{ __html: aiResponse }} />
        ) : (
          <p className="text-white">No response found.</p>
        )}
      </div>
      <Particles />
    </div>
  </div>
</div>


  );
};

export default Locate;