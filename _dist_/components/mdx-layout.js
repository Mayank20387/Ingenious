import React from '../../web_modules/react.js';
import { Flex, Grid } from '../../web_modules/@chakra-ui/core.js';
import { Loader } from '../../web_modules/@react-three/drei.js'; // Inspiration => https://dribbble.com/shots/4541416-Nike-Vapormax-Product-Page-Motion/attachments/4541416-Nike-Vapormax-Product-Page-Motion?mode=media

const mobile = `
'icon    .'
'product  product'
'text text'
`;
const desktop = `
'edge   .       .         .'
'edge   text    product   .'
`;
/**
 * The base layout for the MDX pages. You can configure this to set how your pages layout should be.
 */

const MDXLayout = ({
  children
}) => {
  return /*#__PURE__*/React.createElement(Grid, {
    templateColumns: ['1fr', '10% 1fr 1fr 10% '],
    templateRows: ['10% 1fr 1fr', '10% 1fr 1fr'],
    templateAreas: [mobile, desktop],
    bg: "brand.background",
    h: "100vh"
  }, children, /*#__PURE__*/React.createElement(Loader, {
    containerStyles: {
      margin: '0 auto'
    }
  }));
};

export default MDXLayout;