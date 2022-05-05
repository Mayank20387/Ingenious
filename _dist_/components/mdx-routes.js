import React from '../../web_modules/react.js';
import { Box, CSSReset } from '../../web_modules/@chakra-ui/core.js';
import { BrowserRouter as Router, Routes, Route } from '../../web_modules/react-router-dom.js';
import PageOne from '../pages/page-one.js';
import PageTwo from '../pages/page-two.js';
import Background from './background.js';
/**
 * The routes for the app. When adding new pages add a new route and a corresponding nav link in the Nav component above. Import the new page and add it to the route.
 */

export const MDXRoutes = () => /*#__PURE__*/React.createElement(Router, null, /*#__PURE__*/React.createElement(CSSReset, null), /*#__PURE__*/React.createElement(Box, {
  position: "relative",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  zIndex: "99999"
}, /*#__PURE__*/React.createElement(Background, null), /*#__PURE__*/React.createElement(Routes, null, /*#__PURE__*/React.createElement(Route, {
  path: "/",
  element: /*#__PURE__*/React.createElement(PageOne, null)
}), /*#__PURE__*/React.createElement(Route, {
  path: "/",
  element: /*#__PURE__*/React.createElement(PageTwo, null)
}))));