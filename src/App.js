import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import './App.css'
import ImageGrid from './components/ImageGrid'
import Header from './components/Header'
import BreedSelector from './components/BreedSelector'
import { appendImages, clearImages } from "./actions/images"

function App(props) {
  let loading = false
  let [numColumns, setNumColumns] = useState(4)
  let [isSmallScreen, setIsSmallScreen] = useState(false)

  useEffect(() => {
    loadMoreImages()
    updateWindowDimensions()
    window.addEventListener('resize', updateWindowDimensions);
    if (window.innerWidth < 1000)
      setIsSmallScreen(true)
    else
      setIsSmallScreen(false)

    return () => {
      window.removeEventListener('resize', updateWindowDimensions);
    }
  }, [])

  useEffect(() => {
    props.clearImages();
    loadMoreImages();
  }, [props.selectedBreed])

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
    let subBreedStr = props.selectedBreed.subBreed && `/${props.selectedBreed.subBreed}`
    if (!loading) {
      loading = true
      axios
        .get(`https://dog.ceo/api/breed/${props.selectedBreed.breed}${subBreedStr}/images/random/10`)
        .then(res => {
          props.appendImages(res.data.message)
          loading = false
        })
      }
  }

  return (
    <div className="App">
      <Header />
      <BreedSelector isSmallScreen={isSmallScreen}/>
      <ImageGrid numColumns={numColumns} onIntersectionObserved={loadMoreImages} />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    images: state.images,
    selectedBreed: state.selectedBreed
  }
};

const mapDispatchToProps = dispatch => {
  return {
    appendImages: (images) => {
      dispatch(appendImages(images));
    },
    clearImages: (images) => {
      dispatch(clearImages(images));
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App)
