// // // import { useState, useEffect } from "react";
// // // import api from "../utils/api";

// // // const ViewTimeTable = () => {
// // //   // Dropdown States
// // //   const [depts, setDepts] = useState([]);
// // //   const [batches, setBatches] = useState([]);
// // //   const [sections, setSections] = useState([]);
  
// // //   // Selection States
// // //   const [selectedDept, setSelectedDept] = useState("");
// // //   const [selectedBatch, setSelectedBatch] = useState("");
// // //   const [selectedSection, setSelectedSection] = useState("");
// // //   const [semester, setSemester] = useState("1");

// // //   // Data State
// // //   const [timetable, setTimetable] = useState([]);
// // //   const [loading, setLoading] = useState(false);

// // //   // 1. Initial Load: Get Departments
// // //   useEffect(() => {
// // //     api.get("/admin/depts").then(res => setDepts(res.data)).catch(console.error);
// // //   }, []);

// // //   // 2. When Dept changes, load Batches
// // //   useEffect(() => {
// // //     if (selectedDept) {
// // //       api.get("/admin/batches").then(res => {
// // //         // Filter client-side or backend-side. Assuming simple list for now
// // //         const deptBatches = res.data.filter(b => b.dept_id === parseInt(selectedDept) || b.dept_code === getDeptCode(selectedDept));
// // //         setBatches(deptBatches); 
// // //         // Note: Better to filter by ID if your backend allows, otherwise filter strictly
// // //       });
// // //     } else {
// // //       setBatches([]);
// // //     }
// // //   }, [selectedDept]);

// // //   // 3. When Batch changes, load Sections
// // //   useEffect(() => {
// // //     if (selectedBatch) {
// // //       api.get("/admin/sections").then(res => {
// // //         const batchSections = res.data.filter(s => s.batch_id === parseInt(selectedBatch));
// // //         setSections(batchSections);
// // //       });
// // //     } else {
// // //       setSections([]);
// // //     }
// // //   }, [selectedBatch]);

// // //   // Helper to find Dept Code for display
// // //   const getDeptCode = (id) => depts.find(d => d.id == id)?.dept_code;

// // //   // Fetch Timetable
// // //   const fetchTimetable = async () => {
// // //     if (!selectedSection || !semester) return alert("Please select all fields");
// // //     setLoading(true);
// // //     try {
// // //       const res = await api.get(`/common/timetable-by-class`, {
// // //         params: { section_id: selectedSection, semester }
// // //       });
// // //       setTimetable(res.data);
// // //     } catch (err) {
// // //       console.error(err);
// // //       alert("Failed to load timetable");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <div>
// // //       {/* FILTER BAR */}
// // //       <div style={filterContainer}>
// // //         <select style={selectStyle} onChange={e => setSelectedDept(e.target.value)} value={selectedDept}>
// // //           <option value="">Select Dept</option>
// // //           {depts.map(d => <option key={d.id} value={d.id}>{d.dept_name}</option>)}
// // //         </select>

// // //         <select style={selectStyle} onChange={e => setSelectedBatch(e.target.value)} value={selectedBatch} disabled={!selectedDept}>
// // //           <option value="">Select Batch</option>
// // //           {batches.map(b => <option key={b.id} value={b.id}>{b.batch_name}</option>)}
// // //         </select>

// // //         <select style={selectStyle} onChange={e => setSelectedSection(e.target.value)} value={selectedSection} disabled={!selectedBatch}>
// // //           <option value="">Select Section</option>
// // //           {sections.map(s => <option key={s.id} value={s.id}>{s.section_name}</option>)}
// // //         </select>

// // //         <select style={selectStyle} onChange={e => setSemester(e.target.value)} value={semester}>
// // //           {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>Sem {n}</option>)}
// // //         </select>

// // //         <button onClick={fetchTimetable} style={btnStyle}>Load Timetable</button>
// // //       </div>

// // //       {/* TIMETABLE GRID */}
// // //       {loading ? <p>Loading...</p> : (
// // //         timetable.length > 0 ? (
// // //           <div style={{ marginTop: "20px" }}>
// // //             <TimetableGrid data={timetable} />
// // //           </div>
// // //         ) : (
// // //           <div style={emptyState}>
// // //             <p>No timetable data found or no class selected.</p>
// // //           </div>
// // //         )
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // // --- Reusable Grid Component logic ---
// // // const TimetableGrid = ({ data }) => {
// // //   const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
// // //   const slots = [1, 2, 3, 4, 5, 6, 7, 8];

// // //   const getSlotData = (day, slotNum) => {
// // //     return data.find(t => t.day === day && t.slot_number === slotNum);
// // //   };

// // //   return (
// // //     <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "center", border: "1px solid #ddd" }}>
// // //       <thead>
// // //         <tr>
// // //           <th style={thStyle}>Day / Slot</th>
// // //           {slots.map(s => <th key={s} style={thStyle}>{s}</th>)}
// // //         </tr>
// // //       </thead>
// // //       <tbody>
// // //         {days.map(day => (
// // //           <tr key={day}>
// // //             <td style={{ ...tdStyle, fontWeight: "bold", background: "#f9f9f9" }}>{day}</td>
// // //             {slots.map(slot => {
// // //               const entry = getSlotData(day, slot);
// // //               return (
// // //                 <td key={slot} style={tdStyle}>
// // //                   {entry ? (
// // //                     <div style={{ fontSize: "12px" }}>
// // //                       <strong>{entry.course_name}</strong><br/>
// // //                       <span style={{ color: "#666" }}>{entry.faculty_name}</span><br/>
// // //                       <span style={{ color: "#999", fontSize: "10px" }}>{entry.room_info}</span>
// // //                     </div>
// // //                   ) : "-"}
// // //                 </td>
// // //               );
// // //             })}
// // //           </tr>
// // //         ))}
// // //       </tbody>
// // //     </table>
// // //   );
// // // };

// // // // Styles
// // // const filterContainer = {
// // //   display: "flex", gap: "10px", background: "#eee", padding: "15px", borderRadius: "8px", alignItems: "center", flexWrap: "wrap"
// // // };
// // // const selectStyle = { padding: "8px", borderRadius: "4px", border: "1px solid #ccc", flex: 1 };
// // // const btnStyle = { padding: "8px 20px", background: "#AD3A3C", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" };
// // // const emptyState = { textAlign: "center", padding: "40px", color: "#888", fontStyle: "italic" };
// // // const thStyle = { background: "#AD3A3C", color: "white", padding: "10px", border: "1px solid #ddd" };
// // // const tdStyle = { padding: "10px", border: "1px solid #ddd", height: "60px", verticalAlign: "top" };

// // // export default ViewTimeTable;

// // import { useState, useEffect } from "react";
// // import api from "../utils/api";

// // const ViewTimeTable = () => {
// //   // Dropdown States
// //   const [depts, setDepts] = useState([]);
// //   const [batches, setBatches] = useState([]);
// //   const [sections, setSections] = useState([]);
  
// //   // Selection States
// //   const [selectedDept, setSelectedDept] = useState("");
// //   const [selectedBatch, setSelectedBatch] = useState("");
// //   const [selectedSection, setSelectedSection] = useState("");
  
