import { initMongoose } from "@/lib/mongoose";
import { useContext, useState } from "react"
import { findAllProducts } from "./api/jackets";
import Layout from "@/components/Layout";
import { ProductsContext } from "@/components/ProductsContext";

export default function Home({products}) {
  const [phrase,setPhrase] = useState('');

  if (phrase) {
    products = products.filter(product => product.name.toLowerCase().includes(phrase));
  } 
  const {setSelectedProducts} = useContext(ProductsContext);
  function addProduct(productId) {
    setSelectedProducts(prev => [...prev, productId]);
  }
  return (
    <Layout>
      <input value={phrase} onChange={e => setPhrase(e.target.value)} type="text" placeholder="Search for jackets by color..." className="bg-gray-100 w-full py-2 px-4 rounded-xl"/>
      <h2 className="text-2xl">Jackets</h2>
      <div className="flex -mx-5 overflow-x-scroll snap-x scrollbar-hide">
        {products.map((product) => (
          <div className="py-4 px-5 snap-start">
            {/* div for each jacket */}
            <div key={product} className="w-44">
              <div className="bg-blue-100 p-5 rounded-xl">
                <img src={product.picture} alt=""/>
              </div>
              <div className="mt-2">
                <h3 className="font-bold text-lg capitalize">{product.name}</h3>
              </div>
              <p className="text-sm mt-1 leading-4 text-gray-600">{product.description}</p>
              <div className="flex mt-1">
                <div className="text-lg font-bold grow">KES:{product.price}</div>
                <button onClick={() => addProduct(product._id)} className="bg-emerald-400 text-white py-1 px-3 rounded-xl">+</button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </Layout>
  )
}

export async function getServerSideProps() {
  await initMongoose();
  const products = await findAllProducts();
  // console.log("Fetched products:", products);
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    }
  };
}
