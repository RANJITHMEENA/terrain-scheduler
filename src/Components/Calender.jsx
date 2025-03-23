import React, { useState, useEffect } from "react";
import Calendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // Month view plugin
import timeGridPlugin from "@fullcalendar/timegrid"; // Week/Day view with time grid
import interactionPlugin from "@fullcalendar/interaction"; // For interaction
import { Button, Modal } from "antd";
import { EyeOutlined, DownloadOutlined } from "@ant-design/icons";
import moment from "moment";
const initialData = [
  {
    id: 1,
    summary: "1st Round",
    desc: "1st Round Interview",
    start: "2025-03-27T18:00:00+05:30",
    end: "2025-03-27T18:40:00+05:30",
    attendees: null,
    status: null,
    comment: null,
    score: {
      P: 8,
    },
    link: "http://www.hhh.com",
    user_det: {
      id: 1,
      question_score: null,
      status: null,
      candidate: {
        id: 1,
        candidate_firstName: "mohan",
        candidate_lastName: "raj",
        candidateGender: "male",
        candidateComment: "",
        candidate_email: "mohanrajk@dataterrain.com",
      },
      handled_by: {
        id: 3,
        last_login: null,
        userEmail: "vinodhini_hr@dataterrain.com",
        username: "vinodhini_hr",
        firstName: "Vinodhini",
        lastName: "HR",
        userRole: "hr_employee",
      },
      job_id: {
        id: 11,
        jobRequest_Title: "django developer",
        jobRequest_Role: "software engineer",
        jobRequest_KeySkills: "django",
        jobRequest_Description: "Job description",
      },
    },
  },
  {
    id: 1,
    summary: "1st Round",
    desc: "1st Round Interview",
    start: "2025-03-24T18:00:00+05:30",
    end: "2025-03-24T18:40:00+05:30",
    attendees: null,
    status: null,
    comment: null,
    score: {
      P: 8,
    },
    link: "http://www.hhh.com",
    user_det: {
      id: 1,
      question_score: null,
      status: null,
      candidate: {
        id: 1,
        candidate_firstName: "mohan",
        candidate_lastName: "raj",
        candidateGender: "male",
        candidateComment: "",
        candidate_email: "mohanrajk@dataterrain.com",
      },
      handled_by: {
        id: 3,
        last_login: null,
        userEmail: "vinodhini_hr@dataterrain.com",
        username: "vinodhini_hr",
        firstName: "Vinodhini",
        lastName: "HR",
        userRole: "hr_employee",
      },
      job_id: {
        id: 11,
        jobRequest_Title: "django developer",
        jobRequest_Role: "software engineer",
        jobRequest_KeySkills: "django",
        jobRequest_Description: "Job description",
      },
    },
  },
  {
    id: 1,
    summary: "Final Round",
    desc: "Final Round",
    start: "2025-03-24T18:00:00+05:30",
    end: "2025-03-24T18:40:00+05:30",
    attendees: null,
    status: null,
    comment: null,
    score: {
      P: 8,
    },
    link: "http://www.hhh.com",
    user_det: {
      id: 1,
      question_score: null,
      status: null,
      candidate: {
        id: 1,
        candidate_firstName: "mohan",
        candidate_lastName: "raj",
        candidateGender: "male",
        candidateComment: "",
        candidate_email: "mohanrajk@dataterrain.com",
      },
      handled_by: {
        id: 3,
        last_login: null,
        userEmail: "vinodhini_hr@dataterrain.com",
        username: "vinodhini_hr",
        firstName: "Vinodhini",
        lastName: "HR",
        userRole: "hr_employee",
      },
      job_id: {
        id: 11,
        jobRequest_Title: "django developer",
        jobRequest_Role: "software engineer",
        jobRequest_KeySkills: "django",
        jobRequest_Description: "Job description",
      },
    },
  },
];

