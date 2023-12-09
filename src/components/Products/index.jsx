import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('');
    const [sort, setSort] = useState('');

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then((response) => response.json())
            .then((data) => {
                setProducts(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching product data:', error);
                setLoading(false);
            });
    }, []);

    function handleSubmit(e) {
        e.preventDefault()
        setSort(e.target.value)
        switch (sort) {
            case 'low-to-high':
                setProducts((prevProducts) =>
                    prevProducts.sort((a, b) => a.price - b.price)
                );
                break;
            case 'high-to-low':
                setProducts((prevProducts) =>
                    prevProducts.sort((a, b) => b.price - a.price)
                );
                break;
            default:
                setProducts((prevProducts) =>
                    prevProducts.sort((a, b) => a.id - b.id)
                );
                break;
        }
    }
    return (
        <>
            <form className="my-4 mx-1 shadow" onSubmit={handleSubmit}>
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search..."
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    />
                    <select className="form-select" onChange={(e) => setSort(e.target.value)}>
                        <option value="default">Default</option>
                        <option value="low-to-high">Price: Low to High</option>
                        <option value="high-to-low">Price: High to Low</option>
                    </select>
                    <button className="btn btn-outline-secondary" type="submit">
                        Sort
                    </button>
                </div>
            </form>
            <div className="container">
                <h1 className="text-center my-5">Product Listing</h1>
                {loading ? (
                    <div className="text-center">Loading...</div>
                ) : (
                    <div className="row">
                        {products.filter((product) =>
                            product.title.toLowerCase().includes(filter.toLowerCase())).map((product) => (
                                <div className="col-md-3 mb-3" key={product.id}>
                                    <div className="card shadow-lg" style={{ height: '30rem' }} >
                                        <img src={product.image} className="card-img-top p-4" style={{ height: '18rem' }} alt={product.title} />
                                        <div className="card-body d-flex flex-column justify-content-between">
                                            <div>
                                                <h5 className="card-title">{product.title}</h5>
                                                <p className="card-text">Price: ${product.price}</p>
                                            </div>
                                            <div className='d-flex justify-content-between'>
                                                <a href={'product.link'} className="btn btn-primary shadow-lg">Buy Now</a>
                                                <h5>{product.rating.rate}</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                )}
            </div>
        </>
    )
}

export default Products