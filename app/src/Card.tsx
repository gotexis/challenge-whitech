import React from "react"
import styled from "styled-components"
import { Product } from "@test-whitech/common/product"

const Card = ({ product: { price, product_name, description, product_image } }: { product: Product }) => (
  <Box>
    <BoxInner>
      <ImgWrap>
        <Img src={product_image} />
      </ImgWrap>
      <Description>
        <h2>{product_name}</h2>
        <h3>{description}</h3>
        <h4>{price}</h4>
      </Description>
    </BoxInner>
  </Box>
)

const Box = styled.li`
  list-style: none;
  padding: 1rem;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  width: 100%;
  @media (min-width: 768px) {
    width: calc((100% - 4rem) / 2);
  }
  @media (min-width: 992px) {
    width: calc((100% - 8rem) / 4);
  }
`

const BoxInner = styled.div`
  height: 100%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  background: white;
  border-radius: 0.25rem;
  display: flex;
  flex-direction: column;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

  &:hover {
    box-shadow: 0 7px 12px rgba(0, 0, 0, 0.1), 0 4px 4px rgba(0, 0, 0, 0.1);
  }
`

const ImgWrap = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid lightgray;
`

const Img = styled.img<{ src: string }>`
  position: relative;
  overflow: hidden;
  top: 0;
  width: 200px;
  max-width: 100%;
  height: 200px;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
  filter: contrast(40%);
  transition: filter 0.5s cubic-bezier(0.43, 0.41, 0.22, 0.91);

  &:hover {
    filter: contrast(100%);
  }

  @media (min-width: 768px) {
    &::before {
      padding-top: 66.6%; // 3:2 aspect ratio
    }
  }
`

const Description = styled.div`
  padding: 1rem;
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  h2 {
    color: #aaaaaa;
    font-size: 1em;
    font-weight: bold;
  }

  h3 {
    color: #a0a0a0;
    font-size: 1em;
    font-weight: lighter;
    flex-grow: 1;
  }

  h4 {
    font-size: 1em;
    font-weight: bold;
  }
`

export default Card
