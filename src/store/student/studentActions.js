import axios from "axios";
import {toast} from "react-toastify";

export const GET_REQUEST_FAIL = "GET_REQUEST_FAIL";
export const AUTH_ERROR = "AUTH_ERROR";

export const GET_STUDENT_BY_USERNAME = "GET_STUDENT_BY_USERNAME";
export const GET_STUDENT_BY_USERNAME_ERROR = "GET_STUDENT_BY_USERNAME_ERROR";
export const SET_CURRENT_STUDENT = "SET_CURRENT_STUDENT";
export const GET_STUDENTS_BY_SUBJECTS = "GET_STUDENTS_BY_SUBJECTS";
export const GET_STUDENTS_BY_GROUP = "GET_STUDENTS_BY_GROUP";
export const GET_STUDENTS_BY_SUBJECTS_ERROR = "GET_STUDENTS_BY_SUBJECTS_ERROR";
export const GET_STUDENTS_BY_GROUP_ERROR = "GET_STUDENTS_BY_GROUP_ERROR";
export const SET_STUDENTS = "SET_STUDENTS";
export const GET_GROUPS = "GET_GROUPS";
export const SET_CURRENT_GROUP = "SET_CURRENT_GROUP";
export const GET_GROUPS_ERROR = "GET_GROUPS_ERROR";
export const GET_GRADES = "GET_GRADES";
export const GET_GRADES_ERROR = "GET_GRADES_ERROR";



export const getStudentsBySubjects = (subjects) => async dispatch =>{

    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.get("student/students?subjectId="+subjects,config);
        console.log(res.data);
        dispatch({
            type: GET_STUDENTS_BY_SUBJECTS,
            payload: res.data.usernames
        });

    } catch (err) {
        const status = err.response.status;

        if (status === 404) {
            toast.error("Nu exista date despre studenti");
        }
        if(status === 500){
            toast.error("A intervenit o eroare de sistem.\n Nu s-a putut încărca lista studenților.");
        }
        dispatch({
            type: GET_STUDENTS_BY_SUBJECTS_ERROR,
            payload: err
        });
    }
};

export const getGroups = () => async dispatch =>{

    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.get("student/groups",config);
        console.log(res.data);
        dispatch({
            type: GET_GROUPS,
            payload: res.data.groups
        });

    } catch (err) {
        const status = err.response.status;

        if (status === 404) {
            toast.error(err.response.data);
        }
        if (status === 405) {
            toast.error(err.response.data);
        }
        if(status === 500){
            toast.error("A intervenit o eroare de sistem.\n Nu s-a putut încărca lista studenților.");
        }
        dispatch({
            type: GET_GROUPS_ERROR,
            payload: err
        });
    }
};

export const getStudentsByGroup = (groupId) => async dispatch => {

    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.get("student/group?groupId="+groupId,config);
        console.log(res.data.usernames);
        dispatch({
            type: GET_STUDENTS_BY_GROUP,
            payload: res.data.usernames
        });

    } catch (err) {
        const status = err.response.status;

        if (status === 404) {
            toast.error(err.response.data);
        }
        if (status === 405) {
            toast.error(err.response.data);
        }
        if(status === 500){
            toast.error("A intervenit o eroare de sistem.\n Nu s-a putut încărca lista studenților.");
        }
        dispatch({
            type: GET_STUDENTS_BY_GROUP_ERROR,
            payload: err
        });
    }
};

//get grades by Subject for a student user
export const getGradesBySubject = (subjectId) => async dispatch => {

    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.get("assignment/grades?subject="+subjectId,config);
        console.log(res.data.grades);
        dispatch({
            type: GET_GRADES,
            payload: res.data.grades
        });

    } catch (err) {
        const status = err.response.status;

        if (status === 404) {
            toast.error(err.response.data);
        }
        if (status === 405) {
            toast.error(err.response.data);
        }
        if(status === 500){
            toast.error("A intervenit o eroare de sistem.\n Nu s-a putut încărca lista notelor.\nVă rugăm repetați procesul.");
        }
        dispatch({
            type: GET_GRADES_ERROR,
            payload: err
        });
    }
};

export const setCurrentStudent = (currentStudent) => async dispatch => {

    dispatch({
        type: SET_CURRENT_STUDENT,
        payload: currentStudent
    })
};

export const setCurrentGroup = (currentGroupId) => async dispatch => {

    dispatch({
        type: SET_CURRENT_GROUP,
        payload: currentGroupId
    })
};

//
// export const setStudents = (students) => async dispatch => {
//     dispatch({
//         type:SET_STUDENTS,
//         payload: students
//     })
// };
