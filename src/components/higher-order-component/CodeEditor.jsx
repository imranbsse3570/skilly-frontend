import React, { useState, useEffect, useContext } from "react";
import Editor from "react-simple-code-editor";
import { DropdownButton, Dropdown } from "react-bootstrap";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";

import { executeCode } from "../../services/compiler";
import { AlertDismissibleContext } from "../../App";

const CodeEditor = () => {
  const { showPopup, setShowPopUp, popupData, setPopUpData, style, setStyle } =
    useContext(AlertDismissibleContext);

  const [code, setCode] = useState(`function add(a, b) {\n  return a + b;\n}`);

  const [compilingResult, setCompilingResult] = useState(false);
  const [output, setOutput] = useState("// output");

  const [selectedLanguage, setSelectedLanguage] = useState({
    name: "Java",
    slug: "java",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await executeCode(selectedLanguage.slug, code);
        const { output } = data.data;

        setOutput(output);
      } catch (err) {
        setPopUpData({
          popupType: "danger",
          heading: "Error",
          body: (
            <p>
              Error in execution code
              <br />
              {err.message}
            </p>
          ),
        });
        setShowPopUp(true);
      }
      setCompilingResult(false);
    };

    if (compilingResult) {
      fetchData();
    }
  }, [compilingResult]);

  const language = [
    {
      name: "Java",
      slug: "java",
    },
    {
      name: "C",
      slug: "c",
    },
    {
      name: "C++",
      slug: "cpp",
    },
    {
      name: "PHP",
      slug: "php",
    },
    {
      name: "Python",
      slug: "python3",
    },
    {
      name: "SQL",
      slug: "sql",
    },
    {
      name: "NodeJS",
      slug: "nodejs",
    },
    {
      name: "C#",
      slug: "csharp",
    },
  ];

  return (
    <div className="container py-3">
      <div className="toolbar">
        <div className="">
          <DropdownButton className="d-inline" title={selectedLanguage.name}>
            <Dropdown.ItemText>Languages</Dropdown.ItemText>
            {language.map((lang) => {
              return (
                <Dropdown.Item
                  key={lang.slug}
                  onClick={(e) => setSelectedLanguage(lang)}
                  as="button"
                  value={lang.slug}
                >
                  {lang.name}
                </Dropdown.Item>
              );
            })}
          </DropdownButton>
          <button
            onClick={() => setCompilingResult(true)}
            className="btn btn-primary d-inline ml-2"
          >
            Run
            <i className="fas fa-cog"></i>
          </button>
        </div>
      </div>
      <Editor
        value={code}
        className="box-shadow mt-2 border"
        onValueChange={(code) => setCode(code)}
        padding={10}
        highlight={(code) => highlight(code, languages.js)}
        style={{
          fontFamily: '"Consolas", "Fira Mono", monospace',
          fontSize: 12,
          border: "1px solid #dee2e6!important",
          minHeight: 300,
        }}
      />
      <Editor
        id="output-screen-display"
        value={output}
        className="box-shadow mt-2 border"
        onValueChange={(output) => setOutput(output)}
        highlight={(code) => highlight(code, languages.js)}
        padding={10}
        style={{
          fontFamily: '"Consolas", "Fira Mono", monospace',
          fontSize: 12,
          border: "1px solid #dee2e6!important",
          minHeight: 300,
          color: "#fff",
          backgroundColor: "#000",
        }}
      />
    </div>
  );
};

export default CodeEditor;