// //   // Date State (Default to current week's Monday)
// //   const [selectedDate, setSelectedDate] = useState(getMonday(new Date()).toISOString().split('T')[0]);

// //   // Data State
// //   const [timetable, setTimetable] = useState([]);
// //   const [loading, setLoading] = useState(false);

// //   // --- HELPERS ---
// //   function getMonday(d) {
// //     d = new Date(d);
// //     var day = d.getDay(),
// //         diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
// //     return new Date(d.setDate(diff));
// //   }

// //   // 1. Initial Load: Get Departments
// //   useEffect(() => {
// //     api.get("/admin/depts").then(res => setDepts(res.data)).catch(console.error);
// //   }, []);

// //   // 2. Load Batches
// //   useEffect(() => {
// //     if (selectedDept) {
// //       api.get("/admin/batches").then(res => {
// //         setBatches(res.data.filter(b => b.dept_id === parseInt(selectedDept)));
// //       });
// //     } else setBatches([]);
// //   }, [selectedDept]);

// //   // 3. Load Sections
// //   useEffect(() => {
// //     if (selectedBatch) {
// //       api.get("/admin/sections").then(res => {
// //         setSections(res.data.filter(s => s.batch_id === parseInt(selectedBatch)));
// //       });
// //     } else setSections([]);
// //   }, [selectedBatch]);

// //   // 4. Fetch Grid (Triggered by button or Section/Date change)
// //   const fetchTimetable = async () => {
// //     if (!selectedSection || !selectedDate) return alert("Please select section and date");
// //     setLoading(true);
    
// //     // Calculate the Monday of the selected date to ensure we get the full week
// //     const mondayDate = getMonday(selectedDate).toISOString().split('T')[0];

// //     try {
// //       // Using the week-grid endpoint which joins timetable with attendance_sessions
// //       const res = await api.get(`/common/week-grid`, {
// //         params: { section_id: selectedSection, start_date: mondayDate }
// //       });
// //       setTimetable(res.data);
// //     } catch (err) {
// //       console.error(err);
// //       alert("Failed to load timetable");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div>
// //       {/* FILTER BAR */}
// //       <div style={filterContainer}>
// //         <div style={{display:'flex', gap:'10px', flexWrap:'wrap', flex:1}}>
// //             <select style={selectStyle} onChange={e => setSelectedDept(e.target.value)} value={selectedDept}>
// //             <option value="">Select Dept</option>
// //             {depts.map(d => <option key={d.id} value={d.id}>{d.dept_name}</option>)}
// //             </select>

// //             <select style={selectStyle} onChange={e => setSelectedBatch(e.target.value)} value={selectedBatch} disabled={!selectedDept}>
// //             <option value="">Select Batch</option>
// //             {batches.map(b => <option key={b.id} value={b.id}>{b.batch_name}</option>)}
// //             </select>

// //             <select style={selectStyle} onChange={e => setSelectedSection(e.target.value)} value={selectedSection} disabled={!selectedBatch}>
// //             <option value="">Select Section</option>
// //             {sections.map(s => <option key={s.id} value={s.id}>{s.section_name}</option>)}
// //             </select>

// //             <div style={{display:'flex', alignItems:'center', gap:'5px'}}>
// //                 <label style={{fontSize:'12px', fontWeight:'bold', color:'#555'}}>Week Of:</label>
// //                 <input 
// //                     type="date" 
// //                     style={selectStyle} 
// //                     value={selectedDate} 
// //                     onChange={e => setSelectedDate(e.target.value)}
// //                 />
// //             </div>
// //         </div>

// //         <button onClick={fetchTimetable} style={btnStyle}>Load View</button>
// //       </div>

// //       {/* LEGEND */}
// //       <div style={{display:'flex', gap:'20px', margin:'15px 0', fontSize:'13px'}}>
// //           <span style={{display:'flex', alignItems:'center', gap:'5px'}}><span style={{...legendDot, background:'#d4edda'}}></span> Normal</span>
// //           <span style={{display:'flex', alignItems:'center', gap:'5px'}}><span style={{...legendDot, background:'#fff3cd'}}></span> Substitute/Swap</span>
// //           <span style={{display:'flex', alignItems:'center', gap:'5px'}}><span style={{...legendDot, background:'#e2e3f5'}}></span> Free Period</span>
// //           <span style={{display:'flex', alignItems:'center', gap:'5px'}}><span style={{...legendDot, background:'#f8d7da'}}></span> Unmarked/Absent</span>
// //       </div>

// //       {/* TIMETABLE GRID */}
// //       {loading ? <p>Loading...</p> : (
// //         timetable.length > 0 ? (
// //           <div style={{ marginTop: "10px" }}>
// //             <TimetableGrid data={timetable} startDate={selectedDate} />
// //           </div>
// //         ) : (
// //           <div style={emptyState}>
// //             <p>Select a class and click "Load View" to see the schedule.</p>
// //           </div>
// //         )
// //       )}
// //     </div>
// //   );
// // };

// // // --- Reusable Grid Component logic ---
// // const TimetableGrid = ({ data, startDate }) => {
// //   const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
// //   const slots = [1, 2, 3, 4, 5, 6, 7, 8, 9]; // 9 Slots

// //   // Helper to calculate date for the specific day row
// //   const getRowDate = (dayName) => {
// //     const inputDate = new Date(startDate);
// //     const dayIndex = ["Mon", "Tue", "Wed", "Thu", "Fri"].indexOf(dayName);
// //     // Adjust input date to Monday, then add index
// //     const monday = new Date(inputDate.setDate(inputDate.getDate() - inputDate.getDay() + 1));
// //     const finalDate = new Date(monday.setDate(monday.getDate() + dayIndex));
// //     return finalDate;
// //   };

// //   const getSlotData = (day, slotNum) => {
// //     return data.find(t => t.day === day && t.slot_number === slotNum);
// //   };

// //   const getCellStyle = (entry, rowDate) => {
// //     // Default Style
// //     let style = { ...tdStyle };
    
// //     if (!entry) return style;

// //     // Logic for Colors based on `session_category` (from backend) or missing data
// //     if (entry.session_category === 'free') {
// //         style.backgroundColor = "#e2e3f5"; // Purple/Blueish for Free
// //         style.color = "#383d41";
// //     } else if (entry.session_category === 'swap') {
// //         style.backgroundColor = "#fff3cd"; // Yellow for Substitute
// //         style.color = "#856404";
// //     } else if (entry.session_category === 'normal') {
// //         style.backgroundColor = "#d4edda"; // Green for Normal
// //         style.color = "#155724";
// //     } else {
// //         // No session data exists. Check if date is in past.
// //         const today = new Date();
// //         today.setHours(0,0,0,0);
// //         if (rowDate < today) {
// //             style.backgroundColor = "#f8d7da"; // Red for "Faculty not come" / Unmarked
// //             style.color = "#721c24";
// //         }
// //     }
// //     return style;
// //   };

// //   return (
// //     <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "center", border: "1px solid #ddd" }}>
// //       <thead>
// //         <tr>
// //           <th style={{...thStyle, width:'100px'}}>Date / Day</th>
// //           {slots.map(s => <th key={s} style={thStyle}>{s}</th>)}
// //         </tr>
// //       </thead>
// //       <tbody>
// //         {days.map(day => {
// //           const rowDate = getRowDate(day);
// //           const dateString = rowDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
          
