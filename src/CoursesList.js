import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Paper, List, ListItem, ListItemText, Container } from '@mui/material';

const CoursesList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch the list of courses from the backend when the component mounts
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/get-courses');
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error.message);
        // Handle errors here
      }
    };

    fetchCourses();
  }, []);

  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Courses List
        </Typography>
        {courses.length === 0 ? (
          <Typography variant="body1" align="center">
            No courses available.
          </Typography>
        ) : (
          <List>
            {courses.map((course) => (
              <ListItem key={course.id}>
                <ListItemText
                  primary={course.name}
                  secondary={`Fees: ${course.fees}, Duration: ${course.duration}`}
                />
              </ListItem>
            ))}
          </List>
        )}
      </Paper>
    </Container>
  );
};

export default CoursesList;
