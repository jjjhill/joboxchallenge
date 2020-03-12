import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import './App.css'
import { appendImages, clearImages } from "./actions/images"
import axios from 'axios'
import ImageGrid from './components/ImageGrid'
import Header from './components/Header'
import BreedSelector from './components/BreedSelector'

// TODO: make sidebar mobile responsive
// TODO: make sidebar hidden when user clicks outside of it
function App(props) {
  let loading = false
  let [numColumns, setNumColumns] = useState(4)
  let [selectorOpen, setSelectorOpen] = useState(false)

  useEffect(() => {
    loadMoreImages()
    updateWindowDimensions()
    window.addEventListener('resize', updateWindowDimensions);

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
    // TODO: maybe find a cleaner way to do this
    let subBreedStr = props.selectedBreed.subBreed && `/${props.selectedBreed.subBreed}`
    if (!loading) {
      loading = true
      axios({
        method: 'get',
        url: `https://dog.ceo/api/breed/${props.selectedBreed.breed}${subBreedStr}/images/random/10`
      })
      .then(res => {
        props.appendImages(res.data.message)
        loading = false
      })
    }
  }

  const onSelectorToggle = () => {
    setSelectorOpen(!selectorOpen)
  }

  // TODO: MOVE ALL selectorOpen LOGIC TO BreedSelector & action in header
  return (
    <div className="App">
      <Header onSelectorToggle={onSelectorToggle} selectorOpen={selectorOpen} selectedBreed={props.selectedBreed} />
      <BreedSelector selectorOpen={selectorOpen} onSelectorToggle={() => onSelectorToggle()} />
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
