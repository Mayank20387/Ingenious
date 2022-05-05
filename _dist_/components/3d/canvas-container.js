function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { Suspense } from '../../../web_modules/react.js';
import { Canvas } from '../../../web_modules/react-three-fiber.js';
import { Box } from '../../../web_modules/@chakra-ui/core.js';
/**
 * A container with a set width to hold the canvas.
 */

const CanvasContainer = ({
  width,
  height,
  position,
  fov,
  children,
  ...rest
}) => {
  return /*#__PURE__*/React.createElement(Box, _extends({}, rest, {
    h: height,
    w: width,
    zIndex: "999"
  }), /*#__PURE__*/React.createElement(Canvas, {
    colorManagement: true,
    camera: {
      position,
      fov
    }
  }, /*#__PURE__*/React.createElement(Suspense, {
    fallback: null
  }, children)));
};

export default CanvasContainer;