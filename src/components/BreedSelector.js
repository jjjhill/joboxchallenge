import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import SideBarItem from './SideBarItem'
import './BreedSelector.css'
import { selectBreed } from "../actions/breed"
import { expandSidebar, collapseSidebar, collapseFullSidebar } from "../actions/sidebar"

function BreedSelector(props) {
  let [breedsList, setBreedsList] = useState({})
  let [breedExpanded, setBreedExpanded] = useState('')

  // Loop through each breed and sub-breed and attach the image sources to them.
  // This increases performance by ensuring we don't need to fetch images for thumbnails
  // every time a user hovers over a breed
  useEffect(() => {
    axios({
      method: 'get',
      url: 'https://dog.ceo/api/breeds/list/all'
    })
    .then(res => {
      let breedsObj = res.data.message

      Object.keys(breedsObj).forEach(breed => {
        axios.get(`https://dog.ceo/api/breed/${breed}/images/random`)
        .then(res => {
          breedsObj[breed] = {
            src: res.data.message,
            subBreeds: breedsObj[breed].map((subBreed) => ({
              name: subBreed,
              src: ''
            }))
          }
          Promise.all(breedsObj[breed].subBreeds.map(subBreed =>
            axios.get(`https://dog.ceo/api/breed/${breed}/${subBreed.name}/images/random`)
          ))
          .then((responses) => {
            responses.forEach((res, i) => {
              let src = res.data.message
              breedsObj[breed].subBreeds[i].src = src
            })
          })
        })
      })
      setBreedsList(breedsObj)
    })
  }, []);

  const onSelectBreed = (breed, subBreed) => {
    props.selectBreed(breed, subBreed)
    props.collapseFullSidebar()
    if (!subBreed) setBreedExpanded('');
  }
  const onExpandSubBreeds = (breed) => {
    props.expandSidebar()
    setBreedExpanded(breed)
  }

  const handleHover = (breed) => {
    if (props.isSmallScreen) return
    if (breedsList[breed].subBreeds.length) onExpandSubBreeds(breed)
    else {
      if (props.sidebarState.subSidebarOpen) props.collapseSidebar()
    }
  }

  return (
    <div>
      <div hidden={!props.sidebarState.sidebarOpen} className="sidebar">
        {Object.keys(breedsList).map(breed =>
          <SideBarItem
            label={breed}
            children={breedsList[breed].subBreeds || []}
            imgSrc={breedsList[breed].src}
            key={breed}
            selected={props.selectedBreed.breed === breed}
            onSelectBreed={() => onSelectBreed(breed, '')}
            onExpandSubBreeds={onExpandSubBreeds}
            handleHover={() => handleHover(breed)} />
        )}
      </div>
      <div hidden={!props.sidebarState.subSidebarOpen} className="sidebar sub-sidebar">
        {breedExpanded && breedsList[breedExpanded].subBreeds.map(subBreed => 
          <SideBarItem
            label={subBreed.name}
            children={[]}
            imgSrc={subBreed.src}
            key={subBreed.src}
            selected={props.selectedBreed.breed === breedExpanded && props.selectedBreed.subBreed === subBreed.name}
            onSelectBreed={() => onSelectBreed(breedExpanded, subBreed.name)}
            onExpandSubBreeds={() => {}}
            handleHover={() => {}} />
        )}
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    selectedBreed: state.selectedBreed,
    sidebarState: state.sidebarState,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    selectBreed: (breed, subBreed) => {
      dispatch(selectBreed(breed, subBreed))
    },
    expandSidebar: () => {
      dispatch(expandSidebar())
    },
    collapseSidebar: () => {
      dispatch(collapseSidebar())
    },
    collapseFullSidebar: () => {
      dispatch(collapseFullSidebar())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BreedSelector)