// //           return (
// //             <tr key={day}>
// //               <td style={{ ...tdStyle, fontWeight: "bold", background: "#f9f9f9", borderRight:'2px solid #ddd' }}>
// //                 <div style={{fontSize:'14px', color:'#333'}}>{day}</div>
// //                 <div style={{fontSize:'11px', color:'#888'}}>{dateString}</div>
// //               </td>
// //               {slots.map(slot => {
// //                 const entry = getSlotData(day, slot);
// //                 const style = getCellStyle(entry, rowDate);

// //                 return (
// //                   <td key={slot} style={style}>
// //                     {entry ? (
// //                       <div style={{ fontSize: "11px", lineHeight: "1.4" }}>
// //                         <strong style={{display:'block', marginBottom:'2px'}}>{entry.course_name}</strong>
// //                         {entry.session_category === 'free' ? (
// //                             <span style={{fontWeight:'bold'}}>FREE PERIOD</span>
// //                         ) : (
// //                             <>
// //                                 <span>{entry.faculty_name}</span>
// //                                 {entry.room_info && <div style={{ fontSize: "9px", opacity: 0.8 }}>({entry.room_info})</div>}
// //                             </>
// //                         )}
// //                       </div>
// //                     ) : "-"}
// //                   </td>
// //                 );
// //               })}
// //             </tr>
// //           );
// //         })}
// //       </tbody>
// //     </table>
// //   );
// // };

// // // Styles
// // const filterContainer = {
// //   display: "flex", gap: "10px", background: "#f5f5f5", padding: "20px", borderRadius: "8px", alignItems: "flex-end", flexWrap: "wrap", border:"1px solid #ddd"
// // };
// // const selectStyle = { padding: "8px", borderRadius: "4px", border: "1px solid #ccc", minWidth: "120px" };
// // const btnStyle = { padding: "10px 25px", background: "#AD3A3C", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold", height:'38px' };
// // const emptyState = { textAlign: "center", padding: "50px", color: "#888", fontStyle: "italic", background:"#fff", border:"1px dashed #ccc", marginTop:"20px" };
// // const thStyle = { background: "#AD3A3C", color: "white", padding: "12px", border: "1px solid #ddd", fontSize: "14px" };
// // const tdStyle = { padding: "8px", border: "1px solid #ddd", height: "70px", verticalAlign: "middle", width: "10%" };
// // const legendDot = { width: "12px", height: "12px", borderRadius: "50%", display: "inline-block", border: "1px solid #ccc" };

// // export default ViewTimeTable;
// import { useState, useEffect } from "react";
// import api from "../utils/api";

// const ViewTimeTable = () => {
//   // Dropdown States
//   const [depts, setDepts] = useState([]);
//   const [batches, setBatches] = useState([]);
//   const [sections, setSections] = useState([]);
  
//   // Selection States
//   const [selectedDept, setSelectedDept] = useState("");
//   const [selectedBatch, setSelectedBatch] = useState("");
//   const [selectedSection, setSelectedSection] = useState("");
//   const [semester, setSemester] = useState("1"); // Added Default Semester
  
//   // Date State (Default to current week's Monday)
//   const [selectedDate, setSelectedDate] = useState(getMonday(new Date()).toISOString().split('T')[0]);

//   // Data State
//   const [timetable, setTimetable] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // --- HELPERS ---
//   function getMonday(d) {
//     d = new Date(d);
//     var day = d.getDay(),
//         diff = d.getDate() - day + (day === 0 ? -6 : 1);
//     return new Date(d.setDate(diff));
//   }

//   // 1. Initial Load: Get Departments
//   useEffect(() => {
//     api.get("/admin/depts").then(res => setDepts(res.data)).catch(console.error);
//   }, []);

//   // 2. Load Batches
//   useEffect(() => {
//     if (selectedDept) {
//       api.get("/admin/batches").then(res => {
//         setBatches(res.data.filter(b => b.dept_id === parseInt(selectedDept)));
//       });
//     } else setBatches([]);
//   }, [selectedDept]);

//   // 3. Load Sections
//   useEffect(() => {
//     if (selectedBatch) {
//       api.get("/admin/sections").then(res => {
//         setSections(res.data.filter(s => s.batch_id === parseInt(selectedBatch)));
//       });
//     } else setSections([]);
//   }, [selectedBatch]);

//   // 4. Fetch Grid
//   const fetchTimetable = async () => {
//     if (!selectedSection || !selectedDate || !semester) return alert("Please select section, semester, and date");
//     setLoading(true);
    
//     const mondayDate = getMonday(selectedDate).toISOString().split('T')[0];

//     try {
//       // We pass semester here as well so the backend can filter the core timetable correctly
//       // Note: The backend endpoint '/api/common/week-grid' might need to accept semester if it doesn't already.
//       // If using the attendance logic, the semester is usually inferred from the section's current state, 
//       // but passing it ensures we see the right slots.
//       const res = await api.get(`/common/week-grid`, {
//         params: { section_id: selectedSection, start_date: mondayDate, semester: semester }
//       });
//       setTimetable(res.data);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to load timetable");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       {/* FILTER BAR */}
//       <div style={filterContainer}>
//         <div style={{display:'flex', gap:'10px', flexWrap:'wrap', flex:1}}>
//             <select style={selectStyle} onChange={e => setSelectedDept(e.target.value)} value={selectedDept}>
//               <option value="">Select Dept</option>
//               {depts.map(d => <option key={d.id} value={d.id}>{d.dept_name}</option>)}
//             </select>

//             <select style={selectStyle} onChange={e => setSelectedBatch(e.target.value)} value={selectedBatch} disabled={!selectedDept}>
//               <option value="">Select Batch</option>
//               {batches.map(b => <option key={b.id} value={b.id}>{b.batch_name}</option>)}
//             </select>

//             <select style={selectStyle} onChange={e => setSelectedSection(e.target.value)} value={selectedSection} disabled={!selectedBatch}>
//               <option value="">Select Section</option>
//               {sections.map(s => <option key={s.id} value={s.id}>{s.section_name}</option>)}
//             </select>

//             {/* ADDED SEMESTER DROPDOWN */}
//             <select style={selectStyle} onChange={e => setSemester(e.target.value)} value={semester}>
//               {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>Sem {n}</option>)}
//             </select>

//             <div style={{display:'flex', alignItems:'center', gap:'5px', background:'white', padding:'0 5px', borderRadius:'4px', border:'1px solid #ccc'}}>
//                 <label style={{fontSize:'12px', fontWeight:'bold', color:'#555', paddingLeft:'5px'}}>Week:</label>
//                 <input 
//                     type="date" 
//                     style={{...selectStyle, border:'none'}} 
//                     value={selectedDate} 
//                     onChange={e => setSelectedDate(e.target.value)}
//                 />
//             </div>
//         </div>

//         <button onClick={fetchTimetable} style={btnStyle}>Load View</button>
//       </div>

