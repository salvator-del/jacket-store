import Layout from "@/components/Layout";
import { ProductsContext } from "@/components/ProductsContext";
import { useContext, useEffect, useState } from "react";

export default function CheckoutPage() {
    const {selectedProducts,setSelectedProducts} = useContext(ProductsContext);
    const [productsInfos,setProductsInfos] = useState([]);
    // Fetching the products information when the page is loaded.
    useEffect(() => {
        const uniqIds = [...new Set(selectedProducts)];
        fetch(`/api/jackets?ids=` + uniqIds.join(','))
        .then(response => {
            // console.log(response);
            return response.json();
        })
        .then(json => {
            console.log(json);
            setProductsInfos(json);
        });
    }, [selectedProducts]);

    function moreOfThisProduct(id) {
        setSelectedProducts(prev => [...prev,id]);
    }
    function lessOfThisProduct(id) {
        const pos = selectedProducts.indexOf(id);
        if (pos !== -1) {
            setSelectedProducts( prev => {
                return prev.filter((value,index) => index !== pos);
            });
        }
    }

    return (
        <Layout>
            {!productsInfos.length && (
                <div>no products in your shopping cart</div>
            )}
            {productsInfos.length && productsInfos.map(productInfo => {
                return (
                    <div className="flex mb-5" key={productInfo._id}>
                        <div className="bg-gray-100 p-3 rounded-xl shrink-0">
                            <img className="w-24" src={productInfo.picture} alt=""/>
                        </div>
                        <div className="pl-4">
                            <h3 className="font-bold text-lg">{productInfo.name}</h3>
                            <p className="text-sm leading-4 text-gray-600">{productInfo.description}</p>
                            <div className="flex mt-2">
                                <div className="grow font-semibold">KES:{productInfo.price}</div>
                                <div>
                                    <button onClick={() => lessOfThisProduct(productInfo._id)} className="bg-emerald-500 px-2 rounded-lg text-white">-</button>
                                    <span className="px-2">
                                        {selectedProducts.filter(id => id === productInfo._id).length}
                                    </span>
                                    <button onClick={() => moreOfThisProduct(productInfo._id)} className="bg-emerald-500 px-2 rounded-lg text-white">+</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </Layout>
    );
}