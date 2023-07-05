import React, {useEffect, useState} from 'react';
import './App.css';
import axios from "axios";
import {IProduct} from "./models";
import Products from "./Products";
import Pagination from "./Pagination";

function App() {
    const [products, setProducts] = useState<IProduct[]>([])
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [productsPerPage] = useState<number>(5)
    const [searchTerm, setSearchTerm] = useState<string>("")

    useEffect(() => {
        const getProducts = async () => {
            setLoading(true)
            const response = await axios.get<IProduct[]>('https://fakestoreapi.com/products')
            setProducts(response.data)
            setLoading(false)
        }
        getProducts()
    }, [])

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber)
    const nextPage = () => setCurrentPage(prev => prev + 1)
    const prevPage = () => setCurrentPage(prev => prev - 1)

    const handleSearch = (e: { target: { value: string}}) => {
        setCurrentPage(1)
        setSearchTerm(e.target.value)
    }

    const bySearch = (product: IProduct, search: string) => {
        if (search) {
            return product.title.toLowerCase().includes(search.toLowerCase());
        } else return product;
    };

    const filteredList = (products: IProduct[], search: string) => {
        return products.filter(product => bySearch(product, search))
    }

    const indexLastPage = currentPage * productsPerPage
    const indexFirstPage = indexLastPage - productsPerPage
    const currentProduct = filteredList(products, searchTerm).slice(indexFirstPage, indexLastPage)

    return (
        <div className="container">
            <h1>Products</h1>
            <input placeholder="Search..." className="form-control mb-2" type="text" name="search" onChange={handleSearch}/>
            <Products productsPerPage={productsPerPage} currentPage={currentPage} products={currentProduct} loading={loading}/>
            <Pagination currentPage={currentPage} paginate={paginate} totalProducts={filteredList(products, searchTerm).length} productPerPage={productsPerPage}/>

            <button className="btn btn-primary" onClick={prevPage}>Prev page</button>
            <button className="btn btn-primary ml-2" onClick={nextPage}>Next page</button>
        </div>
    );
}

export default App;
