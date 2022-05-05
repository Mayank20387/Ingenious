import __SNOWPACK_ENV__ from '../../__snowpack__/env.js';
import.meta.env = __SNOWPACK_ENV__;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from '../../web_modules/react.js';
import ReactDOM from '../../web_modules/react-dom.js';
import { MDXProvider } from '../../web_modules/@mdx-js/react.js'; // import "./logo.css"; 

import { Box, Flex, Text, Heading, Grid, SimpleGrid, Stack, ChakraProvider, Link, Button, Image } from '../../web_modules/@chakra-ui/core.js'; // import { Button, ButtonGroup } from '@chakra-ui/react'

import theme from '../theme.js';
import { MDXRoutes } from '../components/mdx-routes.js';
import MDXLayout from '../components/mdx-layout.js';
import Product from '../components/3d/product.js';
import Basketball from '../components/3d/basketball.js';
import CustomText from '../components/custom-text.js';
import GlitchText from '../components/glitch-text.js';
import { logDOM } from '../../web_modules/@testing-library/react.js';
const components = {
  wrapper: props => /*#__PURE__*/React.createElement(MDXLayout, props, props.children),
  h1: props => /*#__PURE__*/React.createElement(Text, _extends({
    as: "h1",
    fontSize: "6xl"
  }, props), props.children),
  h2: props => /*#__PURE__*/React.createElement(Text, _extends({
    as: "h2",
    fontSize: "5xl"
  }, props), props.children),
  h3: props => /*#__PURE__*/React.createElement(Text, _extends({
    as: "h3",
    fontSize: "4xl"
  }, props), props.children),
  h4: props => /*#__PURE__*/React.createElement(Text, _extends({
    as: "h4",
    fontSize: "3xl"
  }, props), props.children),
  h5: props => /*#__PURE__*/React.createElement(Text, _extends({
    as: "h5",
    fontSize: "2xl"
  }, props), props.children),
  h6: props => /*#__PURE__*/React.createElement(Text, _extends({
    as: "h6",
    fontSize: "xl"
  }, props), props.children),
  p: props => /*#__PURE__*/React.createElement(Text, props, props.children),
  Text,
  Box,
  Flex,
  Heading,
  Grid: props => /*#__PURE__*/React.createElement(Grid, props, props.children),
  Link,
  Image,
  SimpleGrid,
  Stack,
  Product,
  CustomText,
  Basketball,
  GlitchText,
  Button
};
ReactDOM.render( /*#__PURE__*/React.createElement(React.StrictMode, null, /*#__PURE__*/React.createElement(MDXProvider, {
  components: components
}, /*#__PURE__*/React.createElement(ChakraProvider, {
  theme: theme
}, /*#__PURE__*/React.createElement(MDXRoutes, null)))), document.getElementById('root')); // Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/#hot-module-replacement

if (import.meta.hot) {
  import.meta.hot.accept();
}