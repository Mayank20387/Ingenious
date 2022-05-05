function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from '../../web_modules/react.js';
import { mdx } from '../../web_modules/@mdx-js/react.js';
/* @jsxRuntime classic */

/* @jsx mdx */

const makeShortcode = name => function MDXDefaultShortcode(props) {
  console.warn("Component " + name + " was not imported, exported, or provided by MDXProvider as global scope");
  return mdx("div", props);
};

const Flex = makeShortcode("Flex");
const Image = makeShortcode("Image");
const Text = makeShortcode("Text");
const GlitchText = makeShortcode("GlitchText");
const Box = makeShortcode("Box");
const Link = makeShortcode("Link");
const Button = makeShortcode("Button");
const Product = makeShortcode("Product");
const layoutProps = {};
const MDXLayout = "wrapper";
export default function MDXContent({
  components,
  ...props
}) {
  return mdx(MDXLayout, _extends({}, layoutProps, props, {
    components: components,
    mdxType: "MDXLayout"
  }), mdx(Flex, {
    gridArea: "edge",
    gridRow: "1",
    justify: "center",
    align: "center",
    ml: 6,
    mdxType: "Flex"
  }, mdx(Image, {
    w: "60px",
    src: "/Frame.png",
    alt: "Red Nike Swoosh Logo",
    mdxType: "Image"
  })), mdx(Flex, {
    gridArea: "text",
    justify: "center",
    direction: "column",
    h: "100%",
    maxH: "400px",
    w: "100%",
    p: 6,
    mdxType: "Flex"
  }, mdx(Flex, {
    my: 6,
    mx: 2,
    mdxType: "Flex"
  }, mdx(Text, {
    color: "brand.lightGrey",
    fontSize: "4xl",
    mdxType: "Text"
  }, mdx(GlitchText, {
    mdxType: "GlitchText"
  }, "INGENIOUS "))), mdx(Flex, {
    mdxType: "Flex"
  }, mdx(Text, {
    color: "brand.lightGrey",
    fontSize: "6xl",
    mdxType: "Text"
  }, mdx(GlitchText, {
    mdxType: "GlitchText"
  }, "ILLUMINATING GENIOUS MINDS "))), mdx(Box, {
    h: "80%",
    position: "relative",
    zIndex: "101",
    mdxType: "Box"
  }, mdx(Text, {
    my: 6,
    fontWeight: 300,
    color: "brand.text",
    fontSize: "xl",
    borderTop: "solid 1px",
    pt: 6,
    mdxType: "Text"
  }, "Ingenious built to hone aptitude for discovering, inventing, or contriving ideas."), mdx(Link, {
    href: "pages/p2",
    mdxType: "Link"
  }, mdx(Button, {
    colorScheme: "teal",
    variant: "solid",
    mdxType: "Button"
  }, "Button")))), mdx(Flex, {
    gridArea: "product",
    justify: "center",
    direction: "column",
    h: "100%",
    position: "relative",
    mdxType: "Flex"
  }, mdx(Product, {
    mdxType: "Product"
  }), mdx(Box, {
    position: "absolute",
    right: "-15%",
    bottom: "25%",
    display: ['none', 'block'],
    mdxType: "Box"
  })));
}
;
MDXContent.isMDXComponent = true;