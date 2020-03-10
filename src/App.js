import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import './App.css'
import { appendImages, clearImages } from "./actions/images"
import axios from 'axios'
import ImageGrid from './components/ImageGrid'

function App(props) {
  let loading = false
  let [numColumns, setNumColumns] = useState(4)
  useEffect(() => {
    loadMoreImages()
    updateWindowDimensions()
    window.addEventListener('resize', updateWindowDimensions);

    return () => {
      window.removeEventListener('resize', updateWindowDimensions);
    }
  }, [])

  const updateWindowDimensions = () => {
    let width = window.innerWidth
    if (width < 600) {
      setNumColumns(1)
    }
    else if (width < 900) {
      setNumColumns(2)
    }
    else if (width < 1200) {
      setNumColumns(3)
    }
    else {
      setNumColumns(4)
    }
  }

  const loadMoreImages = () => {
    if (!loading) {
      loading = true
      axios({
        method: 'get',
        url: 'https://dog.ceo/api/breed/pug/images/random/10'
      })
      .then(res => {
        props.handleLoadMoreImages(res.data.message)
        loading = false
      })
    }
  }

  return (
    <div className="App">
      <ImageGrid numColumns={numColumns} onIntersectionObserved={loadMoreImages}/>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    images: state.images
  }
};

const mapDispatchToProps = dispatch => {
  return {
    handleLoadMoreImages: (images) => {
      dispatch(appendImages(images));
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App)
