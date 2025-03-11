import { Box, Button, Card, CardActions, CardContent, FormControl, Grid, MenuItem, Select, Typography, useMediaQuery } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import CourseNetwrok from "../authentication/network";

const FormEight = ({ setApiResponse }) => {

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
    const [typeSelect, setTypeSelect] = useState("course");
    const [coursesData, setCoursesData] = useState([]);
    const [error, setError] = useState("");
    const [address, setAddress] = useState('');

    useEffect(() => {
        if (typeSelect === "course") {
            getAllCourses();
        } else if (typeSelect === "testSeries") {
            getTestSeries();
        }

    }, [typeSelect]);

    const handleChangeCourse = (e) => {
        setCourse(e.target.value)
    }

    const getAllCourses = async () => {
        try {
            const response = await CourseNetwrok.fetchCourses(instId);
            let templist = [];
            response.courses.forEach((course) => {
                if (course.active == true) {
                    templist.push(course);
                }
            })
            setCoursesData(templist);
        } catch (error) {
            console.log(error);
        }
    };
    const getTestSeries = async () => {
        try {
            const response = await CourseNetwrok.fetchTestSeries(instId);
            let templist = [];
            response.testSeriesList.forEach((course) => {
                if (course.active == true) {
                    templist.push(course);
                }
            })
            setCoursesData(response?.testSeriesList);
        } catch (error) {
            console.log(error);
        }
    };

    // console.log('Data', firstName, lastName, number, emailId, typeSelect, course, message)

    const handleSubmit = async () => {
        if (firstName && number && typeSelect && course) {
            const body = {
                "firstName": firstName,
                // "lastName": lastName,
                "lastName": 'last',
                // "email": emailId,
                "email": 'aurous',
                "contact": number,
                "enquiryType": typeSelect,
                "contentId": Number(course),
                "instId": instId,
                "campaignId": campaignId ? campaignId : metaCampaignId ? metaCampaignId : null
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
                if (window.parent !== window) {
                    console.log("📤 Sending message to parent...");
                    window.parent.postMessage(
                        { status: 200 },
                        `https://apre.aurousacademy.com/`
                    );
                }
            }
        }
        else {
            setError("All fields Are required");
        }
    };

    return (
        <div>
            <Grid container sx={{ display: "flex", justifyContent: "center", }}>
                <Grid xs={12} sm={8} md={6} lg={4} padding={"0px"}>
                    <Card
                        sx={{
                            width: '100%',
                            maxWidth: 410,
                            background: '#101828',
                            height: '100%',
                            maxHeight: 440,
                        }}
                    >
                        <CardContent>
                            <Typography
                                color={'#fff'}
                                fontSize={'20px'}
                                textAlign={'center'}
                            >
                                WE ARE JUST A CALL AWAY!
                            </Typography>
                            <Typography
                                color={'#667085'}
                                fontSize={'18px'}
                                textAlign={'center'}
                                py={1}
                            >
                                Step closer to your goals with a expert mentoring sesseion
                            </Typography>
                            <Box
                                py={0.8}
                            >
                                <input
                                    placeholder='Enter your Name'
                                    type='text'
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    style={{
                                        width: '100%',
                                        height: '40px',
                                        borderRadius: '5px',
                                        boxSizing: 'border-box'
                                    }}
                                />
                            </Box>
                            <Box
                                py={0.8}
                            >
                                <input
                                    placeholder='Enter your Mobile Number'
                                    type='number' name='number' id='number'
                                    value={number}
                                    onChange={(e) => setNumber(e.target.value)}
                                    style={{
                                        width: '100%',
                                        height: '40px',
                                        borderRadius: '5px',
                                        boxSizing: 'border-box'
                                    }}
                                />
                            </Box>
                            <Box
                                py={0.8}
                            >
                                <input
                                    placeholder='Enter your Address'
                                    type='text'
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    style={{
                                        width: '100%',
                                        height: '40px',
                                        borderRadius: '5px',
                                        boxSizing: 'border-box'
                                    }}
                                />
                                <p
                                    style={{
                                        color: '#fff',
                                        fontSize: '8px',
                                        position: 'absolute',
                                        top: '29%',
                                        left: mobile ? '52%' : '70%',
                                        textAlign: 'end',
                                        // width: '24.5%'
                                    }}
                                >(Optional)</p>
                            </Box>
                            <Box
                                py={1}
                            >
                                <select
                                    style={{
                                        width: '100%',
                                        height: '35px',
                                        borderRadius: '5px',
                                        boxSizing: 'border-box'
                                    }}
                                    value={course}
                                    onChange={(e) => handleChangeCourse(e)}
                                >
                                    <option
                                        style={{ fontSize: '16px', margin: '10px' }}
                                    >
                                        Select Class
                                    </option>
                                    {
                                        coursesData.length > 0 && coursesData.map((course, index) => {
                                            return (
                                                <option
                                                    style={{ fontSize: '16px', margin: '10px' }}
                                                    key={index}
                                                    value={course?.id}
                                                >
                                                    {course?.title}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </Box>
                        </CardContent>
                        <CardActions
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                paddingBottom: '20px',
                            }}
                        >
                            <Button
                                onClick={handleSubmit}
                                sx={{
                                    background: '#FFD700',
                                    textTransform: 'none',
                                    color: '#101828',
                                    borderRadius: '5px',
                                    width: '95%',
                                    fontSize: '18px',
                                    fontWeight: '600',
                                    padding: '10px',
                                    ":hover": {
                                        background: '#FFD700',
                                    }
                                }}
                            >
                                Submit Now
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
}

export default FormEight