'use client'

import React from 'react'
import ScrollSpy from 'react-ui-scrollspy'

const ScrollSpyWrapper = ({children}) => {
  return (
<ScrollSpy  scrollThrottle={10}>
    {children}
</ScrollSpy>
  )
}

export default ScrollSpyWrapper