import React from 'react'
import TestUtils from 'react-addons-test-utils'

export default function renderShallow (component) {
  const renderer = TestUtils.createRenderer()
  renderer.render(component)
  return renderer.getRenderOutput()
}
