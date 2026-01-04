import React, { useState, useEffect } from 'react';
import { Row, Col, Spin, Pagination, Typography } from 'antd';
import MovieCard from '../components/MovieCard';
import { getPopularMovies, getTopRatedMovies, getUpcomingMovies } from '../services/api';
import './MovieList.css';

const { Title } = Typography;

const MovieList = ({ type }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getTitle = () => {
    switch (type) {
      case 'popular':
        return '🔥 Popular Movies';
      case 'top-rated':
        return '⭐ Top Rated Movies';
      case 'upcoming':
        return '📅 Upcoming Movies';
      default:
        return 'Movies';
    }
  };

  const fetchMovies = async (page) => {
    try {
      setLoading(true);
      let data;
      switch (type) {
        case 'popular':
          data = await getPopularMovies(page);
          break;
        case 'top-rated':
          data = await getTopRatedMovies(page);
          break;
        case 'upcoming':
          data = await getUpcomingMovies(page);
          break;
        default:
          data = await getPopularMovies(page);
      }
      setMovies(data.results);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(currentPage);
  }, [type, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading && movies.length === 0) {
    return (
      <div className="loading-container">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="movie-list-page">
      <Title level={1} className="page-title">
        {getTitle()}
      </Title>

      {loading ? (
        <div className="loading-container">
          <Spin size="large" />
        </div>
      ) : (
        <>
          <Row gutter={[24, 24]}>
            {movies.map((movie) => (
              <Col xs={12} sm={12} md={8} lg={6} xl={6} key={movie.id}>
                <MovieCard movie={movie} />
              </Col>
            ))}
          </Row>

          <div className="pagination-container">
            <Pagination
              current={currentPage}
              total={totalPages * 20}
              pageSize={20}
              showSizeChanger={false}
              onChange={handlePageChange}
              showQuickJumper
              showTotal={(total, range) =>
                `${range[0]}-${range[1]} of ${total} movies`
              }
            />
          </div>
        </>
      )}
    </div>
  );
};

export default MovieList;





