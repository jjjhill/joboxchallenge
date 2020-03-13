import React from 'react'
import { connect } from 'react-redux'
import './Header.css'
import { expandSidebar, collapseFullSidebar } from '../actions/sidebar'

function Header(props) {
  const onSelectorToggle = () => {
    if (props.sidebarOpen) {
      props.collapseFullSidebar()
    }
    else {
      props.expandSidebar()
    }
  }

  return (
    <div className="Header" onClick={onSelectorToggle}>
      {props.sidebarOpen && <img className="left-arrow" src={'/left_arrow.png'} alt="collapse sidebar"/> }
      {!props.sidebarOpen && <img className="hamburger" src={'/hamburger.png'} alt="expand sidebar"/> }
      <p className="breed-label">{ props.selectedBreed.subBreed + ' ' + props.selectedBreed.breed}</p>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    sidebarOpen: state.sidebarState.sidebarOpen,
    selectedBreed: state.selectedBreed
  }
};

const mapDispatchToProps = dispatch => {
  return {
    expandSidebar: () => {
      dispatch(expandSidebar());
    },
    collapseFullSidebar: () => {
      dispatch(collapseFullSidebar());
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Header)