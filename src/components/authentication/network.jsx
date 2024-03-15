import axios from "axios";
import { BASE_URL } from "./BaseUrl";

export default class CourseNetwrok {
    static COURSES_URL = BASE_URL + "admin/course/fetch-public/";
    static INSTITUTE_URL = BASE_URL + "getMetaData/fetch-institute/";
    static FORM_SUBMIT_URL = BASE_URL + "/leadManagement/create-lead-form";

    static async fetchCourses(instId) {
        let requestOptions = {
            withCredentials: false,
        };
        const response = await axios.get(this.COURSES_URL + instId, requestOptions);
        return response.data;
    }
    static async fetchInstitute(instId) {
        let requestOptions = {
            withCredentials: false,
        };
        const response = await axios.get(this.INSTITUTE_URL + instId, requestOptions);
        return response.data;
    }

    static async submitForm(body) {
        let requestOptions = {
            withCredentials: false,
        };
        const response = await axios.post(this.FORM_SUBMIT_URL, body, requestOptions);
        return response.data;
    }

}
