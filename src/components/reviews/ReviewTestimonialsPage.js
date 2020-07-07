import React, {useEffect} from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
    MDBContainer,
    MDBCarousel,
    MDBCarouselInner,
    MDBCarouselItem,
    MDBTestimonial,
    MDBAvatar,
    MDBIcon, MDBRow, MDBCol
} from 'mdbreact';
import {getReviews} from "../../store/reviews/reviewsActions";
import Spinner from "../layout/Spinner";
import ReviewFromStudents from "../dashboard/ReviewFromStudents";
const ReviewTestimonialsPage = ({reviews, auth, getReviews, loadingReviews}) => {

    useEffect(() => {
        getReviews()
    }, []);
    console.log(reviews);

    let createReviewStars = (stars) => {
        let review_stars = [];

        let i = 1;
        // Outer loop to create parent
        for (i = 1; i <= stars; i++) {
            review_stars.push(<MDBIcon key = {i} icon='star' className='blue-text' />);
        }

        for(i; i <= 10; i++){
            review_stars.push(<MDBIcon key = {i} far icon='star' className='blue-text' />);
        }
        return review_stars;
    };

    let createAvatar = (key) => {
        let avatar = [];
        let id =  Math.floor(Math.random() * 3) + 1;
        avatar.push(<MDBAvatar className='mx-auto mb-4' key={key}>
            <img
                src={require(`../../pictures/student${id}.jpg`)}
                className='rounded-circle img-fluid'
                alt=''
            />
        </MDBAvatar>);

        return avatar;
    };

    return (
        loadingReviews ? (
            <Spinner/>
            )
            : (
        <MDBContainer>
            <MDBRow>
            <MDBCol md="6">
                <ReviewFromStudents/>
            </MDBCol>
            <MDBCol md="5">
                <MDBContainer className="container_reviews">
                    <MDBRow style={{ marginTop: "50px" }}>
                        <h3 >Some student observation</h3>
                    </MDBRow>
                    <MDBRow>
                    <section className='container_reviews_feedback text-center' >
                        <MDBCarousel
                            activeItem={1}
                            length={reviews.length}
                            testimonial
                            interval={false}
                            showControls={true}
                            showIndicators={false}
                            className='no-flex'
                        >
                            <MDBCarouselInner>
                                { reviews.map((review, index) => (
                                <MDBCarouselItem itemId={index+1} key={index+1}>
                                    <MDBTestimonial>
                                        {createAvatar(index+1)}

                                        <p>
                                            <MDBIcon icon='quote-left' /> {review.feedback}
                                        </p>
                                        <h4 className='font-weight-bold'>{review.reviewGrade}</h4>
                                        {createReviewStars(review.reviewGrade)}
                                    </MDBTestimonial>
                                </MDBCarouselItem>
                                    ))
                                }
                            </MDBCarouselInner>
                        </MDBCarousel>
                    </section>
                    </MDBRow>
                </MDBContainer>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
            )
    );
};

ReviewTestimonialsPage.propTypes = {
    auth: PropTypes.object.isRequired,
    getReviews: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    reviews: state.reviews.reviews,
    loadingReviews: state.reviews.loadingReviews
});

export default connect(mapStateToProps, {getReviews})(ReviewTestimonialsPage);