const CalendarComponent = () => {
  const [selectedEvent, setSelectedEvent] = useState(null); // State to hold selected event details
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [popover,setPopOver] = useState(false)
  const [sameDayEvents,setSameDayEvents] = useState([])
  const [eventsAtSameTime, setEventsAtSameTime] = useState(0);

  // Function to count events happening at the same time
  const countEventsAtSameTime = () => {
    let sameTimeCount = 0;
    // Group the events by same day and same hour (ignoring minute and second)
    initialData.map((event) => {
      // Get the hour and day of the event start time
      const eventStartDayHour = moment(event.start)
        .startOf("hour")
        .format("YYYY-MM-DD HH");

      // Find all events that have the same start time (same day and same hour)
      const sameTimeEvents = initialData.filter(
        (e) =>
          moment(e.start).startOf("hour").format("YYYY-MM-DD HH") ===
          eventStartDayHour
      );

      // If there are multiple events at the same time (same day, same hour), update the count
      if (sameTimeEvents.length > 0) {
        sameTimeCount = sameTimeEvents.length;
      }
    });

    // If we found multiple events at the same time, update the state
    if (sameTimeCount > 1) {
      setEventsAtSameTime(sameTimeCount);
    }
  };

  useEffect(() => {
    countEventsAtSameTime();
  }, []);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const showPopOver = () => {
    setPopOver(true);
  };

  // Helper function to group events that occur at the same time
  const groupEventsByTime = (events) => {
    const groupedEvents = [];

    events.forEach((event) => {
      // Create a unique key for each event based on the start time
      const startTime = new Date(event.start).toISOString();

      // Check if an event with this start time already exists in the grouped events array
      const existingEvent = groupedEvents.find((groupedEvent) => {
        return new Date(groupedEvent.start).toISOString() === startTime;
      });

      if (existingEvent) {
        // If an event with this start time exists, merge data (e.g., summary, description)

        existingEvent.same = true;
        // Optionally merge or update other data
      } else {
        // Otherwise, push the current event to the grouped array
        groupedEvents.push(event);
      }
    });

    return groupedEvents;
  };

  // Group the events by the same start time
  const groupedEvents = groupEventsByTime(initialData);

  const renderEventContent = (eventInfo) => {
    const { start, end } = eventInfo.event;
    const userDet = eventInfo.event.extendedProps.user_det;
    const groupedEvents = eventInfo.event.extendedProps.same;

    if (userDet) {
      const { job_id, handled_by } = userDet;
      const jobTitle = job_id ? job_id.jobRequest_Title : "No Job Title";
      const interviewer = handled_by ? handled_by.username : "No Interviewer";
      const startTime = formatTime(start);
      const endTime = formatTime(end);

      const isDayView = eventInfo.view.type === "timeGridDay"; // Check if it's day view
      const isWeekView = eventInfo.view.type === "dayGridWeek"; // Check if it's week view
      const isMonthView = eventInfo.view.type === "dayGridMonth"; // Check if it's month view

      return (
        <div
          style={{ cursor: "pointer" }}
          className={`  ${
            isMonthView || isWeekView ? "event-box month-view" : ""
          }`}
        >
          {/* Golden circle for event count */}
          {eventsAtSameTime > 1 && groupedEvents && (
            <div className="event-count-circle">{eventsAtSameTime}</div>
          )}

          <div
            className={`  ${
              isMonthView || isWeekView
                ? "event-header"
                : isDayView
                ? "event-header2"
                : ""
            }`}
          >
            <span style={{ fontWeight: 700 }}>{jobTitle}</span>
          </div>

          <div className={`  ${isDayView ? "flex" : "event-details"}`}>
            <div>
              <span
                style={{ color: isMonthView || isWeekView ? "gray" : "white" }}
              >
                Time:
              </span>
              {startTime} - {endTime}
            </div>
            <div style={{ marginTop: "10px" }}>
              <span
                style={{ color: isMonthView || isWeekView ? "gray" : "white" }}
              >
                Interviewer:
              </span>
              {interviewer}
            </div>
          </div>
        </div>
      );
    } else {
      return <div>No details available</div>;
    }
  };

  // Function to handle event click
  const handleEventClick = (info) => {
    const { start, end, extendedProps } = info.event;
    const userDet = extendedProps.user_det;
    const sameTimeEvent = extendedProps.same;
    if (sameTimeEvent) {
      const targetDate = new Date(start);

      // Normalize the target date to the start of the hour (ignoring minutes and seconds)
      const normalizedTargetDate = moment(targetDate).startOf("hour");

      // Filter events based on the same day and hour as the target date
      const filteredEvents = initialData.filter((event) => {
        const eventStart = moment(event.start); // Normalize event start time to a moment object
        return eventStart.isSame(normalizedTargetDate, "hour"); // Compare by same hour and day
      });
      setSameDayEvents(filteredEvents)

      showPopOver(true); // Open the Popover showing the same-day events

    }
    if (!sameTimeEvent) {
      showModal(true);
      const eventDetails = {
        jobTitle: userDet?.job_id?.jobRequest_Title || "No Job Title",
        interviewer: userDet?.handled_by?.username || "No Interviewer",
        candidate_firstName:
          userDet?.candidate?.candidate_firstName || "Name not Found",
        startTime: formatTime(start),
        date: formattedDate(new Date(start)),
        endTime: formatTime(end),
        description:
          userDet?.job_id?.jobRequest_Description || "No Description",
        link: extendedProps.link,
      };

      setSelectedEvent(eventDetails);
    } // Set selected event details to show in the modal
  };

  const formatTime = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(date);
  };
  const formattedDate = (date) => {
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(date);
  };
  return (
    <div className="calendar-container">
      <Calendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={groupedEvents}
        contentHeight="auto"
        eventContent={renderEventContent}
        eventClick={handleEventClick} // Handle clicking an event
        editable={false} // Disable event drag-and-drop for view-only
        droppable={false} // Disable event drop
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,dayGridWeek,timeGridDay,listWeek", // Use dayGridWeek for both month and week views
        }}
        views={{
          dayGridWeek: {
            // For the week view, we use the same style as the month view
            eventContent: renderEventContent, // Ensure no time is shown in week view
          },
        }}
      />

      {/* Conditionally render modal if an event is selected */}
      {selectedEvent && (
        <Modal
          title={null}
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
          width={600}
          style={{ padding: 0 }}
        >
          <div
            className="modal-container"
            style={{ display: "flex", alignItems: "center" }}
          >
            <div
              className="modal-left"
              style={{
                flex: 1,
                padding: "20px",
                borderRight: "2px solid gray",
              }}
            >
              <p>Interview With: {selectedEvent.candidate_firstName}</p>
              <p>Position: {selectedEvent.jobTitle}</p>
              <p>Created By : -</p>
              <p>
                <strong>Interview Date:</strong> {selectedEvent.date} -{" "}
                {selectedEvent.endTime}
              </p>

              <p>
                <strong>Interview Time:</strong> {selectedEvent.startTime} -{" "}
                {selectedEvent.endTime}
              </p>
              <p>
                <strong>Interviewer:</strong> {selectedEvent.interviewer}
              </p>
              <p>Interview Via Google Meet</p>
              <Button
                type="default"
                style={{
                  border: "2px solid #1890ff",
                  color: "#1890ff",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                {" "}
                View Resume
                <EyeOutlined style={{ float: "left" }} />
                <DownloadOutlined style={{ float: "left" }} />
              </Button>
              <Button
                type="default"
                style={{
                  border: "2px solid #1890ff",
                  color: "#1890ff",
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "20px",
                  width: "10rem",
                }}
              >
                {" "}
                AadharCard
                <EyeOutlined style={{ float: "left" }} />
                <DownloadOutlined style={{ float: "left" }} />
              </Button>
            </div>
            <div className="modal-right" style={{ padding: "20px" }}>
              {/* Google Meet Image */}
              <img
                src="https://fonts.gstatic.com/s/i/productlogos/meet_2020q4/v1/web-96dp/logo_meet_2020q4_color_2x_web_96dp.png"
                alt="Google Meet"
                style={{
                  width: "150px",
                  height: "150px",
                  marginBottom: "20px",
                  border: "1px solid gray",
                }}
              />
              <Button
                type="primary"
                style={{ width: "100%" }}
                onClick={() => (window.location.href = selectedEvent.link)} // Redirect to the link on button click
              >
                Join
              </Button>
            </div>
          </div>
        </Modal>
      )}

{sameDayEvents.length > 0 && popover && (
  <div className="same-day-events-list">
    <h3>Multiple Events at this Time:</h3>
    <ul>
      {sameDayEvents.map((event, index) => (
        <li key={index}>
          <div className="event-item">
            <p>
              <strong>Title: </strong>{event.summary}
            </p>
            <p>
              <strong>Start Time: </strong>{formatTime(new Date(event.start))}
            </p>
            <p>
              <strong>Interviewer: </strong>{event.user_det?.handled_by?.username || "Unknown"}
            </p>
            <Button
              type="link"
              href={event.link}
              target="_blank"
              icon={<EyeOutlined />}
            >
              View Details
            </Button>
          </div>
        </li>
      ))}
    </ul>
    <Button onClick={() => setPopOver(false)}>Close</Button>
  </div>
)}

    </div>
  );
};

export default CalendarComponent;
