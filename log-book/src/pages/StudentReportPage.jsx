import logo from '../logo.png';
import StudentReportComponent from "../components/StudentReportComponent.jsx";
import StudentReportCalender from '../components/StudentReportCalender.jsx';
import React from 'react';
import { X } from 'lucide-react';
const datas = [
  { courseID: 'CSE101', Subject: 'Data Structures', Attendence: 40, totalClasses: 40 },
  { courseID: 'CSE102', Subject: 'Algorithms', Attendence: 33, totalClasses: 42 },
  { courseID: 'CSE103', Subject: 'Operating Systems', Attendence: 20, totalClasses: 38 },
  { courseID: 'CSE104', Subject: 'Database Systems', Attendence: 28, totalClasses: 36 },
  { courseID: 'CSE105', Subject: 'Computer Networks', Attendence: 30, totalClasses: 40 },
];
const StudentReport = (props) => {
  const [data, setData] = React.useState([]);
  const [subject , setSubject] = React.useState('');
  React.useEffect(() => {
    setData(datas);
  }, []);
  return (
    <div className="StudentReportPage">
      <header style={{ backgroundColor: '#AD3A3C' , color: 'white' , display: 'flex', justifyContent: 'space-between' }}>
            <div style={{display: 'flex', alignItems: 'center', paddingLeft: '30px', fontSize: '20px', fontWeight: 'bold'}}>
                <img src={logo} alt="Logo" style={{height: '50px', marginRight: '10px',padding:'20px'}} />
            </div>

            <nav style={{display: 'flex',alignItems: 'center', gap: '2vw',color: 'white', paddingRight: '2vw',paddingLeft: '5vw'}}>
                <a href="#" style={{color: 'white', textDecoration: 'none', fontSize: '2vh'}} >Dashboard</a>
                <a href="#" style={{color: 'white', textDecoration: 'none', fontSize: '2vh'}}>Attendance List</a>
            </nav>
      </header>
      <main>
        <div className='opt' style={{display: 'flex', justifyContent: 'space-between', backgroundColor: '#f0f0f0', margin: '30px 20px', padding: '40px 20px', borderRadius: '8px'}}>
          <div className='class-selection'>
            <label htmlFor='class' style={{fontSize: '2vh', marginRight: '1vw'}}>Select Class: </label>
            <select id='class' name='class' style={{fontSize: '1.5vh', padding: '5px 0px', }}>
              <option value='class1'>Select</option>
            </select>
          </div>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <label htmlFor='subject' style={{fontSize: '2vh', marginRight: '1vw'}}>Select Subject: </label>
            <select id='subject' name='subject' value={subject} style={{fontSize: '1.5vh', padding: '5px 0px', textAlign: 'center'}} onChange={(e)=>setSubject(e.target.value)}>
              <option value=''>Select</option>
              <option value='Data Structures'>Data Structures</option>
              <option value='Algorithms'>Algorithms</option>
              <option value='Operating Systems'>Operating Systems</option>
              <option value='Database Systems'>Database Systems</option>
              <option value='Computer Networks'>Computer Networks</option>
            </select>
            { subject &&
              <X style={{cursor: 'pointer', color: 'red', marginLeft: '10px', border: '1px solid red'}} onClick={() => setSubject('')}/>
            }
          </div>
          <div style={{display: 'flex', gap: '1vh',}}>
          <button style={{fontSize: '1.5vh', fontWeight: 'bold', padding: '1vh 2vh'}}>Student Report</button>
          <button style={{fontSize: '1.5vh', fontWeight: 'bold', padding: '1vh 2vh'}}>Class Report</button>
          </div>
        </div>
        <div className='details' style={{ fontSize: '2vh', marginLeft: '5vw', textAlign: 'left', fontWeight: 'bold'}}>
          <p>Name : {props.StudentName}</p>
          <p>Roll No : {props.RollNo}</p>
        </div>
        <div className='cards' style={{display: 'flex', alignContent: 'center', justifyContent: 'space-around', margin: '30px 20px'}}>
          <div className='student-details' style={{ backgroundColor: '#f0f0f0', margin: '30px auto', borderRadius: '8px', textAlign: 'center'}}>
            <table border={0} style={{width: '90vw',borderCollapse: 'separate', borderSpacing: '3px 1vh'}}>
              <tr style={{height: '7vh', fontSize: '2vh'}}>
                <th>CourseID</th>
                <th>Subject</th>
                <th>Attendance %</th>
              </tr>
              <tbody>
                {data.map((item, index) => (
                  <StudentReportComponent
                    key={index}
                    courseID={item.courseID}
                    Subject={item.Subject}
                    Attendence={item.Attendence}
                    totalClasses={item.totalClasses}
                  />
                ))}
              </tbody>
            </table>
          </div>
          { subject &&
          <div style={{margin: '30px auto', position: 'absolute', width: '90vw', backgroundColor: '#f0f0f0', padding: '30px 20px', borderRadius: '8px', textAlign: 'center'}}><StudentReportCalender subject={subject}/></div>
        }
        </div>
      </main>
    </div>
  );
}

export default StudentReport;
