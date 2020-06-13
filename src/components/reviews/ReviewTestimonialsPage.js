import React from "react";
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
const ReviewTestimonialsPage = ({reviews, auth, getReviews, loadingReviews}) => {

    if(loadingReviews){
        getReviews();
    }
    console.log(reviews);

    return (
        loadingReviews ? (
            <Spinner/>
            )
            : (
        <MDBContainer className="container_reviews">
            <MDBRow>
                <MDBCol md="3"/>
                <MDBCol md="6">
                    <section className='text-center my-5'>
                        <h3 className='h1-responsive font-weight-bold my-5'>Feedback from students</h3>

                        <MDBCarousel
                            activeItem={1}
                            length={3}
                            testimonial
                            interval={false}
                            showIndicators={false}
                            className='no-flex'
                        >
                            <MDBCarouselInner>
                                { reviews.map((review, index) => (
                                <MDBCarouselItem itemId={index+1} key={index+1}>
                                    <MDBTestimonial>
                                        <MDBAvatar className='mx-auto mb-4'>
                                            <img
                                                src={require('../../pictures/student.jpg')}
                                                className='rounded-circle img-fluid'
                                                alt=''
                                            />
                                        </MDBAvatar>
                                        <p>

                                            <MDBIcon icon='quote-left' /> {review.feedback}
                                        </p>
                                        <h4 className='font-weight-bold'>{review.reviewGrade}</h4>
                                        <MDBIcon icon='star' className='blue-text' />
                                        <MDBIcon icon='star' className='blue-text' />
                                        <MDBIcon icon='star' className='blue-text' />
                                        <MDBIcon icon='star' className='blue-text' />
                                        <MDBIcon far icon='star-half' className='blue-text' />
                                    </MDBTestimonial>
                                </MDBCarouselItem>
                                    ))
                                }
                            </MDBCarouselInner>
                        </MDBCarousel>
                    </section>

                </MDBCol>
                <MDBCol md="3"/>
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
