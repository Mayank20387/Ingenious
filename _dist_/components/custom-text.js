import React from '../../web_modules/react.js';
import styled from '../../web_modules/@emotion/styled.js';
const Custom = styled.p`
  transform: ${props => props.vertical ? 'rotate(0deg)' : 'none'};
  font-size: ${props => props.fontSize ? props.fontSize : '20px'};
  letter-spacing: 10px;
  cursor: default;
  -webkit-text-stroke: 2px ${props => props.color ? props.color : '#5C5C5C'};
  -webkit-text-fill-color: transparent;
`;

const CustomText = ({
  text,
  fontSize,
  color,
  vertical
}) => {
  return /*#__PURE__*/React.createElement(Custom, {
    fontSize: fontSize,
    color: color,
    vertical: vertical
  }, text);
};

export default CustomText;