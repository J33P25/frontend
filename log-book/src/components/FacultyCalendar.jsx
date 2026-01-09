import { useState } from "react"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"

const FacultyCalendar = () => {
  const [events] = useState([])

  const attendanceRecords = [
    { date: "2026-01-01", periods: [{ status: "P", time: "08:00 AM" }] },
    { date: "2026-01-02", periods: [{ status: "P", time: "08:00 AM" }, { status: "A", time: "02:00 PM" }] },
    { date: "2026-01-03", periods: [{ status: "A", time: "08:00 AM" }] },
    { date: "2026-01-04", periods: [{ status: "A", time: "08:00 AM" }] },
    { date: "2026-01-05", periods: [{ status: "P", time: "08:00 AM" }] },
    { date: "2026-01-06", periods: [{ status: "L", time: "08:00 AM" }] },
    { date: "2026-01-07", periods: [{ status: "P", time: "08:00 AM" }, { status: "P", time: "11:00 AM" }, { status: "A", time: "02:00 PM" }] },
    { date: "2026-01-08", periods: [{ status: "A", time: "08:00 AM" }] },
    { date: "2026-01-09", periods: [{ status: "P", time: "08:00 AM" }] },
    { date: "2026-01-10", periods: [{ status: "L", time: "08:00 AM" }] },
  ]

  return (
    <div style={{ 
      padding: '1.5rem 2rem 2rem 2rem',
      height: 'calc(90vh - 5rem)',
      overflow: 'auto'
    }}>
      <style>
        {`
          .fc-daygrid-day-top {
            font-size: 1.2rem;
            font-weight: 600;
            padding: 0.5rem;
          }

          .fc-toolbar-title {
            font-size: 1.75rem !important;
            font-weight: 600;
          }

          .fc-button {
            padding: 0.5rem 1rem !important;
            font-size: 1rem !important;
          }

          .fc-daygrid-day {
            padding: 0.25rem;
            position: relative;
          }

          .fc-daygrid-day-frame {
            min-height: 100px;
            position: relative;
          }

          .fc .fc-daygrid-day-number {
            font-size: 1.1rem;
            position: relative;
            z-index: 2;
          }

          .fc-col-header-cell {
            padding: 0.75rem 0.5rem;
            font-size: 1.1rem;
            font-weight: 600;
          }

          .fc-daygrid-day-events {
            display: none;
          }

          .attendance-periods {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            display: flex;
            z-index: 1;
          }

          .period-block {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            align-items: center;
            position: relative;
          }

          .period-block:not(:last-child) {
            border-right: 2px solid black;
          }

          .period-block.present {
            background-color: #229853;
          }

          .period-block.late {
            background-color: #f39c12;
          }

          .period-block.absent {
            background-color: #e14635;
          }

          .period-time {
            color: black;
            font-size: 0.75rem;
            font-weight: 500;
            margin-top: auto;
            padding: 0.25rem;
          }

          .fc-daygrid-day.has-attendance .fc-daygrid-day-number {
            color: white !important;
            font-weight: 600;
          }

          @media (max-width: 768px) {
            .fc-toolbar-title {
              font-size: 1.25rem !important;
            }

            .fc-button {
              padding: 0.375rem 0.75rem !important;
              font-size: 0.875rem !important;
            }

            .fc-daygrid-day-frame {
              min-height: 80px;
            }

            .fc .fc-daygrid-day-number {
              font-size: 0.9rem;
              padding: 0.375rem;
            }

            .fc-col-header-cell {
              padding: 0.5rem 0.25rem;
              font-size: 0.9rem;
            }

            .fc-daygrid-day-top {
              font-size: 1rem;
              padding: 0.375rem;
            }

            .period-time {
              font-size: 0.65rem;
              padding: 0.2rem;
            }
          }

          @media (max-width: 480px) {
            .fc-toolbar-title {
              font-size: 1rem !important;
            }

            .fc-button {
              padding: 0.25rem 0.5rem !important;
              font-size: 0.75rem !important;
            }

            .fc-daygrid-day-frame {
              min-height: 60px;
            }

            .fc .fc-daygrid-day-number {
              font-size: 0.8rem;
              padding: 0.25rem;
            }

            .fc-col-header-cell {
              padding: 0.375rem 0.125rem;
              font-size: 0.75rem;
            }

            .period-time {
              font-size: 0.6rem;
              padding: 0.15rem;
            }
          }
        `}
      </style>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        height="100%"
        events={events}
        displayEventTime={false}
        dayCellClassNames={(arg) => {
          const dateStr = arg.date.toISOString().split('T')[0]
          const record = attendanceRecords.find(r => r.date === dateStr)
          if (record && record.periods.length > 0) {
            return ["has-attendance"]
          }
          return []
        }}
        dayCellDidMount={(arg) => {
          const dateStr = arg.date.toISOString().split('T')[0]
          const record = attendanceRecords.find(r => r.date === dateStr)
          
          if (record && record.periods.length > 0) {
            const periodsContainer = document.createElement('div')
            periodsContainer.className = 'attendance-periods'
            
            record.periods.forEach(period => {
              const periodBlock = document.createElement('div')
              periodBlock.className = `period-block ${
                period.status === 'P' ? 'present' : 
                period.status === 'L' ? 'late' : 'absent'
              }`
              
              const timeLabel = document.createElement('div')
              timeLabel.className = 'period-time'
              timeLabel.textContent = period.time
              
              periodBlock.appendChild(timeLabel)
              periodsContainer.appendChild(periodBlock)
            })
            
            arg.el.querySelector('.fc-daygrid-day-frame').appendChild(periodsContainer)
          }
        }}
      />
    </div>
  )
}

export default FacultyCalendar