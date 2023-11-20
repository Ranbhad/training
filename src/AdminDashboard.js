import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  TableHead,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Tabs,
  Tab,
  TableContainer,
} from '@mui/material';

const AdminDashboard = ({ onToggleForm }) => {
  const [courseName, setCourseName] = useState('');
  const [courseFees, setCourseFees] = useState('');
  const [courseDuration, setCourseDuration] = useState('');
  const [batch, setBatch] = useState('');
  const [strengthOfStudents, setStrengthOfStudents] = useState('');
  const [courses, setCourses] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    // Fetch the list of courses when the component mounts
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/courses');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error.message);
    }
  };

  const addCourse = async () => {
    try {
      // Validate input
      if (!courseName || !courseFees || !courseDuration || !batch || !strengthOfStudents) {
        alert('Please fill in all fields.');
        return;
      }

      // Create a new course object
      const newCourse = {
        name: courseName,
        fees: courseFees,
        duration: courseDuration,
        batch: batch,
        strengthOfStudents: strengthOfStudents,
      };

      // Send the new course data to the backend
      const response = await axios.post('http://localhost:8080/api/add-course', newCourse);

      // Handle the response as needed
      console.log('Course added successfully:', response.data);

      // Clear input fields
      setCourseName('');
      setCourseFees('');
      setCourseDuration('');
      setBatch('');
      setStrengthOfStudents('');

      // Refresh the course list
      fetchCourses();
    } catch (error) {
      console.error('Error adding course:', error.message);
      // Handle errors here
    }
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    // <Container maxWidth="md" style={{ marginTop: '100px', padding: '20px' }}>
      <Container>
      <Typography  variant="h4" component="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Tabs value={selectedTab} onChange={handleTabChange} >
        <Tab label="Add Course" />
        <Tab label="Course List" />
      </Tabs>
      <Box>
        {selectedTab === 0 && (
          <>
            <Typography align="center" variant="h4" component="h4" gutterBottom>
              Add Course
            </Typography>
            <Box sx={{ justifyContent: 'center', border: '1px solid lightgray', margin: '50px'}}>
              <Table>
                <TableBody>
                  <TableRow>
                    <div style={{ display: 'flex', flexDirection: 'row', margin: '40px' }}>
                      <TextField
                        label="Batch"
                        variant="outlined"
                        size="small"
                        value={batch}
                        onChange={(e) => setBatch(e.target.value)}
                        style={{ marginBottom: '10px' }}
                      />&nbsp;&nbsp;
                      <TextField
                        label="Course Name"
                        variant="outlined"
                        value={courseName}
                        size="small"
                        onChange={(e) => setCourseName(e.target.value)}
                        style={{ marginBottom: '10px' }}
                      />&nbsp;&nbsp;
                      <TextField
                        label="Course Fees"
                        variant="outlined"
                        value={courseFees}
                        size="small"
                        onChange={(e) => setCourseFees(e.target.value)}
                        style={{ marginBottom: '10px' }}
                      />&nbsp;&nbsp;
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', margin: '40px' }}>
                      <TextField
                        label="Course Duration"
                        variant="outlined"
                        size="small"
                        value={courseDuration}
                        onChange={(e) => setCourseDuration(e.target.value)}
                      />&nbsp;&nbsp;
                      <TextField
                        label="Strength of Students"
                        variant="outlined"
                        value={strengthOfStudents}
                        size="small"
                        onChange={(e) => setStrengthOfStudents(e.target.value)}
                      />&nbsp;&nbsp;
                      <Button
                        size="small"
                        variant="contained"
                        onClick={addCourse}
                        style={{ backgroundColor: '#007bff', color: '#fff' }}
                      >
                        Add Course
                      </Button>&nbsp;&nbsp;
                    </div>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </>
        )}
        {selectedTab === 1 && (
          <div>
            <Typography align="center" variant="h4" component="h4" gutterBottom>
              Course List
            </Typography>
            <TableContainer component={Paper} >
            <Table>
              <TableHead >
                <TableRow>
                  <TableCell>Course Name</TableCell>
                  <TableCell>Course Fees</TableCell>
                  <TableCell>Course Duration</TableCell>
                  <TableCell>Batch</TableCell>
                  <TableCell>Strength Of Students</TableCell>
                </TableRow>
              </TableHead>
                <TableBody>
                  {courses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell>{course.name}</TableCell>
                      <TableCell>{course.fees}</TableCell>
                      <TableCell>{course.duration}</TableCell>
                      <TableCell>{course.batch}</TableCell>
                      <TableCell>{course.strengthOfStudents}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            </div>
        )}
      </Box>
    </Container>
  );
};

export default AdminDashboard;
