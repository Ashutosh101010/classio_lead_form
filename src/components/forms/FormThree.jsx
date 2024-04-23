import { Box, Button, Card, CardActions, CardContent, FormControl, Grid, InputLabel, MenuItem, Select, TextField, TextareaAutosize, Typography, useMediaQuery } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import CourseNetwrok from "../authentication/network";

const FormThree = () => {

    const instId = '94'
    const mobile = useMediaQuery("(min-width:600px)");
    const [course, setCourse] = useState("");
    const [coursesData, setCoursesData] = useState([]);

    useEffect(() => {
        getAllCourses();
    }, []);

    const handleChangeCourse = (e) => {
        setCourse(e.target.value)
    }

    const getAllCourses = async () => {
        const response = await CourseNetwrok.fetchCourses(instId);
        let templist = [];
        response.courses.forEach((course) => {
            if (course.active == true) {
                templist.push(course);
            }
        })
        setCoursesData(templist);
    };

    return (
        <React.Fragment>
            <Grid container sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: '98vh' }}>
                <Grid xs={12} sm={8} md={6} lg={3}>
                    <form>
                        <Card>
                            <CardContent sx={{ padding: 0 }}>
                                <Box sx={{ textAlign: "center", borderTopLeftRadius: "10px", borderTopRightRadius: "10px", background: "#efa902", color: "#fff", padding: "15px" }}>
                                    <Typography variant="h5" sx={{ mb: 1 }}>
                                        Submit  for  Get In Touch
                                    </Typography>
                                    <Typography>
                                        We'd love to hear from you, please drop us a line if you've any
                                        query related to our program and courses.
                                    </Typography>
                                </Box>
                                <Box sx={{ margin: "15px" }}>


                                    <TextField
                                        InputProps={{
                                            style: { borderRadius: "8px", background: "#f2f2f2" },
                                        }}
                                        sx={{ my: 2 }}
                                        fullWidth
                                        type="text"
                                        placeholder="Enter Your Name"
                                    // onChange={handleFullName}
                                    // value={fullName}
                                    />
                                    <TextField
                                        InputProps={{
                                            style: { borderRadius: "8px", background: "#f2f2f2" },
                                        }}
                                        sx={{ my: 2 }}
                                        fullWidth
                                        type="text"
                                        placeholder="Enter Your Phone Number"
                                    // onChange={handleFullName}
                                    // value={fullName}
                                    />
                                    <TextField
                                        InputProps={{
                                            style: { borderRadius: "8px", background: "#f2f2f2" },
                                        }}
                                        sx={{ my: 2 }}
                                        fullWidth
                                        type="text"
                                        placeholder="Enter Your Email"
                                    // onChange={handleFullName}
                                    // value={fullName}
                                    />
                                    <FormControl fullWidth sx={{ my: 2 }}>
                                        <InputLabel id="demo-simple-select-label">Course</InputLabel>
                                        <Select
                                            sx={{ borderRadius: "8px", background: "#f2f2f2" }}
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            label="Course"
                                            value={course}
                                            onChange={handleChangeCourse}
                                        >
                                            <MenuItem value="">
                                                <em>Select Your Course</em>
                                            </MenuItem>
                                            {coursesData && coursesData.map((filteredCourse, index) => {
                                                return (
                                                    <MenuItem
                                                        value={filteredCourse}
                                                        style={{
                                                            margin: '10px'
                                                        }}
                                                    >
                                                        {filteredCourse.title}
                                                    </MenuItem>
                                                )
                                            })}
                                        </Select>
                                    </FormControl>
                                    <p style={{ margin: 0 }}>Message</p>
                                    <TextareaAutosize
                                        maxRows={7}
                                        variant="outlined"
                                        label="Enter Message"
                                        // sx={{ minWidth: 500 }}
                                        name="message"
                                        // value={note}
                                        style={{
                                            background: "#f2f2f2",
                                            border: '1px solid #cbd5e1',
                                            borderRadius: "8px",
                                            width: '100%',
                                            height: "100px"
                                        }}
                                    // onChange={(e) => setNote(e.target.value)}
                                    // className='textarea-field'
                                    />

                                </Box>
                            </CardContent>
                            <CardActions
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <Button
                                    sx={{
                                        boxShadow: "0 3px 26px #00000014",
                                        background: '#b50303',
                                        padding: "10px 25px",
                                        color: '#fff',
                                        borderRadius: '11px',
                                        border: 'none',
                                        float: "none",
                                        '&:hover': {
                                            background: '#bf8c07',
                                        },
                                        mb: 4
                                    }}
                                >
                                    Send Message
                                </Button>
                            </CardActions>

                        </Card>
                    </form>
                </Grid>
            </Grid>
        </React.Fragment>
    )
};

export default FormThree;