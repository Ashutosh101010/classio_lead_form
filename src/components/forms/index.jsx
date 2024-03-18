import React, { useEffect, useState } from "react";
import FormOne from "./FormOne";
import FormTwo from "./FormTwo";
import CourseNetwrok from "../authentication/network";
import ThankYouPage from "./ThankYouPage";


const Template = ({ templateId, setFormId }) => {

    const queryParam = new URLSearchParams(location.search);
    const instId = queryParam.get("instituteid");
    const [apiResponse, setApiResponse] = useState(false)

    useEffect(() => {
        getInstitute();
    }, [])

    const getInstitute = async () => {
        const response = await CourseNetwrok.fetchInstitute(instId);
        if (response?.errorCode === 0) {
            setFormId(response?.instituteTechSetting?.enquiryFormTemplateId);
        } else {
            setFormId(0)
        }
    };

    switch (templateId) {
        case 1:
            return <>
            {apiResponse === false ? <FormOne setApiResponse={setApiResponse} /> : <ThankYouPage />}
            </>;
        case 2:
            return <>
            {apiResponse === false ? <FormTwo setApiResponse={setApiResponse} /> : <ThankYouPage />}
            </>;
        default:
            return <>
            {apiResponse === false ? <FormOne setApiResponse={setApiResponse} /> : <ThankYouPage />}
            </>;
    }

};
export default Template