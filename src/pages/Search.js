import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Row, Col, Spin, Pagination, Typography, Empty } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import MovieCard from '../components/MovieCard';
import { searchMovies } from '../services/api';
import './Search.css';

const { Title } = Typography;

const Search = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (query) {
      fetchSearchResults(query, 1);
    }
  }, [query]);

  const fetchSearchResults = async (searchQuery, page) => {
    try {
      setLoading(true);
      const data = await searchMovies(searchQuery, page);
      setMovies(data.results);
      setTotalPages(data.total_pages);
      setCurrentPage(page);
    } catch (error) {
      console.error('Error searching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    fetchSearchResults(query, page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!query) {
    return (
      <div className="search-page">
        <Empty
          description={
            <span style={{ color: '#666666' }}>
              Enter a search term to find movies
            </span>
          }
        />
      </div>
    );
  }

  return (
    <div className="search-page">
      <Title level={1} className="search-title">
        <SearchOutlined /> Search Results for "{query}"
      </Title>

      {loading ? (
        <div className="loading-container">
          <Spin size="large" />
        </div>
      ) : movies.length === 0 ? (
        <Empty
          description={
            <span style={{ color: '#666666' }}>
              No movies found for "{query}"
            </span>
          }
        />
      ) : (
        <>
          <Row gutter={[24, 24]}>
            {movies.map((movie) => (
              <Col xs={12} sm={12} md={8} lg={6} xl={6} key={movie.id}>
                <MovieCard movie={movie} />
              </Col>
            ))}
          </Row>

          {totalPages > 1 && (
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
          )}
        </>
      )}
    </div>
  );
};

export default Search;



