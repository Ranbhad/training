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
  Box, Typography, Container,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const UserDashboard = ({onBackToLogin, loggedInUser}) => {
  const navigate = useNavigate();
  const [showStudentCoursesDialog, setShowStudentCoursesDialog] = useState(false);
  const [selectedStudentCourses, setSelectedStudentCourses] = useState([]);
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
// Add this state variable
const [showPaymentForm, setShowPaymentForm] = useState(false);

const handleStudentClick = async (studentId) => {
  try {
    // Fetch the courses registered by the selected student
    const response = await axios.get(`http://localhost:8080/api/registered-students/${studentId}`);
    const courses = response.data;

    // Update the state with the fetched courses
    setSelectedStudentCourses(courses);

    // Open the dialog to display the courses
    setShowStudentCoursesDialog(true);
  } catch (error) {
    console.error('Error fetching registered courses:', error.message);
  }
};

  const handleBackButtonClick = () => {
    console.log('Navigating to /login');
    onBackToLogin();
    navigate('/login');
  };

  const handlePayment = (courseName) => {
    // Implement your payment logic here
    // For demonstration purposes, let's just show the payment dialog
    setShowPaymentDialog(true);
    setShowPaymentForm(true); // Set the state to true when the payment dialog is opened
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

  const [instituteKey, setInstituteKey] = useState('');
  const [userDetails, setUserDetails] = useState({});
  const [uniqueCourseNames, setUniqueCourseNames] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [fetchedCourses, setFetchedCourses] = useState([]);
  const [fetchedStudents, setFetchedStudents] = useState([]);

  const fetchUserDetails = async () => {
    try {
      // Use the logged-in user's email to fetch user details
      const response = await axios.get(`http://localhost:8080/api/user?email=${loggedInUser.email}`);
      console.log('User Details Response:', response);

      // Access and log the instituteKey
      const instituteKeyFromResponse = response.data.instituteKey;
      console.log('Institute Key:', instituteKeyFromResponse);

      // Set the instituteKey state with the fetched value
      setInstituteKey(instituteKeyFromResponse);

      // Fetch courses based on the institute key
      const coursesResponse = await axios.get(`http://localhost:8080/api/courses/user?email=${loggedInUser.email}`);

      console.log('Courses Response:', coursesResponse);
      console.log('Courses Response Data:', coursesResponse.data);

      // Set the fetched courses in the state
      setFetchedCourses(coursesResponse.data);

      // Update the user details state
      setUserDetails(response.data);
      const uniqueNames = Array.from(new Set(fetchedCourses.map(course => course.name)));
      setUniqueCourseNames(uniqueNames);

    } catch (error) {
      console.error('error while fetching courses:', error.message);
      console.error('Error fetching user details:', error.message);
    }
  };
  useEffect(() => {
    console.log('Executing fetchUserDetails useEffect');
    console.log('loggedInUser:', loggedInUser);
    fetchUserDetails();
  }, [loggedInUser]);
  const fetchStudents = async () => {
    try {
      // Fetch students based on the institute key and user email
      const studentsResponse = await axios.get(`http://localhost:8080/api/students/students?instituteKey=${instituteKey}`);
      setFetchedStudents(studentsResponse.data);
    } catch (error) {
      console.error('Error fetching students:', error.message);
    }
  };
  useEffect(() => {
    console.log('Executing fetchUserDetails useEffect');
    console.log('loggedInUser:', loggedInUser);
  
    if (instituteKey && loggedInUser.email) {
      fetchStudents();
    }
  }, [instituteKey, loggedInUser.email]);
  const handleCourseClick = (courseName) => {
    // Filter courses with the selected name
    const selectedCoursesByName = fetchedCourses.filter(course => course.name === courseName);
    setSelectedCourses(selectedCoursesByName);
  };
  
  const handleRegister = async (course) => {
    try {
      // Fetch the details for the selected course
      const courseDetailsResponse = await axios.get(`http://localhost:8080/api/courses/${course.id}`);
      const courseDetails = courseDetailsResponse.data;

      setSelectedCourse(course);
      setShowRegistrationForm(true);
      setStudentDetails({
        studentId: '',
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
  const [selectregisteredStudents, setSelectRegisteredStudents] = useState([]);
  
  const fetchRegisteredStudents = async () => {
    try {
      // Fetch students based on the institute key and user email
      const registeredStudentsResponse = await axios.get(`http://localhost:8080/api/registered-students?instituteKey=${instituteKey}`);
      setSelectRegisteredStudents(registeredStudentsResponse.data);
    } catch (error) {
      console.error('Error fetching students:', error.message);
    }
  };
  useEffect(() => {
    console.log('Executing fetchUserDetails useEffect');
    console.log('loggedInUser:', loggedInUser);
  
    if (instituteKey && loggedInUser.email) {
      fetchRegisteredStudents();
    }
  }, [instituteKey, loggedInUser.email]);
  

  const handleAddBatch = async (courseName) => {
 try {
      const coursesWithSameName = courses.filter((course) => course.name === courseName);
      setSelectedBatchCourses(coursesWithSameName);
      setShowAddBatchDialog(true);

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
        instituteKey: instituteKey,
        // studentId: selectedBatchCourses[0]?.studentId, // Use the student ID from the first batch
      });
  
      console.log('Student registered successfully:', response.data);
      setRegisteredStudents((prevData) => [...prevData, response.data]);
  
      setShowRegistrationForm(false);
      setSelectedCourse(null);
      setStudentDetails({
        instituteKey: '',
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
        instituteKey: instituteKey,
        name: studentDetails.name,
        email: studentDetails.email,
        mobile: studentDetails.mobile,
      });
  
      console.log('Student registered successfully:', response.data);
      setEnrolledStudents((prevData) => [...prevData, response.data]);
      setShowEnrollStudentTab(false);
      setStudentDetails({
        instituteKey: '',
        name: '',
        email: '',
        mobile: '',
      });
    } catch (error) {
      console.error('Error registering student:', error.message);
    }
  };

  const handleDelete={
    
  }

  const styles = {
    container: {
      textAlign: 'center',
      // maxWidth: '400px',
      margin: 'auto',
      marginTop: '50px',
      padding: '20px',
      // marginLeft: '300px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      borderRadius: '3px',
      backgroundColor: 'White'
    },
    button: {
      padding: '0px',
      backgroundColor: 'Black',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      fontSize: '14px',
      cursor: 'pointer',
    },
  };

  return (
    <div style={{
      backgroundImage: 'url("https://t4.ftcdn.net/jpg/05/24/00/19/240_F_524001951_3pFrgt8uaKLpiSuOhCK5Vl4Dhc5VDOOS.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      overflow: 'hidden',
    }}>
      <Container style={styles.container}>
      <h2><p>Welcome {loggedInUser ? loggedInUser.email : 'Loading...'}</p></h2>

      <Typography  variant="h4" component="h4" gutterBottom>
        Manager Dashboard
      </Typography>
      <Button sx={{ position: 'absolute', top: 59, left: 50, padding: '10px' }} variant="contained" onClick={handleBackButtonClick} style={{ backgroundColor: 'Black', marginBottom: '20px', Marginleft:'0px' }}>
          Back to Login
        </Button>
      <Tabs value={selectedTab} onChange={(event, newValue) => setSelectedTab(newValue)}>
        <Tab label="Your Courses" />
        <Tab label="Batches" />
        <Tab label="Registered Students" />
        <Box sx={{ position: 'absolute', top: 0, right: 0, padding: '10px' }}>
        <Button variant="contained" color='inherit' onClick={handleEnrollButtonClick}>
          Enroll Student
        </Button>
      </Box>
      </Tabs>

      <Box hidden={selectedTab !== 0}>
      <Typography align="center" variant="h5" component="h5" gutterBottom>
              Your Course
            </Typography>
        {/* {uniqueCourseNames.length === 0 ? (
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
                {uniqueCourseNames.map((courseName) => (
                  <TableRow key={courseName}>
                    <TableCell>{courseName}</TableCell>
                    <TableCell>
                      <Button variant='contained' onClick={() => handleAddBatch(courseName)} color='inherit'>Add Batch</Button>
                    </TableCell>
                    </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer> 
          )} */}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                <TableCell>Course Name</TableCell>
                  <TableCell>Batch</TableCell>
                  <TableCell>Course Fees</TableCell>
                  <TableCell>Course Duration</TableCell>
                  <TableCell>Strength Of Students</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {fetchedCourses.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell>{course.name}</TableCell>
                    <TableCell>{course.batch}</TableCell>
                    <TableCell>{course.fees}</TableCell>
                    <TableCell>{course.duration}</TableCell>
                    <TableCell>{course.strengthOfStudents}</TableCell>
                    <TableCell>
                      <Button onClick={() => handleRegister(course)} variant='contained' color='inherit'>Register</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
       
      </Box>

      {/* <Dialog open={showAddBatchDialog} onClose={() => setShowAddBatchDialog(false)} maxWidth="xl" fullWidth>
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
                {selectedCourses.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell>{course.batch}</TableCell>
                    <TableCell>{course.fees}</TableCell>
                    <TableCell>{course.duration}</TableCell>
                    <TableCell>{course.strengthOfStudents}</TableCell>
                    <TableCell>
                      <Button onClick={() => handleRegister(course)} variant='contained' color='inherit'>Register</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent> 
        <DialogActions>
          <Button onClick={() => setShowAddBatchDialog(false)} variant='contained' style={{backgroundColor: "Black"}}>
            Close
          </Button>
        </DialogActions>
      </Dialog>*/}
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
          <Button onClick={() => setShowEnrollStudentTab(false)} variant='contained' style={{backgroundColor: "Black"}}>
            Cancel
          </Button>&nbsp;&nbsp;
          <Button onClick={handleSubmit} variant='contained' style={{backgroundColor: "Black"}}>
            Submit
          </Button>&nbsp;&nbsp;
        </DialogActions>
        </Box>
      </Dialog>
      <Dialog open={showRegistrationForm} onClose={() => setShowRegistrationForm(false)} maxWidth="md" fullWidth >
        <DialogTitle>{`Registration Form for ${selectedCourse?.name}`}</DialogTitle>
        <Box sx={{ justifyContent: 'center', border: '1px solid lightgray', margin: '10px'}}>
        <DialogContent>
{/* 
          <div style={{ display: 'flex', flexDirection: 'row', margin: '20px' }}>
              <TextField label="StudentID" value={selectedCourseDetails.batch} disabled size="small" />&nbsp;&nbsp;
              <TextField label="Course Name" value={selectedCourseDetails.name} disabled size="small" />&nbsp;&nbsp;
              <TextField label="Course Fees" value={selectedCourseDetails.fees} disabled size="small" />&nbsp;&nbsp;
              <TextField label="Course Duration" value={selectedCourseDetails.duration} disabled size="small" />&nbsp;&nbsp;
            </div> */}
            <div style={{ display: 'flex', flexDirection: 'row', margin: '20px' }}>
            <TextField
        label="Student ID"
        name="studentId"
        size='small'
        value={studentDetails.studentId}
        onChange={(e) => {
          handleChange(e);
          handleStudentIdChange(e.target.value);
        }}
      />&nbsp;&nbsp;
      <TextField
        label="Name"
        name="name"
        size='small'
        value={studentDetails.name}
        />&nbsp;&nbsp;
      <TextField
        label="Email"
        name="email"
        size='small'
        value={studentDetails.email}
        />&nbsp;&nbsp;
      <TextField
        label="Mobile"
        name="mobile"
        size='small'
        value={studentDetails.mobile}
         />&nbsp;&nbsp;
            </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowRegistrationForm(false)} variant='contained' style={{backgroundColor: "Black"}}>
            Cancel
          </Button>&nbsp;&nbsp;
          <Button onClick={handleFormSubmit} variant='contained' style={{backgroundColor: "Black"}}>
            Submit
          </Button>&nbsp;&nbsp;
        </DialogActions>
        </Box>
      </Dialog>
      <Box hidden={selectedTab !== 2}>
      <Typography align="center" variant="h5" component="h5" gutterBottom>
              Registered Students
            </Typography>
            {fetchedStudents.length > 0 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>StudentID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Mobile</TableCell>
                <TableCell>Total Fees</TableCell>
                <TableCell>Paid Fees</TableCell>
                <TableCell>Balance Fees</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {fetchedStudents.map((student) => (
              <TableRow key={student.id}>
                <TableCell>
                  <Button onClick={() => handleStudentClick(student.studentId)}>{student.studentId}</Button>
                </TableCell>
                <TableCell>{student.name}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.mobile}</TableCell>
                  <TableCell>{student.totalFees}</TableCell>
                  <TableCell>{student.paidFees}</TableCell>
                  <TableCell>{student.balanceFees}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
            )}
      </Box>

      <Box hidden={selectedTab !== 1}>
      <Typography align="center" variant="h5" component="h5" gutterBottom>
              Batches
            </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Batch</TableCell>
                <TableCell>StudentID</TableCell>
                <TableCell>Course</TableCell>
                <TableCell>Registered Students</TableCell>
                <TableCell>Action</TableCell>
                <TableCell>Withdraw</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectregisteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.batch}</TableCell>
                  <TableCell>{student.studentId}</TableCell>
                  <TableCell>{student.courseName}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>
                    <Button onClick={handlePayment} style={styles.button}>Pay</Button>
                  </TableCell>
                  <TableCell>
                    <Button variant='contained' onClick={handleDelete} color='inherit'>
                      Withdraw
                    </Button>
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
    {showPaymentForm && (
      <>
        <div style={{ display: 'flex', flexDirection: 'row', margin: '20px' }}>
          <TextField label="StudentID" value={studentDetails.studentId} disabled size="small" />&nbsp;&nbsp;
          <TextField label="Student Name" value={studentDetails.name} disabled size="small" />&nbsp;&nbsp;
          <TextField label="Student Email" value={studentDetails.email} disabled size="small" />&nbsp;&nbsp;
          <TextField label="Student Phone" value={studentDetails.mobile} disabled size="small" />&nbsp;&nbsp;
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', margin: '20px' }}>
          <TextField label="Batch" value={selectedCourseDetails.batch} disabled size="small" />&nbsp;&nbsp;
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
      </>
    )}
  </DialogContent>
  <DialogActions>
    <Button onClick={handlePaymentDialogClose} variant='contained' style={{ backgroundColor: "Black" }}>
      Cancel
    </Button>
    <Button onClick={handlePaymentSubmit} variant='contained' style={{ backgroundColor: "Black" }}>
      Submit Payment
    </Button>
  </DialogActions>
</Dialog>
<Dialog
  open={showStudentCoursesDialog}
  onClose={() => setShowStudentCoursesDialog(false)}
  maxWidth="md"
  fullWidth
>
  <DialogTitle>Registered Courses</DialogTitle>
  <DialogContent>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Course Name</TableCell>
            {/* Add more columns as needed */}
          </TableRow>
        </TableHead>
        <TableBody>
          {selectedStudentCourses.map((course) => (
            <TableRow key={course.id}>
              <TableCell>{course.courseName}</TableCell>
              <TableCell>{course.courseFees}</TableCell>
              <TableCell>{course.batch}</TableCell>
              {/* Add more cells based on the course data */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setShowStudentCoursesDialog(false)} variant='contained' style={{ backgroundColor: "Black" }}>
      Close
    </Button>
  </DialogActions>
</Dialog>


    </Container>
    </div>
  );
};

export default UserDashboard;