//       {/* LEGEND */}
//       <div style={{display:'flex', gap:'20px', margin:'15px 0', fontSize:'13px', padding:'10px', background:'#fff', borderRadius:'4px'}}>
//           <span style={{display:'flex', alignItems:'center', gap:'5px'}}><span style={{...legendDot, background:'#d4edda'}}></span> Normal Class</span>
//           <span style={{display:'flex', alignItems:'center', gap:'5px'}}><span style={{...legendDot, background:'#fff3cd'}}></span> Substitute/Swap</span>
//           <span style={{display:'flex', alignItems:'center', gap:'5px'}}><span style={{...legendDot, background:'#e2e3f5'}}></span> Free Period</span>
//           <span style={{display:'flex', alignItems:'center', gap:'5px'}}><span style={{...legendDot, background:'#f8d7da'}}></span> Unmarked / Absent</span>
//       </div>

//       {/* TIMETABLE GRID */}
//       {loading ? <p>Loading...</p> : (
//         timetable.length > 0 ? (
//           <div style={{ marginTop: "10px" }}>
//             <TimetableGrid data={timetable} startDate={selectedDate} />
//           </div>
//         ) : (
//           <div style={emptyState}>
//             <p>Select criteria and click "Load View".</p>
//           </div>
//         )
//       )}
//     </div>
//   );
// };

// // --- Reusable Grid Component logic ---
// const TimetableGrid = ({ data, startDate }) => {
//   const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
//   const slots = [1, 2, 3, 4, 5, 6, 7, 8, 9]; // 9 Slots

//   const getRowDate = (dayName) => {
//     const inputDate = new Date(startDate);
//     const dayIndex = ["Mon", "Tue", "Wed", "Thu", "Fri"].indexOf(dayName);
//     const monday = new Date(inputDate.setDate(inputDate.getDate() - inputDate.getDay() + 1));
//     const finalDate = new Date(monday.setDate(monday.getDate() + dayIndex));
//     return finalDate;
//   };

//   const getSlotData = (day, slotNum) => {
//     return data.find(t => t.day === day && t.slot_number === slotNum);
//   };

//   const getCellStyle = (entry, rowDate) => {
//     let style = { ...tdStyle };
//     if (!entry) return style;

//     if (entry.session_category === 'free') {
//         style.backgroundColor = "#e2e3f5";
//         style.color = "#383d41";
//     } else if (entry.session_category === 'swap') {
//         style.backgroundColor = "#fff3cd";
//         style.color = "#856404";
//     } else if (entry.session_category === 'normal') {
//         style.backgroundColor = "#d4edda";
//         style.color = "#155724";
//     } else {
//         // Check if date is in past (ignoring time)
//         const today = new Date();
//         today.setHours(0,0,0,0);
//         rowDate.setHours(0,0,0,0);
        
//         if (rowDate < today) {
//             style.backgroundColor = "#f8d7da";
//             style.color = "#721c24";
//         }
//     }
//     return style;
//   };

//   return (
//     <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "center", border: "1px solid #ddd" }}>
//       <thead>
//         <tr>
//           <th style={{...thStyle, width:'100px'}}>Day</th>
//           {slots.map(s => <th key={s} style={thStyle}>{s}</th>)}
//         </tr>
//       </thead>
//       <tbody>
//         {days.map(day => {
//           const rowDate = getRowDate(day);
//           const dateString = rowDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
          
//           return (
//             <tr key={day}>
//               <td style={{ ...tdStyle, fontWeight: "bold", background: "#f9f9f9", borderRight:'2px solid #ddd' }}>
//                 <div style={{fontSize:'14px', color:'#333'}}>{day}</div>
//                 <div style={{fontSize:'11px', color:'#888'}}>{dateString}</div>
//               </td>
//               {slots.map(slot => {
//                 const entry = getSlotData(day, slot);
//                 const style = getCellStyle(entry, rowDate);

//                 return (
//                   <td key={slot} style={style}>
//                     {entry ? (
//                       <div style={{ fontSize: "11px", lineHeight: "1.3" }}>
//                         <strong style={{display:'block'}}>{entry.course_name}</strong>
//                         {entry.session_category === 'free' ? (
//                             <span style={{fontWeight:'bold', fontSize:'10px'}}>FREE</span>
//                         ) : (
//                             <>
//                                 <span style={{fontSize:'10px'}}>{entry.faculty_name}</span>
//                                 {entry.room_info && <div style={{ fontSize: "9px", opacity: 0.7 }}>[{entry.room_info}]</div>}
//                             </>
//                         )}
//                       </div>
//                     ) : "-"}
//                   </td>
//                 );
//               })}
//             </tr>
//           );
//         })}
//       </tbody>
//     </table>
//   );
// };

// // Styles
// const filterContainer = {
//   display: "flex", gap: "10px", background: "#f5f5f5", padding: "15px", borderRadius: "8px", alignItems: "center", flexWrap: "wrap", border:"1px solid #ddd"
// };
// const selectStyle = { padding: "8px", borderRadius: "4px", border: "1px solid #ccc", minWidth: "100px", fontSize:'13px' };
// const btnStyle = { padding: "8px 20px", background: "#AD3A3C", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold", marginLeft:'auto' };
// const emptyState = { textAlign: "center", padding: "50px", color: "#888", fontStyle: "italic", background:"#fff", border:"1px dashed #ccc", marginTop:"20px" };
// const thStyle = { background: "#AD3A3C", color: "white", padding: "8px", border: "1px solid #ddd", fontSize: "13px" };
// const tdStyle = { padding: "5px", border: "1px solid #ddd", height: "60px", verticalAlign: "middle", width: "9.5%" };
// const legendDot = { width: "10px", height: "10px", borderRadius: "50%", display: "inline-block", border: "1px solid #ccc" };

// export default ViewTimeTable;

// import { useState, useEffect } from "react";
// import api from "../utils/api";

// const ViewTimeTable = () => {
//   // Dropdown States
//   const [depts, setDepts] = useState([]);
//   const [batches, setBatches] = useState([]);
//   const [sections, setSections] = useState([]);
  
//   // Selection States
//   const [selectedDept, setSelectedDept] = useState("");
//   const [selectedBatch, setSelectedBatch] = useState("");
//   const [selectedSection, setSelectedSection] = useState("");
//   const [semester, setSemester] = useState("1");
  
//   // Date State
//   const [selectedDate, setSelectedDate] = useState(getMonday(new Date()).toISOString().split('T')[0]);

//   // Data State
//   const [timetable, setTimetable] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // --- MODAL STATE ---
//   const [showModal, setShowModal] = useState(false);
//   const [modalLoading, setModalLoading] = useState(false);
//   const [selectedSlotDetails, setSelectedSlotDetails] = useState(null); // Metadata (Course name, date)
//   const [attendanceRecords, setAttendanceRecords] = useState([]); // List of students

//   // --- HELPERS ---
//   function getMonday(d) {
//     d = new Date(d);
//     var day = d.getDay(),
//         diff = d.getDate() - day + (day === 0 ? -6 : 1);
//     return new Date(d.setDate(diff));
//   }

//   // 1. Initial Load
//   useEffect(() => {
//     api.get("/admin/depts").then(res => setDepts(res.data)).catch(console.error);
//   }, []);

