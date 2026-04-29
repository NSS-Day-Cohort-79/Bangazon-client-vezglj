import { useEffect, useState } from "react";
import Filter from "../../components/filter";
import Layout from "../../components/layout";
import Navbar from "../../components/navbar";
import { ProductCard } from "../../components/product/card";
import { getProducts } from "../../data/products";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState("Loading products...");
  const [locations, setLocations] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);

  useEffect(() => {
    getProducts()
      .then((data) => {
        if (data) {
        const locationData = [...new Set(data.flatMap( group => group.products).map(product => product.location))]
        const locationObjects = locationData.map(location => ({
          id: location,
          name: location
        }))

        setProducts(data);
        setIsLoading(false);
        setLocations(locationObjects);
      }
    })
    .catch(err => {
      setLoadingMessage(`Unable to retrieve products. Status code ${err.message} on response.`)
    })
  }, [])

  const searchProducts = (event) => {
    console.log("search event:", event)
    setIsFiltered(event !== '')
    getProducts(event).then(productsData => {
      if (productsData) {
        setProducts(productsData);
      }
    });
  };

  if (isLoading) return <p>{loadingMessage}</p>;

  return (
    <>
      <Filter
        productCount={products.length}
        onSearch={searchProducts}
        locations={locations}
      />

      <div className="columns is-multiline">
        {isFiltered ? (
          <div>
            <h2>Products matching filters</h2>
            {products[0].products.map(product => (
              <ProductCard product={product} key={product.id}/>
            ))}
          </div>
        ) : (
          products.map(group => (
            <div key={group.category}>
              <h2>{group.category}</h2>
              {group.products.map(product => (
                <ProductCard product={product} key={product.id}/>
              ))}
            </div>
          ))
        )}
      </div>
    </>
  );
}

Products.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      {page}
    </Layout>
  );
};
