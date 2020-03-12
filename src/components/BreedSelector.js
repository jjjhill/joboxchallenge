import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import './BreedSelector.css'
import axios from 'axios'
import { selectBreed } from "../actions/breed"

function BreedSelector(props) {
  let [breedsList, setBreedsList] = useState({})
  let [breedExpanded, setBreedExpanded] = useState('')
  let [subSelectorOpen, setSubSelectorOpen] = useState(false)
  let [highlightedBreed, setHighlightedBreed] = useState('')

  useEffect(() => {
    axios({
      method: 'get',
      url: 'https://dog.ceo/api/breeds/list/all'
    })
    .then(res => setBreedsList(res.data.message))
  }, []);

  const onSelectBreed = (breed, subBreed) => {
    props.onSelectorToggle()
    props.selectBreed(breed, subBreed)
    setHighlightedBreed(breed)
    if (!subBreed) setBreedExpanded('');
  }

  const onExpandSubBreeds = (breed) => {
    setBreedExpanded(breed)
    setHighlightedBreed(breed)
  }

  return (
    <div hidden={!props.selectorOpen}>
      <div className="sidebar">
        {Object.keys(breedsList).map(breed => 
          <SideBarItem
            breed={breed}
            subBreed={''}
            sideBarIndex={0}
            children={breedsList[breed]}
            key={breed}
            highlighted={highlightedBreed === breed}
            onSelectBreed={onSelectBreed}
            onExpandSubBreeds={onExpandSubBreeds}/>
        )}
      </div>
      <div hidden={!breedExpanded} className={"sub-sidebar"}>
        {breedExpanded && breedsList[breedExpanded].map(subBreed => 
          <SideBarItem
            breed={breedExpanded}
            subBreed={subBreed}
            children={[]}
            key={subBreed}
            highlighted={props.selectedBreed.subBreed === subBreed}
            onSelectBreed={() => onSelectBreed(breedExpanded, subBreed)}
            onExpandSubBreeds={() => {}}/>
        )}
      </div>
    </div>
  )
}

function SideBarItem(props) {
  let [imgSrc, setImgSrc] = useState('')
  let subBreedStr = props.subBreed && `/${props.subBreed}`
  useEffect(() => {
    axios({
      method: 'get',
      url: `https://dog.ceo/api/breed/${props.breed}${subBreedStr}/images/random`
    })
    .then(res => setImgSrc(res.data.message))
  }, [props.breed])

  const name = props.subBreed || props.breed
  const children = props.children

  return (
    <div className="sidebar-item" style={{ backgroundColor: props.highlighted ? '#777777' : "#121212"}}>
      <div className="breed-info" onClick={() => props.onSelectBreed(name, '')}>
        <img src={imgSrc} className="thumbnail-img"/>
        <p>{name}</p>
      </div>
      {children.length > 0 &&
        <img
          src={'/right_arrow.png'}
          className="sub-breed-btn"
          onClick={() => props.onExpandSubBreeds(name)} />
      }
    </div>
  )
}

const mapStateToProps = state => {
  return {
    selectedBreed: state.selectedBreed
  }
}

const mapDispatchToProps = dispatch => {
  return {
    selectBreed: (breed, subBreed) => {
      dispatch(selectBreed(breed, subBreed))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BreedSelector)