//   // 2. Cascade Dropdowns
//   useEffect(() => {
//     if (selectedDept) {
//       api.get("/admin/batches").then(res => {
//         setBatches(res.data.filter(b => b.dept_id === parseInt(selectedDept)));
//       });
//     } else setBatches([]);
//   }, [selectedDept]);

//   useEffect(() => {
//     if (selectedBatch) {
//       api.get("/admin/sections").then(res => {
//         setSections(res.data.filter(s => s.batch_id === parseInt(selectedBatch)));
//       });
//     } else setSections([]);
//   }, [selectedBatch]);

//   // 4. Fetch Grid
//   const fetchTimetable = async () => {
//     if (!selectedSection || !selectedDate || !semester) return alert("Please select section, semester, and date");
//     setLoading(true);
//     const mondayDate = getMonday(selectedDate).toISOString().split('T')[0];

//     try {
//       const res = await api.get(`/common/week-grid`, {
//         params: { section_id: selectedSection, start_date: mondayDate, semester }
//       });
//       setTimetable(res.data);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to load timetable");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 5. HANDLE SLOT CLICK
//   const handleSlotClick = async (entry, dateString) => {
//     if (!entry) return;

//     // Case 1: Free Period
//     if (entry.session_category === 'free') {
//         alert("This period was declared as FREE. No attendance records exist.");
//         return;
//     }

//     // Case 2: No Session ID (Unmarked or Future)
//     if (!entry.session_id) {
//         alert("Attendance has not been marked for this slot yet.");
//         return;
//     }

//     // Case 3: Valid Session - Fetch Data
//     setShowModal(true);
//     setModalLoading(true);
//     setSelectedSlotDetails({
//         course: entry.course_name,
//         faculty: entry.faculty_name,
//         date: dateString,
//         type: entry.session_category
//     });

//     try {
//         const res = await api.get(`/admin/records-by-session/${entry.session_id}`);
//         setAttendanceRecords(res.data);
//     } catch (err) {
//         console.error(err);
//         alert("Failed to fetch student records");
//         setShowModal(false);
//     } finally {
//         setModalLoading(false);
//     }
//   };

//   return (
//     <div>
//       {/* FILTER BAR */}
//       <div style={filterContainer}>
//         <div style={{display:'flex', gap:'10px', flexWrap:'wrap', flex:1}}>
//             <select style={selectStyle} onChange={e => setSelectedDept(e.target.value)} value={selectedDept}>
//               <option value="">Select Dept</option>
//               {depts.map(d => <option key={d.id} value={d.id}>{d.dept_name}</option>)}
//             </select>

//             <select style={selectStyle} onChange={e => setSelectedBatch(e.target.value)} value={selectedBatch} disabled={!selectedDept}>
//               <option value="">Select Batch</option>
//               {batches.map(b => <option key={b.id} value={b.id}>{b.batch_name}</option>)}
//             </select>

//             <select style={selectStyle} onChange={e => setSelectedSection(e.target.value)} value={selectedSection} disabled={!selectedBatch}>
//               <option value="">Select Section</option>
//               {sections.map(s => <option key={s.id} value={s.id}>{s.section_name}</option>)}
//             </select>

//             <select style={selectStyle} onChange={e => setSemester(e.target.value)} value={semester}>
//               {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>Sem {n}</option>)}
//             </select>

//             <div style={{display:'flex', alignItems:'center', gap:'5px', background:'white', padding:'0 5px', borderRadius:'4px', border:'1px solid #ccc'}}>
//                 <label style={{fontSize:'12px', fontWeight:'bold', color:'#555', paddingLeft:'5px'}}>Week:</label>
//                 <input type="date" style={{...selectStyle, border:'none'}} value={selectedDate} onChange={e => setSelectedDate(e.target.value)}/>
//             </div>
//         </div>
//         <button onClick={fetchTimetable} style={btnStyle}>Load View</button>
//       </div>

//       {/* LEGEND */}
//       <div style={{display:'flex', gap:'20px', margin:'15px 0', fontSize:'13px', padding:'10px', background:'#fff', borderRadius:'4px'}}>
//           <span style={{display:'flex', alignItems:'center', gap:'5px'}}><span style={{...legendDot, background:'#d4edda'}}></span> Normal</span>
//           <span style={{display:'flex', alignItems:'center', gap:'5px'}}><span style={{...legendDot, background:'#fff3cd'}}></span> Swap</span>
//           <span style={{display:'flex', alignItems:'center', gap:'5px'}}><span style={{...legendDot, background:'#e2e3f5'}}></span> Free</span>
//           <span style={{display:'flex', alignItems:'center', gap:'5px'}}><span style={{...legendDot, background:'#f8d7da'}}></span> Unmarked</span>
//           <span style={{marginLeft:'auto', color:'#666', fontStyle:'italic'}}>* Click a slot to view attendance details</span>
//       </div>

//       {/* TIMETABLE GRID */}
//       {loading ? <p>Loading...</p> : (
//         timetable.length > 0 ? (
//           <div style={{ marginTop: "10px" }}>
//             <TimetableGrid data={timetable} startDate={selectedDate} onSlotClick={handleSlotClick} />
//           </div>
//         ) : (
//           <div style={emptyState}>
//             <p>Select criteria and click "Load View".</p>
//           </div>
//         )
//       )}

//       {/* ATTENDANCE MODAL */}
//       {showModal && (
//         <div style={modalOverlay}>
//             <div style={modalContent}>
//                 <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'15px', borderBottom:'1px solid #eee', paddingBottom:'10px'}}>
//                     <h3 style={{margin:0, color:'#AD3A3C'}}>Attendance Details</h3>
//                     <button onClick={() => setShowModal(false)} style={{background:'none', border:'none', fontSize:'18px', cursor:'pointer'}}>×</button>
//                 </div>
                
//                 {selectedSlotDetails && (
//                     <div style={{marginBottom:'15px', fontSize:'14px', color:'#555'}}>
//                         <p style={{margin:'5px 0'}}><strong>Course:</strong> {selectedSlotDetails.course}</p>
//                         <p style={{margin:'5px 0'}}><strong>Faculty:</strong> {selectedSlotDetails.faculty}</p>
//                         <p style={{margin:'5px 0'}}><strong>Date:</strong> {selectedSlotDetails.date}</p>
//                         <p style={{margin:'5px 0'}}><strong>Type:</strong> <span style={{textTransform:'capitalize'}}>{selectedSlotDetails.type}</span></p>
//                     </div>
//                 )}

//                 {modalLoading ? <p>Loading records...</p> : (
//                     <div style={{maxHeight:'400px', overflowY:'auto'}}>
//                         <table style={{width:'100%', borderCollapse:'collapse', fontSize:'13px'}}>
//                             <thead style={{position:'sticky', top:0, background:'#eee'}}>
//                                 <tr>
//                                     <th style={modalTh}>Roll No</th>
//                                     <th style={modalTh}>Name</th>
//                                     <th style={modalTh}>Status</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {attendanceRecords.map((rec, idx) => (
//                                     <tr key={idx} style={{background: idx % 2 === 0 ? '#fff' : '#f9f9f9'}}>
//                                         <td style={modalTd}>{rec.roll_number}</td>
//                                         <td style={modalTd}>{rec.full_name}</td>
//                                         <td style={modalTd}>
//                                             <span style={{
//                                                 padding:'3px 8px', borderRadius:'10px', fontSize:'11px', fontWeight:'bold',
//                                                 background: rec.status === 'Present' ? '#d4edda' : '#f8d7da',
//                                                 color: rec.status === 'Present' ? '#155724' : '#721c24'
//                                             }}>
//                                                 {rec.status}
//                                             </span>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                         {attendanceRecords.length === 0 && <p style={{textAlign:'center', color:'#999'}}>No students found.</p>}
//                     </div>
//                 )}
//             </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // --- GRID COMPONENT ---
// const TimetableGrid = ({ data, startDate, onSlotClick }) => {
//   const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
//   const slots = [1, 2, 3, 4, 5, 6, 7, 8, 9];

