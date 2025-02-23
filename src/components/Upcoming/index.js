import React from 'react'
import Loader from 'react-loader-spinner'

import MovieCard from '../MovieCard'
import Navabar from '../Navabar'
import Pagination from '../Pagination'

import './index.css'

class Upcoming extends React.Component {
  state = {
    isLoading: true,
    popularMovieResponse: {},
  }

  componentDidMount() {
    this.getUpcomingMoviesData()
  }

  getUpdatedData = responseData => ({
    totalPages: responseData.total_pages,
    totalResults: responseData.total_results,
    results: responseData.results.map(eachMovie => ({
      id: eachMovie.id,
      voteAverage: eachMovie.vote_average,
      title: eachMovie.title,
      posterPath: `https://image.tmdb.org/t/p/w500${eachMovie.poster_path}`,
    })),
  })

  getUpcomingMoviesData = async (page = 1) => {
    const API_KEY = '988a26a8e40cb3d8b5a0b949d9a5883a'
    const apiUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${page}`
    const response = await fetch(apiUrl)
    const data = await response.json()
    const newData = this.getUpdatedData(data)
    this.setState({isLoading: false, popularMovieResponse: newData})
  }

  renderLoader = () => (
    <div className='loader-container'>
      <Loader type='TailSpin' color='#032541' />
    </div>
  )

  renderUpcomingMovieDetails = () => {
    const {popularMovieResponse} = this.state
    const {results} = popularMovieResponse

    return (
      <ul className='row p-0 ms-0 me-0 mt-3'>
        {results.map(movie => (
          <MovieCard key={movie.id} movieDetails={movie} />
        ))}
        <button className='btn btn-primary' type='button'>
          View Details
        </button>
      </ul>
    )
  }

  render() {
    const {isLoading, popularMovieResponse} = this.state

    return (
      <>
        <Navabar />
        <div className='route-page-body'>
          {isLoading ? this.renderLoader() : this.renderUpcomingMovieDetails()}
        </div>
        <Pagination
          apiCallback={this.getTopRtaedMoviesData}
          totalPages={popularMovieResponse.totalPages}
        />
      </>
    )
  }
}

export default Upcoming
