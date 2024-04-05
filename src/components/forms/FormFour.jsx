import { Box, Button, Card, CardActions, CardContent, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography, useMediaQuery } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import CourseNetwrok from "../authentication/network";

const FormFour = ({ setApiResponse }) => {

    const queryParam = new URLSearchParams(location.search);
    const instId = queryParam.get("instituteid");
    const campaignId = queryParam.get("campaignid");
    const metaCampaignId = queryParam.get("campaign_id");
    const mobile = useMediaQuery("(min-width:600px)");
    const [firstName, setFirstName] = useState("");
    let text = firstName;
    const myArray = text.split(" ");
    const first = myArray[0];
    const lastN = myArray[myArray.length - 1];
    const [lastName, setLastName] = useState("");
    const [number, setNumber] = useState("");
    const [emailId, setEmailId] = useState("");
    const [message, setMessage] = useState("");
    const [course, setCourse] = useState("");
    const [typeSelect, setTypeSelect] = useState("");
    const [coursesData, setCoursesData] = useState([]);
    const [error, setError] = useState("");

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

    useEffect(() => {
        getAllCourses();
    }, []);

    const handleSubmit = async () => {
        if (firstName && number && course) {
            const body = {
                "firstName": first,
                "lastName": lastN,
                // "email": emailId,
                "contact": number,
                "enquiryType": 'course',
                "contentId": course.id,
                "instId": instId,
                "campaignId": campaignId ? campaignId : metaCampaignId ? metaCampaignId : null
            }
            const response = await CourseNetwrok.submitForm(body);
            if (response.statue === true) {
                setApiResponse(true);
                setFirstName("");
                // setLastName("");
                setNumber("");
                // setEmailId("");
                // setTypeSelect("");
                setCourse("");
                // setMessage("");
                // setError("")
            }
            if (response?.errorCode === 0) {
                setApiResponse(true);
                setFirstName("");
                // setLastName("");
                setNumber("");
                // setEmailId("");
                // setTypeSelect("");
                setCourse("");
                // setMessage("");
                // setError("")
            }
        }
        else {
            setError("All fields Are required");
        }
    }

    return (
        <React.Fragment>
            <Grid container sx={{ display: "flex", justifyContent: "end", }}>
                <Grid xs={12} sm={8} md={6} lg={4} padding={"0px"}>
                    <Card sx={{ maxWidth: 400, background: '#8080801f', borderRadius: '15px', padding: 3 }}>
                        <Box
                            sx={{
                                display: 'grid',
                                // justifyContent: 'center',
                                alignItems: 'center',
                                gap: '1rem'
                            }}
                        >
                            <Typography textAlign={'center'} color={'black'} fontSize={'18px'} fontWeight={'500'}>
                                Book a Free Counseling Session Now 😊
                            </Typography>
                            <TextField
                                id="standard-basic"
                                variant="standard"
                                // InputProps={{
                                //     style: { height: '50px' }
                                // }}
                                label="Name"
                                fullWidth
                                type='text'
                                placeholder='Name'
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            <TextField
                                id="standard-basic"
                                variant="standard"
                                // InputProps={{
                                //     style: { height: '50px' }
                                // }}
                                label="Phone No."
                                fullWidth
                                type='tel'
                                placeholder='Phone No.'
                                onChange={(e) => setNumber(e.target.value)}
                            />
                            {/* <TextField
                                    id="outlined-required"
                                    InputProps={{
                                        style: { background: '#fff', borderRadius: '20px', height: '50px' }
                                    }}
                                    label="Required"
                                    fullWidth
                                    type='text'
                                    placeholder='Select Course'
                                /> */}
                            <FormControl variant="standard" fullWidth>
                                <InputLabel id="demo-simple-select-standard-label">Select Course</InputLabel>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    sx={{
                                        color: '#000'
                                    }}
                                    value={course}
                                    label="Select Course'"
                                    onChange={handleChangeCourse}

                                >
                                    {
                                        coursesData && coursesData.map((item, index) => {
                                            return (
                                                <MenuItem key={index} value={item}>{item?.title}</MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            </FormControl>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                pt: 3
                            }}
                        >
                            <Button
                                sx={{
                                    background: '#DD4223',
                                    textTransform: 'none',
                                    color: 'white',
                                    // px: 2,
                                    // borderRadius: '5px',
                                    fontWeight: '400',
                                    fontSize: '16px',
                                    // border: '2px solid #767676',
                                    ':hover': {
                                        background: '#DD4223'
                                    },
                                    width: '100%'
                                }}
                                onClick={handleSubmit}
                            >
                                Submit
                            </Button>
                        </Box>
                    </Card>
                </Grid>
            </Grid>
        </React.Fragment>
    )
};

export default FormFour;