//   const getRowDate = (dayName) => {
//     const inputDate = new Date(startDate);
//     const dayIndex = ["Mon", "Tue", "Wed", "Thu", "Fri"].indexOf(dayName);
//     const monday = new Date(inputDate.setDate(inputDate.getDate() - inputDate.getDay() + 1));
//     return new Date(monday.setDate(monday.getDate() + dayIndex));
//   };

//   const getSlotData = (day, slotNum) => data.find(t => t.day === day && t.slot_number === slotNum);

//   const getCellStyle = (entry, rowDate) => {
//     let style = { ...tdStyle, cursor: entry ? "pointer" : "default" }; // Add pointer cursor
//     if (!entry) return style;

//     if (entry.session_category === 'free') {
//         style.backgroundColor = "#e2e3f5";
//         style.color = "#383d41";
//     } else if (entry.session_category === 'swap') {
//         style.backgroundColor = "#fff3cd";
//         style.color = "#856404";
//     } else if (entry.session_category === 'normal') {
//         style.backgroundColor = "#d4edda";
//         style.color = "#155724";
//     } else {
//         const today = new Date();
//         today.setHours(0,0,0,0);
//         rowDate.setHours(0,0,0,0);
//         if (rowDate < today) {
//             style.backgroundColor = "#f8d7da";
//             style.color = "#721c24";
//         }
//     }
//     return style;
//   };

//   return (
//     <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "center", border: "1px solid #ddd" }}>
//       <thead>
//         <tr>
//           <th style={{...thStyle, width:'100px'}}>Day</th>
//           {slots.map(s => <th key={s} style={thStyle}>{s}</th>)}
//         </tr>
//       </thead>
//       <tbody>
//         {days.map(day => {
//           const rowDate = getRowDate(day);
//           const dateString = rowDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year:'numeric' });
          
//           return (
//             <tr key={day}>
//               <td style={{ ...tdStyle, fontWeight: "bold", background: "#f9f9f9", borderRight:'2px solid #ddd', cursor:'default' }}>
//                 <div style={{fontSize:'14px', color:'#333'}}>{day}</div>
//                 <div style={{fontSize:'11px', color:'#888'}}>{dateString}</div>
//               </td>
//               {slots.map(slot => {
//                 const entry = getSlotData(day, slot);
//                 const style = getCellStyle(entry, rowDate);

//                 return (
//                   <td 
//                     key={slot} 
//                     style={style} 
//                     onClick={() => onSlotClick(entry, dateString)} // Click Handler
//                     title={entry ? "Click to view attendance" : ""}
//                   >
//                     {entry ? (
//                       <div style={{ fontSize: "11px", lineHeight: "1.3" }}>
//                         <strong style={{display:'block'}}>{entry.course_name}</strong>
//                         {entry.session_category === 'free' ? (
//                             <span style={{fontWeight:'bold', fontSize:'10px'}}>FREE</span>
//                         ) : (
//                             <>
//                                 <span style={{fontSize:'10px'}}>{entry.faculty_name}</span>
//                                 {entry.room_info && <div style={{ fontSize: "9px", opacity: 0.7 }}>[{entry.room_info}]</div>}
//                             </>
//                         )}
//                       </div>
//                     ) : "-"}
//                   </td>
//                 );
//               })}
//             </tr>
//           );
//         })}
//       </tbody>
//     </table>
//   );
// };

// // Styles
// const filterContainer = { display: "flex", gap: "10px", background: "#f5f5f5", padding: "15px", borderRadius: "8px", alignItems: "center", flexWrap: "wrap", border:"1px solid #ddd" };
// const selectStyle = { padding: "8px", borderRadius: "4px", border: "1px solid #ccc", minWidth: "100px", fontSize:'13px' };
// const btnStyle = { padding: "8px 20px", background: "#AD3A3C", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold", marginLeft:'auto' };
// const emptyState = { textAlign: "center", padding: "50px", color: "#888", fontStyle: "italic", background:"#fff", border:"1px dashed #ccc", marginTop:"20px" };
// const thStyle = { background: "#AD3A3C", color: "white", padding: "8px", border: "1px solid #ddd", fontSize: "13px" };
// const tdStyle = { padding: "5px", border: "1px solid #ddd", height: "60px", verticalAlign: "middle", width: "9.5%", transition:"background 0.2s" };
// const legendDot = { width: "10px", height: "10px", borderRadius: "50%", display: "inline-block", border: "1px solid #ccc" };

// // Modal Styles
// const modalOverlay = { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 };
// const modalContent = { backgroundColor: "white", padding: "20px", borderRadius: "8px", width: "500px", maxWidth: "90%", boxShadow: "0 4px 10px rgba(0,0,0,0.2)" };
// const modalTh = { textAlign: "left", padding: "10px", borderBottom: "2px solid #ddd", color: "#555" };
// const modalTd = { padding: "10px", borderBottom: "1px solid #eee" };

// export default ViewTimeTable;

import { useState, useEffect } from "react";
import api from "../utils/api";

