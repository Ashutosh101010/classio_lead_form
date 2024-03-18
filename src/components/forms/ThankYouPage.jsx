import { Box, Button, Card, CardActions, CardContent, FormControl, Grid, MenuItem, Select, Typography, useMediaQuery } from "@mui/material";
import React, { useEffect } from "react";
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';

const ThankYouPage = () => {


    return (
        <React.Fragment>
            <Grid container sx={{ display: "flex", justifyContent: "center", textAlign: "center", height: "100vh" }}>
                <Grid xs={12} sm={8} md={6} lg={4} paddingLeft={"0px"} mt={['30px']} sx={{ display: "flex", alignItems: "center", height: "100vh" }}>
                    <Card sx={{boxShadow: "none"}}>
                        <CardContent sx={{ p: [2, 5] }}>
                            <Box>
                                <CheckCircleOutlineOutlinedIcon color="success" sx={{fontSize: "100px"}} />
                            </Box>
                            <Typography
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                                fontFamily={'Inter , sans-serif'}
                                fontSize={['40px', '46px']}
                                fontWeight={'500'}
                                lineHeight={'60px'}
                            >
                                Thank You for Submitting 
                            </Typography>
                            <Typography
                                sx={{
                                    padding: '9px',
                                    textAlign: 'center',
                                    width: '100%'
                                }}
                                fontFamily={'Inter , sans-serif'}
                                fontSize={'20px'}
                                fontWeight={'400'}
                                lineHeight={'22px'}
                            >
                               we will connect you soon
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </React.Fragment>
    )
};

export default ThankYouPage;