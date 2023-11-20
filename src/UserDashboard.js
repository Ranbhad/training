import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tabs,
  Tab,
  Box,
} from '@mui/material';

const UserDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [uniqueCourses, setUniqueCourses] = useState([]);
  const [selectedCourseDetails, setSelectedCourseDetails] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [studentDetails, setStudentDetails] = useState({
    name: '',
    email: '',
    mobile: '',
    studentId: '',
  });
  const [registeredStudents, setRegisteredStudents] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [showAddBatchDialog, setShowAddBatchDialog] = useState(false);
  const [selectedBatchCourses, setSelectedBatchCourses] = useState([]);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [showEnrollStudentTab, setShowEnrollStudentTab] = useState(false);
  const [enrolledStudents, setEnrolledStudents] = useState([]);

  const handlePayment = (courseName) => {
    // Implement your payment logic here
    // For demonstration purposes, let's just show the payment dialog
    setShowPaymentDialog(true);
  };

  const handlePaymentDialogClose = () => {
    // Close the payment dialog
    setShowPaymentDialog(false);
  };

  const handlePaymentSubmit = async () => {
    // Implement your payment submission logic here
    // For demonstration purposes, let's log a message
    console.log('Payment submitted successfully!');
    setShowPaymentDialog(false); // Close the payment dialog after submission
  };

  const handleStudentIdChange = async (enteredStudentId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/students/${enteredStudentId}`);
      const studentData = response.data;

      // Update the state with the fetched student details
      setStudentDetails({
        studentId: studentData.studentId,
        name: studentData.name,
        email: studentData.email,
        mobile: studentData.mobile,
      });
    } catch (error) {
      console.error('Error fetching student details:', error.message);
      // Handle error, e.g., show a message to the user
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setStudentDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const coursesResponse = await axios.get('http://localhost:8080/api/courses');
        setCourses(coursesResponse.data);

        const studentsResponse = await axios.get('http://localhost:8080/api/registered-students');
        setRegisteredStudents(studentsResponse.data);
        
        

        // Extract unique course names
        const uniqueCourseNames = [...new Set(coursesResponse.data.map((course) => course.name))];
        setUniqueCourses(uniqueCourseNames);
        const enrolledStudentsResponse = await axios.get('http://localhost:8080/api/students');
        setEnrolledStudents(enrolledStudentsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleRegister = async (course) => {
    try {
      // Fetch the details for the selected course
      const courseDetailsResponse = await axios.get(`http://localhost:8080/api/courses/${course.id}`);
      const courseDetails = courseDetailsResponse.data;

      setSelectedCourse(course);
      setShowRegistrationForm(true);
      setStudentDetails({
        name: '',
        email: '',
        mobile: '',
      });

      // Update the course details in the state
      setSelectedCourseDetails(courseDetails);
    } catch (error) {
      console.error('Error fetching course details:', error.message);
    }
  };

  const handleAddBatch = async (courseName) => {
 try {
      const coursesWithSameName = courses.filter((course) => course.name === courseName);
      setSelectedBatchCourses(coursesWithSameName);
      setShowAddBatchDialog(true);

// Fetch batches for the selected course
      // const batchesResponse = await axios.get(`http://localhost:8080/api/batches/${coursesWithSameName[0]?.id}`);
      // const batches = batchesResponse.data;

      // // Generate student IDs for each batch
      // const batchsWithStudentIds = batches.map((batch, index) => ({
      //   ...batch,
      //   studentId: `${batch.batch}${index + 1}`, // Generate student ID
      // }));

      // setSelectedBatchCourses(batchsWithStudentIds);
    } catch (error) {
      console.error('Error fetching batches for the course:', error.message);
    }
  };

  const handleFormSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/register-student', {
        courseId: selectedCourse.id,
        courseName: selectedCourse.name,
        courseFees: selectedCourse.fees,
        courseDuration: selectedCourse.duration,
        studentId: studentDetails.studentId,
        batch: selectedCourse.batch,
        name: studentDetails.name,
        email: studentDetails.email,
        mobile: studentDetails.mobile,
        // studentId: selectedBatchCourses[0]?.studentId, // Use the student ID from the first batch
      });
  
      console.log('Student registered successfully:', response.data);
  
      setShowRegistrationForm(false);
      setSelectedCourse(null);
      setStudentDetails({
        name: '',
        email: '',
        mobile: '',
      });
    } catch (error) {
      console.error('Error registering student:', error.message);
    }
  };
  const handleEnrollButtonClick = () => {
    setShowEnrollStudentTab(true)
    // Implement logic to handle the enrollment button click
    // For example, you can navigate to the enrollment page or show a registration form
    console.log('Enroll button clicked!');
  };
  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/students', {
        name: studentDetails.name,
        email: studentDetails.email,
        mobile: studentDetails.mobile,
      });
  
      console.log('Student registered successfully:', response.data);
  
      setShowEnrollStudentTab(false);
      setStudentDetails({
        name: '',
        email: '',
        mobile: '',
      });
    } catch (error) {
      console.error('Error registering student:', error.message);
    }
  };

  return (
    <div>
      <h2>User Dashboard</h2>
      <Box sx={{ position: 'absolute', top: 0, right: 0, padding: '10px' }}>
        <Button variant="contained" color="primary" onClick={handleEnrollButtonClick}>
          Enroll Student
        </Button>
      </Box>
      <Tabs value={selectedTab} onChange={(event, newValue) => setSelectedTab(newValue)}>
        <Tab label="Your Courses" />
        <Tab label="Batches" />
        <Tab label="Registered Students" />
      </Tabs>

      <Box hidden={selectedTab !== 0}>
        <h3>Your Courses</h3>
        {uniqueCourses.length === 0 ? (
          <p>No courses available.</p>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Course Name</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {uniqueCourses.map((courseName) => (
                  <TableRow key={courseName}>
                    <TableCell>{courseName}</TableCell>
                    <TableCell>
                      <Button onClick={() => handleAddBatch(courseName)}>Add Batch</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>

      <Dialog open={showAddBatchDialog} onClose={() => setShowAddBatchDialog(false)} maxWidth="xl" fullWidth>
        <DialogTitle>{`Add Batch for ${selectedBatchCourses[0]?.name}`}</DialogTitle>
        <DialogContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Batch</TableCell>
                  <TableCell>Course Fees</TableCell>
                  <TableCell>Course Duration</TableCell>
                  <TableCell>Strength Of Students</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedBatchCourses.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell>{course.batch}</TableCell>
                    <TableCell>{course.fees}</TableCell>
                    <TableCell>{course.duration}</TableCell>
                    <TableCell>{course.strengthOfStudents}</TableCell>
                    <TableCell>
                      <Button onClick={() => handleRegister(course)}>Register</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowAddBatchDialog(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={showEnrollStudentTab} onClose={() => setShowEnrollStudentTab(false)} maxWidth="md" fullWidth >
        <DialogTitle>{`Registration Form for Institute`}</DialogTitle>
        <Box sx={{ justifyContent: 'center', border: '1px solid lightgray', margin: '10px'}}>
        <DialogContent>
            <div style={{ display: 'flex', flexDirection: 'row', margin: '20px' }}>
              <TextField
                label="Name"
                value={studentDetails.name}
                onChange={(e) => setStudentDetails({ ...studentDetails, name: e.target.value })}
                required
                size="small"
              />&nbsp;&nbsp;
              <TextField
                label="Email"
                type="email"
                value={studentDetails.email}
                onChange={(e) => setStudentDetails({ ...studentDetails, email: e.target.value })}
                required
                size="small"
              />&nbsp;&nbsp;
               <TextField
                label="Mobile"
                type="mobilr"
                value={studentDetails.mobile}
                onChange={(e) => setStudentDetails({ ...studentDetails, mobile: e.target.value })}
                required
                size="small"
              />&nbsp;&nbsp;
           
            </div>
        
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowEnrollStudentTab(false)} color="primary">
            Cancel
          </Button>&nbsp;&nbsp;
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>&nbsp;&nbsp;
        </DialogActions>
        </Box>
      </Dialog>
      <Dialog open={showRegistrationForm} onClose={() => setShowRegistrationForm(false)} maxWidth="md" fullWidth >
        <DialogTitle>{`Registration Form for ${selectedCourse?.name}`}</DialogTitle>
        <Box sx={{ justifyContent: 'center', border: '1px solid lightgray', margin: '10px'}}>
        <DialogContent>

          <div style={{ display: 'flex', flexDirection: 'row', margin: '20px' }}>
              <TextField label="StudentID" value={selectedCourseDetails.batch} disabled size="small" />&nbsp;&nbsp;
              <TextField label="Course Name" value={selectedCourseDetails.name} disabled size="small" />&nbsp;&nbsp;
              <TextField label="Course Fees" value={selectedCourseDetails.fees} disabled size="small" />&nbsp;&nbsp;
              <TextField label="Course Duration" value={selectedCourseDetails.duration} disabled size="small" />&nbsp;&nbsp;
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', margin: '20px' }}>
            <TextField
        label="Student ID"
        name="studentId"
        value={studentDetails.studentId}
        onChange={(e) => {
          handleChange(e);
          handleStudentIdChange(e.target.value);
        }}
      />
      <TextField
        label="Name"
        name="name"
        value={studentDetails.name}
        // Other input fields for email, mobile, etc.
        // Add them based on your data structure
      />
      <TextField
        label="Email"
        name="email"
        value={studentDetails.email}
        // Other input fields for email, mobile, etc.
        // Add them based on your data structure
      />
      <TextField
        label="Mobile"
        name="mobile"
        value={studentDetails.mobile}
        // Other input fields for email, mobile, etc.
        // Add them based on your data structure
      />
            </div>
        
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowRegistrationForm(false)} color="primary">
            Cancel
          </Button>&nbsp;&nbsp;
          <Button onClick={handleFormSubmit} color="primary">
            Submit
          </Button>&nbsp;&nbsp;
        </DialogActions>
        </Box>
      </Dialog>
      <Box hidden={selectedTab !== 2}>
        <h3>Registered Students</h3>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>StudentID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Mobile</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {enrolledStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.studentId}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.mobile}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box hidden={selectedTab !== 1}>
        <h3>Batches and Registered Students</h3>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Batch</TableCell>
                <TableCell>Course</TableCell>
                <TableCell>Registered Students</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {registeredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.studentId}</TableCell>
                  <TableCell>{student.courseName}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  {/* <TableCell>
                    {student.registeredStudents.map((student) => (
                      <div key={student.id}>
                        {student.name} - {student.email}
                      </div>
                    ))}
                  </TableCell> */}
                  <TableCell>
                    <Button onClick={handlePayment}>Pay</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Dialog open={showPaymentDialog} onClose={handlePaymentDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle>{`Payment for ${selectedCourse?.name}`}</DialogTitle>
        <DialogContent>
          <div style={{ display: 'flex', flexDirection: 'row', margin: '20px' }}>
              <TextField label="StudentID" value={selectedCourseDetails.batch} disabled size="small" />&nbsp;&nbsp;
              <TextField label="Course Name" value={selectedCourseDetails.name} disabled size="small" />&nbsp;&nbsp;
              <TextField label="Course Fees" value={selectedCourseDetails.fees} disabled size="small" />&nbsp;&nbsp;
              <TextField label="Course Duration" value={selectedCourseDetails.duration} disabled size="small" />&nbsp;&nbsp;
            </div>
          {/* Payment Form (Replace with your actual payment form) */}
          <TextField
            label="Card Number"
            type="text"
            // Add necessary properties and handlers for card number input
            fullWidth
            margin="normal"
          />
          <TextField
            label="Expiration Date"
            type="text"
            // Add necessary properties and handlers for expiration date input
            fullWidth
            margin="normal"
          />
          <TextField
            label="CVV"
            type="text"
            // Add necessary properties and handlers for CVV input
            fullWidth
            margin="normal"
          />
          {/* Add more fields as needed for your payment form */}

        </DialogContent>
        <DialogActions>
          <Button onClick={handlePaymentDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handlePaymentSubmit} color="primary">
            Submit Payment
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserDashboard;
