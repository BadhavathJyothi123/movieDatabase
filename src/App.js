import {useState} from 'react'
import {Route, Switch} from 'react-router-dom'

import Popular from './components/Popular'
import Toprated from './components/Toprated'
import Upcoming from './components/Upcoming'
import SearchQuery from './components/SearchQuery'

import SearchMoviesContext from './Context/SearchMoviesContext'

import './App.css'

const API_KEY = '988a26a8e40cb3d8b5a0b949d9a5883a'

const App = () => {
  const [searchResponse, setSearchResponse] = useState({})
  const [apiStatus, setApiStatus] = useState('INITIAL')
  const [searchInput, setSearchInput] = useState('')

  const onChangeSearchInput = text => setSearchInput(text)

  const getUpdatedData = responseData => ({
    totalPages: responseData.total_pages,
    totalResults: responseData.total_results,
    results: responseData.results.map(eachMovie => ({
      id: eachMovie.id,
      voteAverage: eachMovie.vote_average,
      title: eachMovie.title,
      posterPath: `https://image.tmdb.org/t/p/w500${eachMovie.poster_path}`,
    })),
  })

  const onTriggerSearchingQuery = async (page = 1) => {
    setApiStatus('IN_PROGRESS')
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchInput}&page=${page}`
    const response = await fetch(apiUrl)
    const data = await response.json()
    setSearchResponse(getUpdatedData(data))
    setApiStatus('SUCCESS')
  }

  return (
    <SearchMoviesContext.Provider
      value={{
        searchResponse,
        apiStatus,
        onTriggerSearchingQuery,
        searchInput,
        onChangeSearchInput,
      }}
    >
      <div className="App d-flex flex-column">
        <Switch>
          <Route exact path="/" component={Popular} />
          <Route exact path="/top-rated" component={Toprated} />
          <Route exact path="/upcoming" component={Upcoming} />
          <Route exact path="/search" component={SearchQuery} />
        </Switch>
      </div>
    </SearchMoviesContext.Provider>
  )
}

export default App
