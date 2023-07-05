import {IProduct} from "./models";

interface Products {
    products: IProduct[]
    loading: boolean
    productsPerPage: number
    currentPage: number
}

const Products = ({products, loading, productsPerPage, currentPage}: Products) => {

    if (loading) {
        return <h2>Loading</h2>
    }

    return (
        <ul className="list-group">
            {products.map((product, i) => (
                <li key={i} className="list-group-item">
                    {(currentPage - 1) * productsPerPage + i + 1}. {product.title}
                    <img src={product.image} className="ml-2" style={{width: 25}}/>
                </li>
            ))}
        </ul>
    )
}

export default Products