const ViewTimeTable = () => {
  // Dropdown States
  const [depts, setDepts] = useState([]);
  const [batches, setBatches] = useState([]);
  const [sections, setSections] = useState([]);
  
  // Selection States
  const [selectedDept, setSelectedDept] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [semester, setSemester] = useState("1");
  
  // Date State
  const [selectedDate, setSelectedDate] = useState(getMonday(new Date()).toISOString().split('T')[0]);

  // Data State
  const [timetable, setTimetable] = useState([]);
  const [loading, setLoading] = useState(false);

  // --- MODAL STATE ---
  const [showModal, setShowModal] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [selectedSlotDetails, setSelectedSlotDetails] = useState(null);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  
  // New Analytics State
  const [analytics, setAnalytics] = useState({ present: 0, absent: 0, total: 0, percentage: 0 });

  // --- HELPERS ---
  function getMonday(d) {
    d = new Date(d);
    var day = d.getDay(),
        diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
  }

  // 1. Initial Load
  useEffect(() => {
    api.get("/admin/depts").then(res => setDepts(res.data)).catch(console.error);
  }, []);

  // 2. Cascade Dropdowns
  useEffect(() => {
    if (selectedDept) {
      api.get("/admin/batches").then(res => {
        setBatches(res.data.filter(b => b.dept_id === parseInt(selectedDept)));
      });
    } else setBatches([]);
  }, [selectedDept]);

  useEffect(() => {
    if (selectedBatch) {
      api.get("/admin/sections").then(res => {
        setSections(res.data.filter(s => s.batch_id === parseInt(selectedBatch)));
      });
    } else setSections([]);
  }, [selectedBatch]);

  // 4. Fetch Grid
  const fetchTimetable = async () => {
    if (!selectedSection || !selectedDate || !semester) return alert("Please select section, semester, and date");
    setLoading(true);
    const mondayDate = getMonday(selectedDate).toISOString().split('T')[0];

    try {
      const res = await api.get(`/common/week-grid`, {
        params: { section_id: selectedSection, start_date: mondayDate, semester }
      });
      setTimetable(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load timetable");
    } finally {
      setLoading(false);
    }
  };

  // 5. HANDLE SLOT CLICK
  const handleSlotClick = async (entry, dateString) => {
    if (!entry) return;

    if (entry.session_category === 'free') {
        alert("This period was declared as FREE. No attendance records exist.");
        return;
    }

    if (!entry.session_id) {
        alert("Attendance has not been marked for this slot yet.");
        return;
    }

    // Prepare Modal
    setShowModal(true);
    setModalLoading(true);
    setSelectedSlotDetails({
        course: entry.course_name, // Scheduled Name
        actual_code: entry.actual_course_code, // Swapped Code (if exists)
        faculty: entry.faculty_name,
        date: dateString,
        type: entry.session_category
    });

    try {
        const res = await api.get(`/admin/records-by-session/${entry.session_id}`);
        const records = res.data;
        setAttendanceRecords(records);

        // --- CALCULATE ANALYTICS ---
        const total = records.length;
        // Check for 'present' (case insensitive just in case)
        const present = records.filter(r => r.status && r.status.toLowerCase() === 'present').length;
        const absent = total - present;
        const percentage = total > 0 ? ((present / total) * 100).toFixed(1) : 0;

        setAnalytics({ present, absent, total, percentage });

    } catch (err) {
        console.error(err);
        alert("Failed to fetch student records");
        setShowModal(false);
    } finally {
        setModalLoading(false);
    }
  };

  return (
    <div>
      {/* FILTER BAR */}
      <div style={filterContainer}>
        <div style={{display:'flex', gap:'10px', flexWrap:'wrap', flex:1}}>
            <select style={selectStyle} onChange={e => setSelectedDept(e.target.value)} value={selectedDept}>
              <option value="">Select Dept</option>
              {depts.map(d => <option key={d.id} value={d.id}>{d.dept_name}</option>)}
            </select>

            <select style={selectStyle} onChange={e => setSelectedBatch(e.target.value)} value={selectedBatch} disabled={!selectedDept}>
              <option value="">Select Batch</option>
              {batches.map(b => <option key={b.id} value={b.id}>{b.batch_name}</option>)}
            </select>

            <select style={selectStyle} onChange={e => setSelectedSection(e.target.value)} value={selectedSection} disabled={!selectedBatch}>
              <option value="">Select Section</option>
              {sections.map(s => <option key={s.id} value={s.id}>{s.section_name}</option>)}
            </select>

            <select style={selectStyle} onChange={e => setSemester(e.target.value)} value={semester}>
              {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>Sem {n}</option>)}
            </select>

            <div style={{display:'flex', alignItems:'center', gap:'5px', background:'white', padding:'0 5px', borderRadius:'4px', border:'1px solid #ccc'}}>
                <label style={{fontSize:'12px', fontWeight:'bold', color:'#555', paddingLeft:'5px'}}>Week:</label>
                <input type="date" style={{...selectStyle, border:'none'}} value={selectedDate} onChange={e => setSelectedDate(e.target.value)}/>
            </div>
        </div>
        <button onClick={fetchTimetable} style={btnStyle}>Load View</button>
      </div>

      {/* LEGEND */}
      <div style={{display:'flex', gap:'20px', margin:'15px 0', fontSize:'13px', padding:'10px', background:'#fff', borderRadius:'4px'}}>
          <span style={{display:'flex', alignItems:'center', gap:'5px'}}><span style={{...legendDot, background:'#d4edda'}}></span> Normal</span>
          <span style={{display:'flex', alignItems:'center', gap:'5px'}}><span style={{...legendDot, background:'#fff3cd'}}></span> Swap</span>
          <span style={{display:'flex', alignItems:'center', gap:'5px'}}><span style={{...legendDot, background:'#e2e3f5'}}></span> Free</span>
          <span style={{display:'flex', alignItems:'center', gap:'5px'}}><span style={{...legendDot, background:'#f8d7da'}}></span> Unmarked</span>
      </div>

      {/* TIMETABLE GRID */}
      {loading ? <p>Loading...</p> : (
        timetable.length > 0 ? (
          <div style={{ marginTop: "10px" }}>
            <TimetableGrid data={timetable} startDate={selectedDate} onSlotClick={handleSlotClick} />
          </div>
        ) : (
          <div style={emptyState}>
            <p>Select criteria and click "Load View".</p>
          </div>
        )
      )}

      {/* ATTENDANCE MODAL */}
      {showModal && (
        <div style={modalOverlay}>
            <div style={modalContent}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'15px', borderBottom:'1px solid #eee', paddingBottom:'10px'}}>
                    <h3 style={{margin:0, color:'#AD3A3C'}}>
                        {selectedSlotDetails?.type === 'swap' ? selectedSlotDetails.actual_code : selectedSlotDetails?.course}
                    </h3>
                    <button onClick={() => setShowModal(false)} style={{background:'none', border:'none', fontSize:'18px', cursor:'pointer'}}>×</button>
                </div>
                
                {selectedSlotDetails && (
                    <div style={{marginBottom:'15px', fontSize:'13px', color:'#555', display:'flex', justifyContent:'space-between', background:'#f9f9f9', padding:'10px', borderRadius:'6px'}}>
                        <div>
                            {selectedSlotDetails.type === 'swap' && (
                                <div style={{color:'#856404', marginBottom:'4px'}}>
                                    <strong>Swapped From:</strong> {selectedSlotDetails.course}
                                </div>
                            )}
                            <div><strong>Date:</strong> {selectedSlotDetails.date}</div>
                            <div><strong>Faculty:</strong> {selectedSlotDetails.faculty}</div>
                        </div>
                        <div style={{textAlign:'right'}}>
                             <div style={{fontSize:'10px', textTransform:'uppercase', fontWeight:'bold', color:'#999'}}>Type</div>
                             <div style={{fontWeight:'bold'}}>{selectedSlotDetails.type.toUpperCase()}</div>
                        </div>
                    </div>
                )}

                {/* ANALYTICS SECTION */}
                {!modalLoading && (
                    <div style={{marginBottom:'20px'}}>
                        <div style={{display:'flex', justifyContent:'space-between', marginBottom:'5px', fontSize:'14px', fontWeight:'bold'}}>
                            <span style={{color:'#155724'}}>Present: {analytics.present}</span>
                            <span style={{color:'#721c24'}}>Absent: {analytics.absent}</span>
                            <span>{analytics.percentage}%</span>
                        </div>
                        {/* Progress Bar */}
                        <div style={{height:'10px', width:'100%', background:'#e9ecef', borderRadius:'5px', overflow:'hidden'}}>
                            <div style={{
                                height:'100%', 
                                width: `${analytics.percentage}%`, 
                                background: parseFloat(analytics.percentage) < 75 ? '#dc3545' : '#28a745',
                                transition: 'width 0.5s ease-in-out'
                            }}></div>
                        </div>
                    </div>
                )}

                {modalLoading ? <p>Loading records...</p> : (
                    <div style={{maxHeight:'350px', overflowY:'auto', border:'1px solid #eee', borderRadius:'4px'}}>
                        <table style={{width:'100%', borderCollapse:'collapse', fontSize:'13px'}}>
                            <thead style={{position:'sticky', top:0, background:'#eee'}}>
                                <tr>
                                    <th style={modalTh}>Roll No</th>
                                    <th style={modalTh}>Name</th>
                                    <th style={modalTh}>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {attendanceRecords.map((rec, idx) => (
                                    <tr key={idx} style={{background: idx % 2 === 0 ? '#fff' : '#fcfcfc'}}>
                                        <td style={modalTd}>{rec.roll_number}</td>
                                        <td style={modalTd}>{rec.full_name}</td>
                                        <td style={modalTd}>
                                            <span style={{
                                                padding:'3px 8px', borderRadius:'10px', fontSize:'11px', fontWeight:'bold',
                                                background: rec.status.toLowerCase() === 'present' ? '#d4edda' : '#f8d7da',
                                                color: rec.status.toLowerCase() === 'present' ? '#155724' : '#721c24'
                                            }}>
                                                {rec.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {attendanceRecords.length === 0 && <p style={{textAlign:'center', color:'#999'}}>No students found.</p>}
                    </div>
                )}
            </div>
        </div>
      )}
    </div>
  );
};

// --- GRID COMPONENT ---
const TimetableGrid = ({ data, startDate, onSlotClick }) => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const slots = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const getRowDate = (dayName) => {
    const inputDate = new Date(startDate);
    const dayIndex = ["Mon", "Tue", "Wed", "Thu", "Fri"].indexOf(dayName);
    const monday = new Date(inputDate.setDate(inputDate.getDate() - inputDate.getDay() + 1));
    return new Date(monday.setDate(monday.getDate() + dayIndex));
  };

  const getSlotData = (day, slotNum) => data.find(t => t.day === day && t.slot_number === slotNum);

  const getCellStyle = (entry, rowDate) => {
    let style = { ...tdStyle, cursor: entry ? "pointer" : "default" };
    if (!entry) return style;

    if (entry.session_category === 'free') {
        style.backgroundColor = "#e2e3f5";
        style.color = "#383d41";
    } else if (entry.session_category === 'swap') {
        style.backgroundColor = "#fff3cd";
        style.color = "#856404";
    } else if (entry.session_category === 'normal') {
        style.backgroundColor = "#d4edda";
        style.color = "#155724";
    } else {
        const today = new Date();
        today.setHours(0,0,0,0);
        rowDate.setHours(0,0,0,0);
        if (rowDate < today) {
            style.backgroundColor = "#f8d7da";
            style.color = "#721c24";
        }
    }
    return style;
  };

  return (
    <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "center", border: "1px solid #ddd" }}>
      <thead>
        <tr>
          <th style={{...thStyle, width:'100px'}}>Day</th>
          {slots.map(s => <th key={s} style={thStyle}>{s}</th>)}
        </tr>
      </thead>
      <tbody>
        {days.map(day => {
          const rowDate = getRowDate(day);
          const dateString = rowDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year:'numeric' });
          
          return (
            <tr key={day}>
              <td style={{ ...tdStyle, fontWeight: "bold", background: "#f9f9f9", borderRight:'2px solid #ddd', cursor:'default' }}>
                <div style={{fontSize:'14px', color:'#333'}}>{day}</div>
                <div style={{fontSize:'11px', color:'#888'}}>{dateString}</div>
              </td>
              {slots.map(slot => {
                const entry = getSlotData(day, slot);
                const style = getCellStyle(entry, rowDate);

                return (
                  <td 
                    key={slot} 
                    style={style} 
                    onClick={() => onSlotClick(entry, dateString)} 
                    title={entry ? "Click for details" : ""}
                  >
                    {entry ? (
                      <div style={{ fontSize: "11px", lineHeight: "1.3" }}>
                        
                        {/* CHECK FOR SWAP TO DISPLAY ACTUAL COURSE */}
                        {/* {entry.session_category === 'swap' ? (
                            <>
                                <strong style={{display:'block', color:'#856404'}}>{entry.actual_course_code || "Unknown"}</strong>
                                <span style={{fontSize:'9px', textDecoration:'line-through', color:'#999'}}>{entry.course_code}</span>
                            </>
                        ) : (
                            <strong style={{display:'block'}}>{entry.course_name}</strong>
                        )} */}
                    {entry.session_category === 'swap' ? (
                        <>
                            {/* Show Actual (Swapped) Course Name */}
                            <strong style={{display:'block', color:'#856404'}}>
                                {entry.actual_course_code}
                            </strong>
                            {/* Show Scheduled Course Strikethrough */}
                            <span style={{fontSize:'9px', textDecoration:'line-through', color:'#999'}}>
                                {entry.course_code}
                            </span>
                        </>
                    ) : (
                        <strong style={{display:'block'}}>{entry.course_name}</strong>
                    )}
                        {entry.session_category === 'free' ? (
                            <span style={{fontWeight:'bold', fontSize:'10px'}}>FREE</span>
                        ) : (
                            <>
                                <span style={{fontSize:'10px'}}>{entry.faculty_name}</span>
                                {entry.room_info && <div style={{ fontSize: "9px", opacity: 0.7 }}>[{entry.room_info}]</div>}
                            </>
                        )}
                      </div>
                    ) : "-"}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

// Styles
const filterContainer = { display: "flex", gap: "10px", background: "#f5f5f5", padding: "15px", borderRadius: "8px", alignItems: "center", flexWrap: "wrap", border:"1px solid #ddd" };
const selectStyle = { padding: "8px", borderRadius: "4px", border: "1px solid #ccc", minWidth: "100px", fontSize:'13px' };
const btnStyle = { padding: "8px 20px", background: "#AD3A3C", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold", marginLeft:'auto' };
const emptyState = { textAlign: "center", padding: "50px", color: "#888", fontStyle: "italic", background:"#fff", border:"1px dashed #ccc", marginTop:"20px" };
const thStyle = { background: "#AD3A3C", color: "white", padding: "8px", border: "1px solid #ddd", fontSize: "13px" };
const tdStyle = { padding: "5px", border: "1px solid #ddd", height: "65px", verticalAlign: "middle", width: "9.5%", transition:"background 0.2s" };
const legendDot = { width: "10px", height: "10px", borderRadius: "50%", display: "inline-block", border: "1px solid #ccc" };

// Modal Styles
const modalOverlay = { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 };
const modalContent = { backgroundColor: "white", padding: "20px", borderRadius: "8px", width: "500px", maxWidth: "90%", boxShadow: "0 4px 10px rgba(0,0,0,0.2)" };
const modalTh = { textAlign: "left", padding: "10px", borderBottom: "2px solid #ddd", color: "#555" };
const modalTd = { padding: "10px", borderBottom: "1px solid #eee" };

export default ViewTimeTable;