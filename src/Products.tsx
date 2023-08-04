import {IProduct} from "./models";
import {useEffect, useState} from "react";

interface Products {
    products: IProduct[]
    // loading: boolean
    searchTerm: string
    // productsPerPage: number
    // currentPage: number
}

const Products = (
    {
        products,
        // loading,
        searchTerm
        // productsPerPage,
        // currentPage
    }: Products
) => {

    const [filterProducts, setFilterProducts] = useState<IProduct[]>([])

    useEffect(() => {
        setFilterProducts(products)
    }, [products])

    useEffect(() => {
        const filterProducts = (products: IProduct[]) => {
            if(searchTerm)
                setFilterProducts(products.filter((product) => product.title.toLowerCase().includes(searchTerm.toLowerCase())))
        }
        filterProducts(products)
    }, [searchTerm])



    return (
        <ul className="list-group">
            {filterProducts.map((product, i) => (
                <li key={i} className="list-group-item">
                    {/*{(currentPage - 1) * productsPerPage + i + 1}. {product.title}*/}
                    {product.title}
                    <img src={product.image} className="ml-2" style={{width: 25}}/>
                </li>
            ))}
        </ul>
    )
}

export default Products