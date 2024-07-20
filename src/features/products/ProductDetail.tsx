import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AppDispatch, RootState } from '../../app/store';
import { fetchProducts } from './productsSlice';
import Navigation from '../navigation/Navigation';
import { fetchProductById, deleteProduct } from './productsSlice';

const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            dispatch(fetchProductById(Number(id)));
        }
    }, [id, dispatch]);

    const product = useSelector((state: RootState) =>
        state.products.find((p) => p.id === parseInt(id || '', 10))
    );

    const handleDelete = () => {
        if (id) {
            dispatch(deleteProduct(Number(id)));
            navigate('/products');
        }
    };

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <Navigation />
            <h1 className="text-3xl font-bold mb-4">Product Detail</h1>
            <div className="bg-white shadow-md rounded p-6 mb-4">
                <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
                <p className="text-gray-700 mb-2">{product.description}</p>
                <p className="text-gray-700 font-bold mb-2">${product.price.toFixed(2)}</p>
                <p className="text-gray-700 mb-2">Category ID: {product.category_id}</p>
                <div className="flex space-x-4 mt-4">
                    <Link to={`/update-product/${product.id}`}>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
                            Edit
                        </button>
                    </Link>
                    <button
                        onClick={handleDelete}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;