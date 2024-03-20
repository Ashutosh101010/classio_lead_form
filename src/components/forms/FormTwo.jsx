import { Box, Button, Card, CardActions, CardContent, FormControl, Grid, InputLabel, MenuItem, Select, TextField, TextareaAutosize, Typography, useMediaQuery } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import CourseNetwrok from "../authentication/network";

const FormTwo = ({setApiResponse}) => {

    const queryParam = new URLSearchParams(location.search);
    const instId = queryParam.get("instituteid");
    const campaignId = queryParam.get("campaignid");
    const metaCampaignId = queryParam.get("campaign_id");
    const mobile = useMediaQuery("(min-width:600px)");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [number, setNumber] = useState("");
    const [emailId, setEmailId] = useState("");
    const [message, setMessage] = useState("");
    const [course, setCourse] = useState("");
    const [typeSelect, setTypeSelect] = useState("");
    const [coursesData, setCoursesData] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        if (typeSelect === "course") {
            getAllCourses();
        }else if (typeSelect === "testSeries") {
            getTestSeries();
        }
       
    }, [typeSelect]);

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

    const getTestSeries = async () => {
        const response = await CourseNetwrok.fetchTestSeries(instId);
        let templist = [];
        response.testSeriesList.forEach((course) => {
            if (course.active == true) {
                templist.push(course);
            }
        })
        setCoursesData(response?.testSeriesList);
    };

    const handleSubmit = async () => {
        if (firstName && lastName && number && emailId && typeSelect && course && message) {
            const body = {
                "firstName": firstName,
                "lastName": lastName,
                "email": emailId,
                "contact": number,
                "enquiryType": typeSelect,
                "contentId": course.id,
                "instId": instId,
                "campaignId": campaignId ?campaignId : metaCampaignId ? metaCampaignId : null
            }
            const response = await CourseNetwrok.submitForm(body);
            if (response?.errorCode === 0) {
                setApiResponse(true);
                setFirstName("");
                setLastName("");
                setNumber("");
                setEmailId("");
                setTypeSelect("");
                setCourse("");
                setMessage("");
                setError("");
            }
        }
        else {
            setError("All fields Are required");
        }
    }

    return (
        <React.Fragment>
            <Grid container sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Grid xs={12} sm={8} md={6} lg={3}>
                    <form>
                        <Card sx={{boxShadow: "none", height: "100%"}}>
                            <CardContent sx={{ p: [1, 2] }}>
                                <Box sx={{ textAlign: "center", borderTopLeftRadius: "10px", borderTopRightRadius: "10px", background: "#efa902", color: "#fff", padding: "15px" }}>
                                    <Typography variant="h5" sx={{ mb: 1 }}>
                                        Submit form for  Get In Touch
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
                                        placeholder="Enter Your First Name"
                                        onChange={(e) => setFirstName(e.target.value)} value={firstName}
                                    />
                                    <TextField
                                        InputProps={{
                                            style: { borderRadius: "8px", background: "#f2f2f2" },
                                        }}
                                        sx={{ my: 2 }}
                                        fullWidth
                                        type="text"
                                        placeholder="Enter Your Last Name"
                                        onChange={(e) => setLastName(e.target.value)} value={lastName}
                                    />
                                    <TextField
                                        InputProps={{
                                            style: { borderRadius: "8px", background: "#f2f2f2" },
                                        }}
                                        sx={{ my: 2 }}
                                        fullWidth
                                        type="tel"
                                        placeholder="Enter Your Phone Number"
                                        onChange={(e) => setNumber(e.target.value)} value={number}
                                    />
                                    <TextField
                                        InputProps={{
                                            style: { borderRadius: "8px", background: "#f2f2f2" },
                                        }}
                                        sx={{ my: 2 }}
                                        fullWidth
                                        type="text"
                                        placeholder="Enter Your Email"
                                        onChange={(e) => setEmailId(e.target.value)} value={emailId}
                                    />
                                    <FormControl fullWidth sx={{ my: 2 }}>
                                        <InputLabel id="demo-simple-select-label">Type</InputLabel>
                                        <Select
                                            value={typeSelect}
                                            onChange={(e) => setTypeSelect(e.target.value)}
                                            sx={{ borderRadius: "8px", background: "#f2f2f2" }}
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            label="Type"
                                        >
                                            <MenuItem value="">
                                                <em>Select Your Type</em>
                                            </MenuItem>
                                            <MenuItem value="course">Course</MenuItem>
                                            <MenuItem value="testSeries">Test-series</MenuItem>
                                        </Select>
                                    </FormControl>
                                    {typeSelect ?  
                                   <FormControl fullWidth sx={{ my: 2 }}>
                                   <InputLabel id="demo-simple-select-label">{typeSelect === "course" ? "Course :" : "Test Series"}</InputLabel>
                                   <Select
                                       sx={{ borderRadius: "8px", background: "#f2f2f2" }}
                                       labelId="demo-simple-select-label"
                                       id="demo-simple-select"
                                       label={typeSelect === "course" ? "Course :" : "Test Series"}
                                       value={course}
                                       onChange={handleChangeCourse}
                                   >
                                       {coursesData && coursesData.map((filteredCourse, index) => {
                                           return (
                                               <MenuItem
                                                   value={filteredCourse}
                                                   style={{
                                                       margin: '10px'
                                                   }}
                                               >
                                                   {filteredCourse?.title ? filteredCourse?.title : filteredCourse?.name}
                                               </MenuItem>
                                           )
                                       })}
                                   </Select>
                               </FormControl> : "" }
                                    
                                    <p style={{ margin: 0 }}>Message</p>
                                    <TextareaAutosize
                                        maxRows={7}
                                        variant="outlined"
                                        label="Enter Message"
                                        name="message"
                                        style={{
                                            background: "#f2f2f2",
                                            border: '1px solid #cbd5e1',
                                            borderRadius: "8px",
                                            width: '100%',
                                            height: "100px"
                                        }}
                                        onChange={(e) => setMessage(e.target.value)} value={message}
                                    />
                                    <h3 style={{ color: "red" }}>{error}</h3>
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
                                    onClick={handleSubmit}
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

export default FormTwo;