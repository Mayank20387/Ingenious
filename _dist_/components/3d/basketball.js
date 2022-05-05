import React, { Suspense } from '../../../web_modules/react.js';
import Model from './model.js';
import CanvasContainer from './canvas-container.js';
/**
 * A basketball model
 */

const Basketball = () => {
  return /*#__PURE__*/React.createElement(CanvasContainer, {
    ml: 5,
    height: 100,
    width: 100,
    position: [0, 20, 20],
    fov: 50
  }, /*#__PURE__*/React.createElement(Model, {
    scenePath: "basketball/scene.gltf",
    position: [0, 17, 17],
    rotation: [0.025, 0.025, 0]
  }));
};

export default Basketball;