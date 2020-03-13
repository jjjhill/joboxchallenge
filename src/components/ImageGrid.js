import React, { useRef, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import './ImageGrid.css'

function ImageGrid(props) {
  let { numColumns } = props
  let columns = [];
  props.images.forEach((image, i) => {
    let colIndex = i % numColumns
    if (colIndex > columns.length-1) columns.push([])
    columns[colIndex].push(image)
  })

  return (
    <div className="ImageGrid">
      {columns.map((images, i) => 
        <Column images={images} key={i} onIntersectionObserved={props.onIntersectionObserved} />
      )}
    </div>
  );
}

function Column(props) {
  let { images } = props
  let [bottom, setBottom] = useState(null)
  let bottomObserver = useRef()

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        props.onIntersectionObserved()
      }
    }, { threshold: 0, rootMargin: "0px" });
    bottomObserver.current = observer;
  }, []);

  useEffect(() => {
    const currentObserver = bottomObserver.current
    if (bottom) {
      currentObserver.observe(bottom)
    }
    return () => {
      if (bottom) currentObserver.unobserve(bottom)
    };
  }, [bottom])

  return (
    <div className="ImageColumn">
      {images.map((imgSrc, i) => {
        if (i < images.length - 1) {
          return <img key={i} src={imgSrc} />
        }
        return <img key={i} src={imgSrc} ref={setBottom} />
      })}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    images: state.images
  }
};

export default connect(mapStateToProps)(ImageGrid)

        