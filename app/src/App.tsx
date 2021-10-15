import React, { useEffect, useState } from "react"
import "./index.css"
import styled from "styled-components"
import Card from "./Card"
import axios from "axios"
import { Product } from "@test-whitech/common/product"

const App = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [perPage, setPerPage] = useState<number>(8)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)
  const [totalItems, setTotalItems] = useState<number>(1)

  // to display for the paginator
  const availablePages = Array.from(Array(10), (_, i) => currentPage - 5 + i).filter((i) => i >= 1 && i <= totalPages)

  useEffect(() => {
    const _ = async () => {
      const { data } = await axios.get<{
        totalItems: number
        totalPages: number
        currentPage: number
        rows: Product[]
      }>("http://localhost:4000/products", {
        params: {
          size: perPage,
          page: currentPage
        }
      })
      setProducts(data.rows)
      setTotalPages(data.totalPages)
      setTotalItems(data.totalItems)
    }
    _().then()
  }, [perPage, currentPage])

  return (
    <Root>
      <Wrapper>
        <Header>
          <HeaderLeft>
            <h1>All Products</h1>
            <h2>{totalItems} Products</h2>
          </HeaderLeft>
          <HeaderRight>
            <select onChange={(e) => setPerPage(+e.target.value)}>
              <option value={8}>8 per page</option>
              <option value={16}>16 per page</option>
              <option value={32}>32 per page</option>
            </select>
          </HeaderRight>
        </Header>
        <CardsFlex>
          {products.map((p) => (
            <Card key={p.id} product={p} />
          ))}
        </CardsFlex>
        <Footer>
          <Pagination currentPage={currentPage}>
            <PaginationButton
              inactive={currentPage === 1}
              onClick={() => currentPage !== 1 && setCurrentPage(currentPage - 1)}
            >
              {"< Previous Page"}
            </PaginationButton>
            <ul>
              {availablePages.map((i) => (
                <PaginationLi key={i} active={i === currentPage} onClick={() => setCurrentPage(i)}>
                  {i}
                </PaginationLi>
              ))}
            </ul>
            <PaginationButton
              inactive={currentPage === totalPages}
              onClick={() => currentPage !== totalPages && setCurrentPage(currentPage + 1)}
            >
              {"Next Page >"}
            </PaginationButton>
          </Pagination>
        </Footer>
      </Wrapper>
    </Root>
  )
}

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid lightgray;
  padding: 1rem;
`

const HeaderLeft = styled.div`
  h1 {
    color: #aaaaaa;
    font-size: 1.5em;
    font-weight: bold;
  }

  h2 {
    color: #a0a0a0;
    font-size: 1em;
    font-weight: lighter;
  }
`

const HeaderRight = styled.div`
  margin-top: auto;
  margin-bottom: auto;
`

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 1rem;
`

const Pagination = styled.div<{ currentPage: number }>`
  display: flex;

  ul {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0 10px;
  }
`

const PaginationLi = styled.li<{ active: boolean }>`
  width: 30px;
  height: 30px;
  text-align: center;
  display: flex;
  justify-content: center;
  border-bottom: 3px solid transparent;
  cursor: pointer;

  // active
  ${({ active }) => active && "background-color: white; border-bottom-color: black;"}
`

const PaginationButton = styled.span<{ inactive: boolean }>`
  cursor: pointer;

  /* activeness */
  ${({ inactive }) => inactive && "color: grey;"}
`
const Wrapper = styled.div`
  max-width: 1650px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
`

const CardsFlex = styled.ul`
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
`

const Root = styled.div`
  min-height: 100%;
  background: #e2e1e0;
`

export default App
