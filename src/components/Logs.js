import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Logs = () => {
  const navigate = useNavigate();
  // Mock data for logs - only check-ins
  const [logs] = useState([
    {
      id: 1,
      employeeName: "John Doe",
      checkInTime: "2024-03-20 09:00:23",
      accuracy: "98.5%"
    },
    {
      id: 2,
      employeeName: "Jane Smith",
      checkInTime: "2024-03-20 09:15:45",
      accuracy: "97.2%"
    },
    {
      id: 3,
      employeeName: "Mike Johnson",
      checkInTime: "2024-03-20 08:30:12",
      accuracy: "98.1%"
    }
  ]);

  // Filter states
  const [dateFilter, setDateFilter] = useState('');
  const [nameFilter, setNameFilter] = useState('');

  // Filtered logs
  const filteredLogs = logs.filter(log => {
    const matchesDate = dateFilter ? log.checkInTime.includes(dateFilter) : true;
    const matchesName = nameFilter 
      ? log.employeeName.toLowerCase().includes(nameFilter.toLowerCase()) 
      : true;
    return matchesDate && matchesName;
  });

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Employee Check-in Logs</h2>
        <div>
          <button 
            className="btn btn-secondary me-2"
            onClick={() => navigate('/register')}
          >
            Register Employee
          </button>
          <button 
            className="btn btn-primary"
            onClick={() => navigate('/')}
          >
            Home
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="row mb-4">
        <div className="col-md-6">
          <input
            type="date"
            className="form-control"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            placeholder="Filter by date"
          />
        </div>
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
            placeholder="Filter by employee name"
          />
        </div>
      </div>

      {/* Logs Table */}
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Employee Name</th>
              <th>Check-in Time</th>
              <th>Recognition Accuracy</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map(log => (
              <tr key={log.id}>
                <td>{log.employeeName}</td>
                <td>{log.checkInTime}</td>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="progress" style={{ width: '100px', height: '20px' }}>
                      <div 
                        className="progress-bar" 
                        role="progressbar" 
                        style={{ width: log.accuracy }}
                        aria-valuenow={parseFloat(log.accuracy)} 
                        aria-valuemin="0" 
                        aria-valuemax="100"
                      >
                        {log.accuracy}
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredLogs.length === 0 && (
        <div className="text-center mt-4">
          <p>No logs found matching your filters.</p>
        </div>
      )}
    </div>
  );
};

export default Logs; 