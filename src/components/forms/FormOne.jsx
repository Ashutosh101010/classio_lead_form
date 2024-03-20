import { Button, Card, CardActions, CardContent, FormControl, Grid, MenuItem, Select, Typography, useMediaQuery } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import CourseNetwrok from "../authentication/network";

const FormOne = ({setApiResponse}) => {

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
                setError("")
            }
        }
        else {
            setError("All fields Are required");
        }
    }

    return (
        <React.Fragment>
            <Grid container sx={{ display: "flex", justifyContent: "center", }}>
                <Grid xs={12} sm={8} md={6} lg={4} padding={"0px"}>
                    <Card sx={{boxShadow: "none", height: "100%"}}>
                        <CardContent sx={{ p: [1, 2] }}>
                            <Typography
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                                fontFamily={'Inter , sans-serif'}
                                fontSize={['35px', '40px']}
                                fontWeight={'500'}
                                lineHeight={'60px'}
                            >
                                Get In Touch
                            </Typography>
                            <Typography
                                sx={{
                                    padding: '9px',
                                    textAlign: 'center',
                                    width: '100%'
                                }}
                                fontFamily={'Inter , sans-serif'}
                                fontSize={'15px'}
                                fontWeight={'400'}
                                lineHeight={'22px'}
                            >
                                We'd love to hear from you, please drop us a line if you've any
                                query related to our program and courses.
                            </Typography>
                            <Grid container spacing={2} mb={4} mt={2}>
                                <Grid item xs={12} sm={6} md={6}>
                                    <Typography>
                                        First Name :
                                    </Typography>
                                    <input onChange={(e) => setFirstName(e.target.value)} value={firstName} class="input-field" type='text' name='name' placeholder='Enter Your First Name' style={{ width: '100%', height: mobile ? '45px' : '39px', fontSize: '16px', position: 'relative', top: '2px' }} />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <Typography>
                                        Last Name :
                                    </Typography>
                                    <input onChange={(e) => setLastName(e.target.value)} value={lastName} class="input-field" type='text' name='name' placeholder='Enter Your Last Name' style={{ width: '100%', height: mobile ? '45px' : '39px', fontSize: '16px', position: 'relative', top: '2px' }} />
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} mb={4}>
                                <Grid item xs={12} sm={6} md={6}>
                                    <Typography>
                                        Phone :
                                    </Typography>
                                    <input onChange={(e) => setNumber(e.target.value)} value={number} class="input-field" type='number' name='number' placeholder='Enter Your Phone Number' style={{ width: '100%', height: mobile ? '45px' : '39px', fontSize: '16px' }} />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <Typography>
                                        Email :
                                    </Typography>
                                    <input onChange={(e) => setEmailId(e.target.value)} value={emailId} class="input-field" type='email' name='email' placeholder='Enter Your Email' style={{ width: '100%', height: mobile ? '45px' : '39px', fontSize: '16px' }} />
                                </Grid>
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography>
                                        Type :
                                    </Typography>
                                    <FormControl fullWidth>
                                        <Select
                                            class="input-field"
                                            value={typeSelect}
                                            onChange={(e) => setTypeSelect(e.target.value)}
                                            displayEmpty
                                            inputProps={{ 'aria-label': 'Without label' }}
                                            style={{ width: '100%', height: mobile ? '45px' : '39px', fontSize: '16px' }}
                                        >
                                            <MenuItem value="">
                                                <em>Select Your Type</em>
                                            </MenuItem>
                                            <MenuItem value="course">Course</MenuItem>
                                            <MenuItem value="testSeries">Test-series</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                {typeSelect ?  <Grid item xs={12}>
                                    
                                    <Typography>
                                        {typeSelect === "course" ? "Course :" : "Test Series"}
                                    </Typography>
                                    <FormControl fullWidth>
                                        <Select
                                            class="input-field"
                                            value={course}
                                            onChange={handleChangeCourse}
                                            displayEmpty
                                            inputProps={{ 'aria-label': 'Without label' }}
                                            style={{ width: '100%', height: mobile ? '45px' : '39px', fontSize: '16px' }}
                                        >
                                            <MenuItem value="">
                                                <em> {typeSelect === "course" ? "Select Your Course :" : "Select Your Test Series"}</em>
                                            </MenuItem>
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
                                    </FormControl>
                                </Grid> : "" }
                              

                            </Grid>
                            <Grid container spacing={2} mt={2}>
                                <Grid item xs={12}>
                                    <Typography>
                                        Message :
                                    </Typography>
                                    <textarea onChange={(e) => setMessage(e.target.value)} value={message} class="input-field" name='message' rows={5} placeholder='Enter Message' style={{ width: '100%', height: '90px', fontSize: '16px' }} />
                                </Grid>
                            </Grid>
                            <h3 style={{ color: "red" }}>{error}</h3>
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
                                    textTransform: 'none',
                                    background: '#ffd80d',
                                    fontFamily: 'Inter',
                                    fontWeight: '600',
                                    minHeight: '50px',
                                    fontSize: '16px',
                                    color: '#000',
                                    gap: '10px',
                                    width: ['95%', '87%'],
                                    borderRadius: '0px',
                                    border: 'none',
                                    '&:hover': {
                                        background: '#bf8c07', // Change the background color on hover
                                    },
                                }}
                                onClick={handleSubmit}
                            >
                                {/* <img alt='' src={smssvg} /> */}
                                Send Message
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </React.Fragment>
    )
};

export default FormOne;