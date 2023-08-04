import React, {useEffect, useState} from 'react';
import './App.css';
import axios from "axios";
import {IProduct} from "./models";
import Products from "./Products";
import Pagination from "./Pagination";
import {useMutation, useQuery, useQueryClient} from "react-query";

async function fetchProducts() {
    const { data } = await axios.get<IProduct[]>('https://fakestoreapi.com/products')
    return data
}

async function createProduct(body: IProduct) {
    return await axios.post<IProduct>('https://fakestoreapi.com/products', body)
}

function App() {

    const queryClient = useQueryClient()

    // const [products, setProducts] = useState<IProduct[]>([])
    // const [loading, setLoading] = useState(false)
    // const [currentPage, setCurrentPage] = useState<number>(1)
    // const [productsPerPage] = useState<number>(5)
    const [searchTerm, setSearchTerm] = useState<string>("")

    const {data, isError, isLoading, isFetching} = useQuery<IProduct[]>(
        'products',
        fetchProducts,
        {
            refetchOnWindowFocus: false
        })

    const mutation = useMutation(
        (newProduct: IProduct) => createProduct(newProduct),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["products"])
            }
        }
    )

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const body: IProduct = {
            title: 'test product',
            price: 13.5,
            description: 'lorem ipsum set',
            image: 'https://i.pravatar.cc',
            category: 'electronic'
        }

        mutation.mutate(body)
    }

    if (isLoading) return <h2>Loading</h2>

    if(isError) return <h2>Error</h2>

    if(!data) return <h2>Error data</h2>
    // console.log(result)

    // useEffect(() => {
    //     const getProducts = async () => {
    //         setLoading(true)
    //         const response = await axios.get<IProduct[]>('https://fakestoreapi.com/products')
    //         setProducts(response.data)
    //         setLoading(false)
    //     }
    //     getProducts()
    // }, [])

    // const paginate = (pageNumber: number) => setCurrentPage(pageNumber)
    // const nextPage = () => setCurrentPage(prev => prev + 1)
    // const prevPage = () => setCurrentPage(prev => prev - 1)

    const handleSearch = (e: { target: { value: string}}) => {
        // setCurrentPage(1)
        setSearchTerm(e.target.value)
    }

    // const bySearch = (product: IProduct, search: string) => {
    //     if (search) {
    //         return product.title.toLowerCase().includes(search.toLowerCase());
    //     } else return product;
    // };
    //
    // const filteredList = (products: IProduct[], search: string) => {
    //     return products.filter(product => bySearch(product, search))
    // }

    // const indexLastPage = currentPage * productsPerPage
    // const indexFirstPage = indexLastPage - productsPerPage
    // const currentProduct = filteredList(products, searchTerm).slice(indexFirstPage, indexLastPage)



    return (
        <div className="container">
            <h1>Products</h1>
            <input placeholder="Search..." className="form-control mb-2" type="text" name="search" onChange={handleSearch}/>
            <form onSubmit={onSubmit} action="">
                <button>Добавить</button>
            </form>
            <Products products={data} searchTerm={searchTerm} />
            {/*<Products productsPerPage={productsPerPage} currentPage={currentPage} products={currentProduct} loading={loading}/>*/}
            {/*<Pagination currentPage={currentPage} paginate={paginate} totalProducts={filteredList(products, searchTerm).length} productPerPage={productsPerPage}/>*/}

            {/*<button className="btn btn-primary" onClick={prevPage}>Prev page</button>*/}
            {/*<button className="btn btn-primary ml-2" onClick={nextPage}>Next page</button>*/}
        </div>
    );
}

export default App;
