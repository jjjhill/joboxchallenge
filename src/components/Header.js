import React from 'react'
import './Header.css'
import BreedSelector from './BreedSelector'

export default function Header(props) {
  return (
    <div className="Header" onClick={props.onSelectorToggle}>
      {props.selectorOpen && <img className="left-arrow" src={'/left_arrow.png'} /> }
      {!props.selectorOpen && <img className="hamburger" src={'/hamburger.png'} /> }
      <p className="breed-label">{ props.selectedBreed.subBreed + ' ' + props.selectedBreed.breed}</p>
    </div>
  )
}
