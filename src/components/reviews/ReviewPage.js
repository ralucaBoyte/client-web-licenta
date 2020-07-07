import React, {useEffect} from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {MDBCarousel, MDBCarouselCaption, MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask, MDBContainer, MDBCol} from
        "mdbreact";
import {getReviews} from "../../store/reviews/reviewsActions";
import ReviewFromStudents from "../dashboard/ReviewFromStudents";
const ReviewPage = ({reviews, auth, getReviews, loadingReviews}) => {

    // if(loadingReviews){
    //     getReviews();
    // }
    useEffect(() => {
        getReviews();
    }, []);
    console.log(reviews);

    return (
        <MDBContainer>
            <MDBCol md="5">
            <MDBCarousel
                activeItem={1}
                length={reviews.length}
                showControls={true}
                showIndicators={true}
                className="z-depth-1"
            >
                <MDBCarouselInner>
                    {reviews.map((review, index) => (
                        <MDBCarouselItem itemId={index+1} key={index+1}>
                            <MDBView>
                                <img
                                    className="d-block w-100"
                                    src="https://mdbootstrap.com/img/Photos/Slides/img%20(68).jpg"
                                    alt="First slide"
                                />
                                <MDBMask overlay="black-light" />
                            </MDBView>
                            <MDBCarouselCaption>
                                <h3 className="h3-responsive">{index}</h3>
                                <p>{review.feedback}</p>
                            </MDBCarouselCaption>
                        </MDBCarouselItem>
                        ))}
                </MDBCarouselInner>
            </MDBCarousel>
            </MDBCol>
            <MDBCol md="7">
                <ReviewFromStudents/>
            </MDBCol>
        </MDBContainer>
    );
};

ReviewPage.propTypes = {
    auth: PropTypes.object.isRequired,
    getReviews: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    reviews: state.reviews.reviews,
    loadingReviews: state.reviews.loadingReviews
});

export default connect(mapStateToProps, {getReviews})(ReviewPage);
