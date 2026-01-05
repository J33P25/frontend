import { useState, useMemo } from 'react'
import { Search, Filter} from 'lucide-react'
import Logo from '../assets/logo.png'
import './FacultyDashboard.css'
import { Link } from "react-router-dom"

function FacultyDashboard() {
  const [selectedClass, setSelectedClass] = useState('')
  const [selectedCourse, setSelectedCourse] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [showDefaulters, setShowDefaulters] = useState(false)

  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')


  const students = [
    { rollno: '111', name: 'Anirudh', attendance: 90 },
    { rollno: '222', name: 'Sreejith', attendance: 85 },
    { rollno: '333', name: 'Karthik', attendance: 78 },
    { rollno: '444', name: 'Jaydeep', attendance: 76 },
    { rollno: '555', name: 'Arjun', attendance: 65 },
    { rollno: '666', name: 'Nivin', attendance: 60 },
  ]

  const filteredStudents = useMemo(() => {
    let filtered = students

    if (showDefaulters) {
      filtered = filtered.filter(s => s.attendance < 75)
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      filtered = filtered.filter(
        s =>
          s.rollno.toLowerCase().includes(q) ||
          s.name.toLowerCase().includes(q)
      )
    }

    if (fromDate && toDate) {
      filtered = filtered
    }

    return filtered
  }, [showDefaulters, searchQuery, fromDate, toDate])

  const attendanceColor = (value) => {
    if (value < 75) return 'attendance-low'
    if (value <= 80) return 'attendance-medium'
    return 'attendance-high'
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <img src={Logo} alt="Institute Logo" className="header-logo" />
        <nav className="header-nav">
          <Link to="/" className="nav-link">Dashboard</Link>
          <Link to="/attendance" className="nav-link">Attendance List</Link>
        </nav>
      </header>

      <main className="main-content">
        <div className="class-controls">
          <div className="control-group">
            <label className="control-label">Class :</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="control-select"
            >
              <option value="">Select Class</option>
              <option value="CSEA">CSE - A</option>
              <option value="CSEB">CSE - B</option>
              <option value="CSEAIA">CSE(AI) - A</option>
              <option value="CSEAIB">CSE(AI) - B</option>
            </select>
          </div>

          <div className="control-group">
            <label className="control-label">Course :</label>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="control-select"
            >
              <option value="">Select Course</option>
              <option value="DSA">Data Structure & Algorithms</option>
              <option value="AI">Fundamentals of AI</option>
            </select>
          </div>

        </div>

        {/* TABLE TOOLBAR */}
        <div className="table-toolbar">
          {/* Search */}
          <div className="search-container">
            <Search
              className="search-icon"
              size={20}
            />
            <input
              type="text"
              placeholder="Search student..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          {/* TABLE TOOLBAR */}
          <div className="toolbar-filters">

            {/* Date Range */}
            <div className="date-range">
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="date-input"
              />

              <span className="date-separator">to</span>

              <input
                type="date"
                value={toDate}
                min={fromDate}
                onChange={(e) => setToDate(e.target.value)}
                className="date-input"
              />
            </div>

            <label className="defaulters-filter">
              <Filter size={20} />
              <input
                type="checkbox"
                checked={showDefaulters}
                onChange={(e) => setShowDefaulters(e.target.checked)}
              />
              (&lt; 75%)
            </label>

          </div>
        </div>

        {/* TABLE */}
        <div className="table-container">
          <table className="students-table">
            <thead className="table-header">
              <tr>
                <th className="table-cell">Roll No.</th>
                <th className="table-cell">Student Name</th>
                <th className="table-cell">Attendance</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map(s => (
                <tr key={s.rollno}>
                  <td className="table-cell">{s.rollno}</td>
                  <td className="table-cell">{s.name}</td>
                  <td className="table-cell">
                    <span className={`attendance-badge ${attendanceColor(s.attendance)}`}>
                      {s.attendance}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}

export default FacultyDashboard