import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, Typography, Button, CircularProgress } from '@mui/material';
import ReactPaginate from 'react-paginate';
import './HomePage.css';
import postServices from '../../services/postServices';
import toastService from '../../services/toastService';
import { useNavigate } from 'react-router-dom';

const PostPage = () => {
    const [posts, setPosts] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const data = await postServices.getAllPost();
            setPosts(data.data);
            setLoading(false);
        } catch (err) {
            toastService.error(err.message);
            setLoading(false);
        }
    };

    const postsPerPage = 12;
    const pagesVisited = pageNumber * postsPerPage;
    const pageCount = Math.ceil(posts.length / postsPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    return (
        <div>
            {loading ? (
                <div className="loader-container">
                    <CircularProgress />
                </div>
            ) : (
                <Container maxWidth="lg" style={{ marginTop: 20 }}>
                    <Grid container spacing={2}>
                        {posts.slice(pagesVisited, pagesVisited + postsPerPage).map((post) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={post.id}>
                                <Card>
                                    <CardContent style={{ textAlign: 'left' }}>
                                        <Typography variant="h6" gutterBottom>
                                            {post.title}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            {post.body}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ marginBottom: '5px' }}
                        onClick={() => navigate('/createpost')}
                    >
                        Add Post
                    </Button>

                    {pageCount > 1 && (
                        <ReactPaginate
                            previousLabel={'Previous'}
                            nextLabel={'Next'}
                            pageCount={pageCount}
                            onPageChange={changePage}
                            containerClassName={'pagination'}
                            previousLinkClassName={'pagination__link'}
                            nextLinkClassName={'pagination__link'}
                            disabledClassName={'pagination__link--disabled'}
                            activeClassName={'pagination__link--active'}
                            pageClassName={'pagination__item'}
                            breakClassName={'pagination__item'}
                        />
                    )}
                </Container>
            )}
        </div>
    );
};

export default PostPage;
