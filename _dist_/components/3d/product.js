import React from '../../../web_modules/react.js';
import Model from './model.js';
import { OrbitControls } from '../../../web_modules/@react-three/drei.js';
import CanvasContainer from './canvas-container.js';
/**
 * A trainers modal
 */

const Product = () => {
  return /*#__PURE__*/React.createElement(CanvasContainer, {
    height: 530,
    width: 600,
    position: [25, 30, 20],
    fov: 95
  }, /*#__PURE__*/React.createElement(Model, {
    scenePath: "shoes/scene.gltf",
    position: [15, 22, 10],
    rotation: [0, 0.005, 0] // scale= {[200,10,0]}

  }), /*#__PURE__*/React.createElement(OrbitControls, null));
};

export default Product;