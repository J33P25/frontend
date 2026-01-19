import { useState, useEffect } from 'react';

export default function FacultyDashboard() {
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
  const token = localStorage.getItem('token'); // Adjust based on your auth implementation

  const [classGroups, setClassGroups] = useState({});
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const timeSlots = ['9:00-9:50', '9:50-10:40', '10:50-11:40', '11:40-12:30', '12:30-1:20', '1:20-2:10'];

  // Fetch all classes taught by the faculty
  useEffect(() => {
    fetchMyClasses();
  }, []);

  const fetchMyClasses = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/faculty/my-classes-full-timetables`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) throw new Error('Failed to fetch classes');

      const data = await response.json();
      setClassGroups(data[0] || {});
      
      // Auto-select first class
      const firstClass = Object.keys(data[0] || {})[0];
      if (firstClass) {
        setSelectedClass(firstClass);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch sessions for a specific timetable slot
  const fetchSessions = async (timetableId) => {
    try {
      const response = await fetch(`${API_URL}/api/admin/sessions-by-timetable/${timetableId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) throw new Error('Failed to fetch sessions');
      const data = await response.json();
      setSessions(data);
    } catch (err) {
      console.error('Error fetching sessions:', err);
      setSessions([]);
    }
  };

  // Fetch attendance records for a specific session
  const fetchAttendanceRecords = async (sessionId) => {
    try {
      const response = await fetch(`${API_URL}/api/admin/records-by-session/${sessionId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) throw new Error('Failed to fetch attendance records');
      const data = await response.json();
      setAttendanceRecords(data);
    } catch (err) {
      console.error('Error fetching attendance:', err);
      setAttendanceRecords([]);
    }
  };

  const handleSlotClick = async (slot) => {
    setSelectedSlot(slot);
    setAttendanceRecords([]);
    await fetchSessions(slot.timetable_id);
  };

  const handleSessionClick = async (session) => {
    await fetchAttendanceRecords(session.id);
  };

  // Organize timetable data by day and slot
  const organizeTimetable = (slots) => {
    const organized = {};
    daysOfWeek.forEach(day => {
      organized[day] = Array(6).fill(null);
    });

    slots.forEach(slot => {
      if (organized[slot.day] && slot.slot_number >= 1 && slot.slot_number <= 6) {
        organized[slot.day][slot.slot_number - 1] = slot;
      }
    });

    return organized;
  };

  const getCellStyle = (slot) => {
    if (!slot) return { background: '#fff', cursor: 'default' };
    return {
      background: '#e3f2fd',
      cursor: 'pointer',
      transition: 'all 0.2s'
    };
  };

  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <div style={{ fontSize: '18px', color: '#666' }}>Loading your classes...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <div style={{ fontSize: '18px', color: '#d32f2f' }}>Error: {error}</div>
      </div>
    );
  }

  const classNames = Object.keys(classGroups);
  const currentTimetable = selectedClass ? organizeTimetable(classGroups[selectedClass]) : {};

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', minHeight: '100vh', backgroundColor: '#f5f5f5', padding: '20px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 600, marginBottom: '30px', color: '#333' }}>
          Faculty Dashboard
        </h1>

        {/* Class Selector */}
        {classNames.length > 0 && (
          <div style={{ marginBottom: '30px' }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '10px', color: '#555' }}>
              Select Class:
            </label>
            <select
              value={selectedClass || ''}
              onChange={(e) => {
                setSelectedClass(e.target.value);
                setSelectedSlot(null);
                setSessions([]);
                setAttendanceRecords([]);
              }}
              style={{
                padding: '12px 16px',
                fontSize: '16px',
                borderRadius: '6px',
                border: '1px solid #ddd',
                cursor: 'pointer',
                minWidth: '300px',
                backgroundColor: 'white'
              }}
            >
              {classNames.map(className => (
                <option key={className} value={className}>{className}</option>
              ))}
            </select>
          </div>
        )}

        {/* Timetable Display */}
        {selectedClass && (
          <div style={{ marginBottom: '30px', backgroundColor: 'white', borderRadius: '8px', padding: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 600, marginBottom: '20px', color: '#333' }}>
              Class Timetable
            </h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
                <thead>
                  <tr>
                    <th style={{ border: '2px solid #ddd', padding: '12px', background: '#f0f0f0', fontWeight: 600, minWidth: '80px' }}>
                      Day
                    </th>
                    {timeSlots.map((time, idx) => (
                      <th key={idx} style={{ border: '2px solid #ddd', padding: '12px', background: '#f0f0f0', fontWeight: 600, minWidth: '120px' }}>
                        {time}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {daysOfWeek.map(day => (
                    <tr key={day}>
                      <td style={{ border: '2px solid #ddd', padding: '12px', fontWeight: 600, background: '#f9f9f9' }}>
                        {day}
                      </td>
                      {currentTimetable[day]?.map((slot, idx) => (
                        <td
                          key={idx}
                          onClick={() => slot && handleSlotClick(slot)}
                          onMouseEnter={(e) => {
                            if (slot) e.currentTarget.style.background = '#bbdefb';
                          }}
                          onMouseLeave={(e) => {
                            if (slot) e.currentTarget.style.background = '#e3f2fd';
                          }}
                          style={{
                            border: '2px solid #ddd',
                            padding: '12px',
                            ...getCellStyle(slot)
                          }}
                        >
                          {slot ? (
                            <div>
                              <div style={{ fontWeight: 600, fontSize: '11px', marginBottom: '4px', color: '#666' }}>
                                {slot.course_code}
                              </div>
                              <div style={{ fontSize: '13px', marginBottom: '4px' }}>
                                {slot.course_name}
                              </div>
                              <div style={{ fontSize: '11px', color: '#888' }}>
                                {slot.faculty_name}
                              </div>
                              <div style={{ fontSize: '10px', color: '#999', marginTop: '4px' }}>
                                Room: {slot.room_info || 'N/A'}
                              </div>
                            </div>
                          ) : null}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Sessions List */}
        {selectedSlot && (
          <div style={{ marginBottom: '30px', backgroundColor: 'white', borderRadius: '8px', padding: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 600, marginBottom: '10px', color: '#333' }}>
              Attendance Sessions
            </h2>
            <p style={{ fontSize: '14px', color: '#666', marginBottom: '20px' }}>
              {selectedSlot.course_name} ({selectedSlot.course_code}) - {selectedSlot.day} Slot {selectedSlot.slot_number}
            </p>

            {sessions.length === 0 ? (
              <p style={{ color: '#999', fontStyle: 'italic' }}>No attendance sessions recorded yet</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {sessions.map(session => (
                  <div
                    key={session.id}
                    onClick={() => handleSessionClick(session)}
                    style={{
                      padding: '15px',
                      border: '1px solid #ddd',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      backgroundColor: session.is_verified_by_faculty ? '#e8f5e9' : '#fff3e0'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)'}
                    onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '16px', marginBottom: '5px' }}>
                          {new Date(session.session_date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </div>
                        <div style={{ fontSize: '13px', color: '#666' }}>
                          Marked by: {session.marked_by}
                        </div>
                      </div>
                      <div style={{
                        padding: '6px 12px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: 600,
                        backgroundColor: session.is_verified_by_faculty ? '#4caf50' : '#ff9800',
                        color: 'white'
                      }}>
                        {session.is_verified_by_faculty ? 'Verified' : 'Pending'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Attendance Records */}
        {attendanceRecords.length > 0 && (
          <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 600, marginBottom: '20px', color: '#333' }}>
              Attendance Records
            </h2>
            
            <div style={{ marginBottom: '15px', display: 'flex', gap: '20px', fontSize: '14px' }}>
              <div>
                <span style={{ fontWeight: 600 }}>Total Students:</span> {attendanceRecords.length}
              </div>
              <div>
                <span style={{ fontWeight: 600 }}>Present:</span>{' '}
                <span style={{ color: '#4caf50' }}>
                  {attendanceRecords.filter(r => r.status.toLowerCase() === 'present').length}
                </span>
              </div>
              <div>
                <span style={{ fontWeight: 600 }}>Absent:</span>{' '}
                <span style={{ color: '#f44336' }}>
                  {attendanceRecords.filter(r => r.status.toLowerCase() === 'absent').length}
                </span>
              </div>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ border: '1px solid #ddd', padding: '12px', background: '#f5f5f5', textAlign: 'left', fontWeight: 600 }}>
                      Roll Number
                    </th>
                    <th style={{ border: '1px solid #ddd', padding: '12px', background: '#f5f5f5', textAlign: 'left', fontWeight: 600 }}>
                      Full Name
                    </th>
                    <th style={{ border: '1px solid #ddd', padding: '12px', background: '#f5f5f5', textAlign: 'center', fontWeight: 600 }}>
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceRecords.map((record, idx) => (
                    <tr key={idx} style={{ backgroundColor: idx % 2 === 0 ? '#fafafa' : 'white' }}>
                      <td style={{ border: '1px solid #ddd', padding: '12px' }}>
                        {record.roll_number}
                      </td>
                      <td style={{ border: '1px solid #ddd', padding: '12px' }}>
                        {record.full_name}
                      </td>
                      <td style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'center' }}>
                        <span style={{
                          padding: '4px 12px',
                          borderRadius: '4px',
                          fontSize: '13px',
                          fontWeight: 600,
                          backgroundColor: record.status.toLowerCase() === 'present' ? '#e8f5e9' : '#ffebee',
                          color: record.status.toLowerCase() === 'present' ? '#2e7d32' : '#c62828'
                        }}>
                          {record.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {!selectedClass && classNames.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#999' }}>
            <p style={{ fontSize: '18px' }}>No classes assigned yet</p>
          </div>
        )}
      </div>
    </div>
  );
}