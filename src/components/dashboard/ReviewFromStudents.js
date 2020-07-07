import {connect, useDispatch} from "react-redux";
import React, {useEffect} from "react";
import {getReviewsFromStudents, getQuestions} from "../../store/reviews/reviewsActions";
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBSimpleChart
} from "mdbreact";


const ReviewFromStudents = ({subject_name, activity_name, week, getReviewsFromStudents, reviewsFromStudents, getQuestions, currentAttendanceId, loadingReviewsFromStudents, loadingQuestions, attendanceId, questions}) => {

    const dispatch = useDispatch();

    useEffect(() => {
        // Run! Like go get some data from an API.
        getReviewsFromStudents(currentAttendanceId)
    }, []);


    if(loadingQuestions){
        getQuestions();
    }

    let colors = ["#e163c0", "#48a072", "#d1dd4a"];
    console.log(questions);
    console.log(reviewsFromStudents);

    return  reviewsFromStudents.length  ? (
        <MDBContainer>
            <h2 className="mt-5 text-center">Feedback from students based on</h2>
            <div style={{ marginTop: "100px" }}>
                <MDBContainer>
                    <MDBRow className="text-center">
                        {reviewsFromStudents.map(review => (

                            <MDBCol sm="4" key ={review.intrebare_id-1}>
                                <MDBSimpleChart
                                    width={120}
                                    height={120}
                                    strokeWidth={6}
                                    percent={(review.medie*10).toFixed(2)}
                                    strokeColor={colors[review.intrebare_id-1]}
                                    labelFontWeight="300"
                                    labelColor="#000"
                                />
                                <h5 className="mt-5" style={{ color: colors[review.intrebare_id-1] }} >

                                    <strong color={colors[review.intrebare_id-1]}>{review.prescurtare}</strong>

                                </h5>
                            </MDBCol>
                        ))}
                    </MDBRow>
                </MDBContainer>
                {subject_name !== "" ? <h2 className="mt-5 text-center">{subject_name} during week {week}</h2> : <div/>}

            </div>
        </MDBContainer>
    ) : (

        <MDBContainer>
            <h2 className="mt-5 text-center" style={{marginBottom: "30px"}}>Grades from students based on</h2>
            <MDBRow className="text-center">
            {questions.map(question => (

                <MDBCol sm="4" key ={question.intrebare_id-1}>
                    <MDBSimpleChart
                        width={110}
                        height={110}
                        strokeWidth={6}
                        percent={0}
                        strokeColor={colors[question.intrebare_id-1]}
                        labelFontWeight="300"
                        labelColor="#000"
                    />
                    <h5 className="mt-5" style={{ color: colors[question.intrebare_id-1] }} >

                        <strong color={colors[question.intrebare_id-1]}>{question.prescurtare}</strong>

                    </h5>
                </MDBCol>
            ))}
        </MDBRow>
            {subject_name !== "" ? <h2 className="mt-5 text-center" style={{marginTop: "30px"}}>{subject_name} during week {week}</h2> : <div/>}
        </MDBContainer>


    );
};
const mapStateToProps = state => ({
    auth: state.auth,
    reviewsFromStudents: state.reviews.reviewFromStudents,
    loadingReviewsFromStudents: state.reviews.loadingReviewsFromStudents,
    loadingQuestions: state.reviews.loadingQuestions,
    attendanceId: state.attendance.value,
    questions: state.reviews.questions,
    currentAttendanceId: state.reviews.currentAttendanceId,
    subject_name: state.attendance.subject_name,
    activity_name: state.attendance.activity_name,
    week: state.attendance.week
});

export default connect(mapStateToProps, {getReviewsFromStudents, getQuestions})(ReviewFromStudents);
