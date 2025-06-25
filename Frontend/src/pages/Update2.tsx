// import React, { useRef, useEffect, useState } from "react";
// import Header from "@editorjs/header";
// import List from "@editorjs/list";
// import InlineCode from "@editorjs/inline-code";
// import EditorJS, { EditorConfig } from "@editorjs/editorjs";
// import Paragraph from "@editorjs/paragraph";
// import ImageTool from "@editorjs/image";

// window.onerror = (error) => {
//   console.log("Error:", error);
//   return true;
// };

// export default function App() {
//   const editorRef = useRef<EditorJS | null>(null);
//   const editorContainerRef = useRef<HTMLDivElement | null>(null);
//   const [previewData, setPreviewData] = useState<string>("Preview");

//   useEffect(() => {
//     if (!editorContainerRef.current) return;

//     try {
//       editorRef.current = new EditorJS({
//         holder: editorContainerRef.current,

//         onReady: () => {
//           console.log("Editor is ready");
//         },
//         onChange: async () => {
//           try {
//             const savedData = await editorRef.current?.save();
//             console.log("Content updated:", savedData);
//           } catch (error) {
//             console.log("Error saving content:", error);
//           }
//         },
//       });
//     } catch (error) {
//       console.log("Editor Initialization Error:", error);
//     }

//     return () => {
//       if (editorRef.current) {
//         editorRef.current.destroy();
//         editorRef.current = null;
//       }
//     };
//   }, []);

//   const save = async () => {
//     if (editorRef.current) {
//       try {
//         const outputData = await editorRef.current.save();
//         console.log("Article data:", outputData);
//         setPreviewData(JSON.stringify(outputData, null, 2));
//       } catch (error) {
//         console.log("Saving failed:", error);
//       }
//     }
//   };
//   const [editorData, setEditorData] = useState(null);

//   const handleEditorChange = (content: any) => {
//     setEditorData(content);
//   };
//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>EditorJS with Image Upload</h1>
//       <button onClick={save}>Save</button>
//       {/* <div
//         ref={editorContainerRef}
//         style={{
//           padding: "10px",
//           minHeight: "200px",
//           marginBottom: "20px",
//           border: "1px solid #ccc",
//         }}
//       /> */}
//       <Editor data={editorData} onChange={handleEditorChange} />
//       <div id="preview" style={{ whiteSpace: "pre-wrap", marginTop: "20px" }}>
//         <h2>Preview Data:</h2>
//         {previewData}
//       </div>
//     </div>
//   );
// }

// // interface EditorProps {
// //   onChange?: (data: any) => void;
// //   data?: any;
// //   holderId?: string;
// // }
// // const Editor: React.FC<EditorProps> = ({
// //   onChange,
// //   data,
// //   holderId = "editorjs",
// // }) => {
// //   const editorInstance = useRef<EditorJS | null>(null);
// //   const [isReady, setIsReady] = useState(false);

// //   useEffect(() => {
// //     const initializeEditor = async () => {
// //       if (editorInstance.current) {
// //         return;
// //       }

// //       const editorConfig: EditorConfig = {
// //         holder: holderId,
// //         tools: {
// //           header: Header,
// //           //   list: List,
// //         },
// //         data: data,
// //         onChange: async () => {
// //           if (onChange && editorInstance.current) {
// //             const savedData = await editorInstance.current.save();
// //             onChange(savedData);
// //           }
// //         },
// //         onReady: () => {
// //           setIsReady(true);
// //           editorInstance.current?.focus();
// //         },
// //       };

// //       editorInstance.current = new EditorJS(editorConfig);
// //     };

// //     initializeEditor();

// //     return () => {
// //       if (editorInstance.current && editorInstance.current.destroy) {
// //         editorInstance.current.destroy();
// //         editorInstance.current = null;
// //         setIsReady(false);
// //       }
// //     };
// //   }, [data, onChange, holderId]);

// //   return <div id={holderId}></div>;
// // };
// import React, { ChangeEvent, useEffect, useRef, useState } from "react";
// import EditorJS from "@editorjs/editorjs";
// import Header from "@editorjs/header";
// import { createReactEditorJS } from "react-editor-js";
// import { BACKEND_URL } from "../config";
// const ReactEditorJS = createReactEditorJS();
// const DEFAULT_INITIAL_DATA = {
//   time: new Date().getTime(),
//   blocks: [
//     {
//       type: "header",
//       data: {
//         text: "This is my awesome editor!",
//         level: 1,
//       },
//     },
//   ],
// };
// export default function () {
//   const [data, setData] = useState(DEFAULT_INITIAL_DATA);

//   return (
//     <div>
//       <Editor
//         data={DEFAULT_INITIAL_DATA}
//         onChange={setData}
//         editorBlock="editorjs-container"
//       />
//       <button onClick={() => console.log(data)}>Save Data</button>
//       <div>{JSON.stringify(data)}</div>
//     </div>
//   );
// }
// type editorProps = {
//   data: any;
//   onchange: React.Dispatch<React.SetStateAction<any>>;
//   editorBlock: string;
// };

// const Editor = ({ data, onChange, editorBlock }: editorProps) => {
//   const ref = useRef<EditorJS | null>(null);

//   useEffect(() => {
//     if (!ref.current) {
//       const editor = new EditorJS({
//         holder: editorBlock,
//         data: data,
//         tools: {
//           header: {
//             class: Header,
//             config: {
//               placeholder: "Enter a header",
//               levels: [2, 3, 4],
//               defaultLevel: 3,
//             },
//           },
//           paragraph: {
//             class: Paragraph,
//             inlineToolbar: true,
//             config: {
//               placeholder: "Start writing from...",
//             },
//           },
//           image: {
//             class: ImageTool,
//             config: {
//               // Configure the endpoint for file uploads
//               endpoints: {
//                 byFile: `${BACKEND_URL}/api/v1/blog/upload-temp`, // Your backend endpoint
//               },
//               additionalRequestHeaders: {
//                 Authorization: "Bearer " + localStorage.getItem("token"),
//               },
//             },
//           },
//         },
//         async onChange(api, event) {
//           const data = await api.saver.save();
//           onChange(data);
//         },
//       });
//       ref.current = editor;
//     }

//     return () => {
//       if (ref.current && ref.current.destroy) {
//         ref.current.destroy();
//       }
//     };
//   }, []);

//   return <div id={editorBlock} />;
// };
