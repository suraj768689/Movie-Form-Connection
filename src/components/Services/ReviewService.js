import axios from 'axios';
const Review_API_BASE_URL1 = "http://localhost:8090/api/reviews";
const Review_API_BASE_URL2 = "http://localhost:8090/admin/reviews";
const Review_API_BASE_URL3 = "http://localhost:8090/user/reviews";
class ReviewService {

    getReview(movieId) {
        return axios.get(Review_API_BASE_URL1 + '/' + movieId);
    }
    deleteReview(reviewId) {
        return axios.delete(Review_API_BASE_URL2 + '/' + reviewId)
    }
    postReview(movieId, review, token) {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        return axios.post(Review_API_BASE_URL3 + '/' + movieId, review, config);
    }

}

export default new ReviewService();
