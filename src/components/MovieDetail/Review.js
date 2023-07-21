import React, { useEffect, useState } from "react";
import ReviewService from "../Services/ReviewService";
import './MovieDetail.css';
import { FaStar } from 'react-icons/fa';
const Review = ({ movieId, isRole, isLoggedIn }) => {
    console.log(isLoggedIn + "from reviews")
    const movId = movieId;
    const [reviewRes, setReviewRes] = useState([]);
    const [list, setList] = useState([1, 2, 3, 4, 5]);
    const [rating, setRating] = useState(null);
    const [review, setReview] = useState();
    const [hover, setHover] = useState(null);
    const [reviewslist, setReviewslist] = useState([]);
    var i = 0;
    const fetchReviews = async () => {
        ReviewService.getReview(movId)
            .then((res) => {
                if (Array.isArray(res.data)) {
                    setReviewRes(res.data);
                }
            })
            .catch((error) => {
                console.error("Error fetching reviews:", error);
            })
    }
    useEffect(() => {
        fetchReviews();
    }, [movieId])



    const handleDelete = (reviewId) => {
        ReviewService.deleteReview(reviewId).then((res) => {
            console.log("Review deleted");
            // Remove the deleted review from the state
            const updatedReviews = reviewRes.filter((review) => review.reviewId !== reviewId);
            setReviewRes(updatedReviews);
        })
            .catch((error) => {
                console.error("Error deleting review:", error);
            });
    };

    const handleCancel = () => {
        setRating('')
        setReview('')
    }

    const handlesubmit = (e) => {

        e.preventDefault();

        console.log("rating :" + rating);
        console.log("review : " + review);

        const newReview = {
            userId: "6cc8f96e-0436-4f6c-b164-e0d405a97692",
            rating: rating,
            reviewText: review,
        };
        setReviewslist(newReview);

        ReviewService.postReview(movieId, newReview).then((res => {
            setReviewRes((prevReviews) => [...prevReviews, newReview]);
        }))

        setRating(' ');
        setReview(' ');
    }

    return (
        <div style={{ textAlign: "left", marginBottom: "30px" }}>
            <div style={{
                padding: "30px", marginLeft: "150px",
                marginRight: "150px",
                marginTop: "20px",
                padding: "20px",
                border: "2px solid black",
                borderRadius: "2rem"
            }}>
                <div className="card">
                    <div className="card-body">
                <h6><strong>Rating</strong></h6>
                <div className='m-2'>
                    {list.map((ele, i) => {
                        // console.log(i + " bro ");
                        const ratingvalue = i + 1;
                        return (
                            <label>

                                <input
                                    type="radio"
                                    name="rating"
                                    value={ratingvalue}
                                    onClick={() => setRating(ratingvalue)}

                                />

                                <FaStar
                                    className="star"
                                    color={ratingvalue <= (hover || rating) ? '#ffc107' : "#e4e5e9"}
                                    size={30}
                                    onMouseEnter={() => setHover(ratingvalue)}
                                    onMouseLeave={() => setHover(null)}
                                />

                            </label>
                        );
                    })}

                </div>
                

                <div className="mb-3">
                    <label htmlFor="review" className="form-label"><strong>Review</strong></label>
                    <textarea className="form-control"
                        placeholder={isRole !== 'ROLE_USER' ? 'Only logged in user can write a review' : 'Write your review here...'}
                        id="review"
                        cols="2"
                        rows="4"
                        name="review"
                        value={review}
                        disabled={isRole !== 'ROLE_USER'}
                        onChange={(e) => setReview(e.target.value)}
                    >
                    </textarea>
                </div>

                <button className='btn btn-success ' type='submit' onClick={handlesubmit} disabled={isRole !== 'ROLE_USER'}>Save </button>
                <button className='btn btn-danger mr-3' onClick={handleCancel} disabled={isRole !== 'ROLE_USER'}>Cancle</button>



            </div>
            </div>
                </div>

            {
                reviewRes.length > 0 ? reviewRes.map((rev, index) => (
                    <div className="reviewbox" key={index}>
                        <div className="row">
                            <div className="col"><span>{rev.username}</span></div>
                            <div className="col" style={{ color: "#ffffff", }}>Rating:{rev.rating}</div>
                            {isRole === "ROLE_ADMIN" ? <div className="col"
                            ><button
                                className="btn  btn-danger"
                                type="Submit"
                                onClick={() => handleDelete(rev.reviewId)}>Delete</button></div> : ""}
                        </div>
                        <div className="row">
                            <div className="col" style={{ color: "#ffffff", }}>{rev.reviewText}</div>
                        </div>
                        <div className="row">
                            <div className="col"><span>Source: </span> {rev.source}</div>
                            <div className="col"><span>Date: </span> {rev.reviewDate}</div>
                        </div>
                    </div>
                )) : <p>no reviews yet</p>
            }



        </div >
    )
}

export default Review;