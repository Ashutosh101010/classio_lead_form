import React, { useEffect } from "react";
import FormOne from "./FormOne";
import FormTwo from "./FormTwo";
import CourseNetwrok from "../authentication/network";


const Template = ({ templateId, setFormId }) => {

    const instId = '94';

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
            return <FormOne />;
        case 2:
            return <FormTwo />;
        default:
            return <FormOne />;
    }

};
export default Template