import React, { useEffect } from 'react';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';

export default function HomeScreen() {
  //react hook is an state so to define a hookState we use useState
  //const [products, setProducts] = useState([]); //to manage the state of our react component
  //const [loading, setLoading] = useState(false);
  //const [error, setError] = useState(false);
  /********************************************************* */

  //When we used Redux we replace all the previous hooks by:
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  // AFTER UDSING REDUX WE CAN REPLACE THE CODE BELOW BY:

  useEffect(() => {
    dispatch(listProducts({}));
  }, [dispatch]);

  /**************************************************** */
  // Now we need to fill the products, we need useEffect function it's an other hook that runs when
  //component DidMount our webPage/ AFTER RUNDERING THE COMPONENT THIS FUNCTION WILL RUN
  /*useEffect(() => {
    //Defining fetchData:
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get('/api/products');
        setLoading(false);
        setProducts(data);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    //Calling fetchData:
    fetchData();
  }, []);*/

  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="row center">
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
