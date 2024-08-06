import './App.css'

const eventsPayload = {
  "tsArr": [
    {
      "erecno": "709735000004480001",
      "clientName": "Amway",
      "employeeMailId": "gabriel.tomonari@kissolutions.tech",
      "jobColor": 1,
      "isDeleteAllowed": false,
      "type": "2",
      "mod_ip": "201.2.43.114",
      "workDate": "2024-07-24",
      "fromTime": 1408,
      "approvalId": "709735000006201663",
      "employeeZuid": 847692606,
      "jobIsActive": true,
      "toTime": 1422,
      "jobName": "Technical Leadership",
      "approvalStatus": 1,
      "hours": 94,
      "clientId": "709735000001674119",
      "db_workDate": "2024-07-24 00:00:00.0",
      "jobIsCompleted": 0,
      "jobBillableStatus": "0",
      "isEditAllowed": false,
      "billableStatus": 0,
      "billingStatus": 0,
      "jobId": "709735000004420571",
      "add_ip": "201.2.43.114",
      "isTimelogPushedToQBO": false,
      "totaltime": 5659,
      "geoLocation": "SAO JOAO DALIANCA",
      "timelogId": "709735000006114699",
      "taskName": "Refinement, Summary, LOE for BMT",
      "tt_inputType": 1,
      "projectName": "Account Management",
      "projectId": "709735000004417393",
      "employeename": "Gabriel",
      "isPushAllowToZF": true
    },
    {
      "erecno": "709735000004480001",
      "clientName": "Amway",
      "employeeMailId": "gabriel.tomonari@kissolutions.tech",
      "jobColor": 1,
      "description": "",
      "isDeleteAllowed": false,
      "type": "1",
      "workDate": "2024-07-24",
      "fromTime": 810,
      "approvalId": "709735000006201663",
      "employeeZuid": 847692606,
      "fromTimeInTimeFormat": "01:30PM",
      "jobIsActive": true,
      "toTime": 1279,
      "jobName": "Technical Leadership",
      "approvalStatus": 1,
      "hours": 469,
      "clientId": "709735000001674119",
      "db_workDate": "2024-07-24 00:00:00.0",
      "jobIsCompleted": 0,
      "jobBillableStatus": "0",
      "isEditAllowed": false,
      "billableStatus": 0,
      "billingStatus": 0,
      "jobId": "709735000004420571",
      "add_ip": "201.2.43.114",
      "isTimelogPushedToQBO": false,
      "totaltime": 28140,
      "geoLocation": "SAO JOAO DALIANCA",
      "timelogId": "709735000006114691",
      "taskName": "Daily, Issues fixing, Material prep for the workshop, project planning, status report, summaries",
      "tt_inputType": 1,
      "projectName": "Account Management",
      "projectId": "709735000004417393",
      "toTimeInTimeFormat": "09:19PM",
      "employeename": "Gabriel",
      "isPushAllowToZF": true
    },
    {
      "erecno": "709735000004480001",
      "clientName": "Amway",
      "employeeMailId": "gabriel.tomonari@kissolutions.tech",
      "jobColor": 1,
      "isDeleteAllowed": false,
      "type": "2",
      "mod_ip": "201.2.43.114",
      "workDate": "2024-07-24",
      "fromTime": 618,
      "approvalId": "709735000006201663",
      "employeeZuid": 847692606,
      "jobIsActive": true,
      "toTime": 774,
      "jobName": "Technical Leadership",
      "approvalStatus": 1,
      "hours": 156,
      "clientId": "709735000001674119",
      "db_workDate": "2024-07-24 00:00:00.0",
      "jobIsCompleted": 0,
      "jobBillableStatus": "0",
      "isEditAllowed": false,
      "billableStatus": 0,
      "billingStatus": 0,
      "jobId": "709735000004420571",
      "add_ip": "201.2.43.114",
      "isTimelogPushedToQBO": false,
      "totaltime": 9383,
      "geoLocation": "SAO JOAO DALIANCA",
      "timelogId": "709735000006114233",
      "taskName": "Tech eval, summaries ",
      "tt_inputType": 1,
      "projectName": "Account Management",
      "projectId": "709735000004417393",
      "employeename": "Gabriel",
      "isPushAllowToZF": true
    }
  ],
  "leaveData": {
    "leaveJson": {}
  }
};

const getTimeString = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
};

const App = () => {
  return (
    <div className="calendar">
      {[...Array(24).keys()].map(hour => (
        <div key={hour} className="hour">
          <div className="hour-label">{`${hour}:00`}</div>
          <div className="hour-events">
            {eventsPayload.tsArr
              .filter(event => {
                const eventStartHour = Math.floor(event.fromTime / 60);
                const eventEndHour = Math.floor(event.toTime / 60);
                return eventStartHour <= hour && eventEndHour >= hour;
              })
              .map(event => (
                <div
                  key={event.timelogId}
                  className="event"
                  style={{
                    top: `${(event.fromTime % 60) * (100 / 60)}%`,
                    height: `${((event.toTime - event.fromTime) / 60) * 100}%`,
                    backgroundColor: '#d4e157'
                  }}
                >
                  <div className="event-time">
                    {getTimeString(event.fromTime)} - {getTimeString(event.toTime)}
                  </div>
                  <div className="event-details">
                    {event.taskName}
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
