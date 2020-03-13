import React, { useState } from 'react'
import './SideBarItem.css'

export default function SideBarItem(props) {
  const darkGray = "#121212"
  const mediumGray = "#555555"
  const lightGray = "#777777"
  let [isHovered, setIsHovered] = useState(false)

  let backgroundColor = darkGray
  if (props.selected) backgroundColor = lightGray
  else if (isHovered) backgroundColor = mediumGray

  const changeHover = (val) => {
    setIsHovered(val)
    if (val) props.handleHover()
  }

  return (
    <div
      className="sidebar-item"
      style={{ backgroundColor }}
      onMouseEnter={() => changeHover(true)}
      onMouseLeave={() => changeHover(false)}>
      <div className="breed-info" onClick={props.onSelectBreed}>
        <img src={props.imgSrc} className="thumbnail" alt="thumbnail" />
        <p>{props.label}</p>
      </div>
      {props.children.length > 0 &&
        <div>
          <img
            src={'/right_arrow.png'}
            className="sub-breed-btn"
            onClick={() => props.onExpandSubBreeds(props.label)}
            alt="show sub-breeds" />
        </div>
      }
    </div>
  )
}