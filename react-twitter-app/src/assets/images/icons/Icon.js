import React from 'react'
import PropTypes from 'prop-types'

const IconComponent = ({src, ...props}) => {
 if (typeof src === 'string' || src instanceof String) {
  return <img src={src} {...props}/>
 } else if (typeof src === 'object' && src !== null) {
  return (src)
 } else {
  return null
 }
}

IconComponent.propTypes = {
 className: PropTypes.string

}

IconComponent.defaultProps = {
 className: ''
}

export default IconComponent
