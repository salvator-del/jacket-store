import { createContext } from "react";
import useLocalStorageState from "use-local-storage-state";

// intended to manage and share the state related to selectedProducts across components
export const ProductsContext = createContext({});

//Wrapper that provides the context value to its children
export function ProductsContextProvider({children}) {
    //using local storage for persistence of data, so it will be available even after refreshing
    const [selectedProducts,setSelectedProducts] = useLocalStorageState('cart', {defaultValue:[]});

    // selectedProducts state and its updater function are provided as values to the ProductsContext
    // This makes these values accessible to any component that subscribes to this context
    return (
        <ProductsContext.Provider value={{selectedProducts,setSelectedProducts}}>{children}</ProductsContext.Provider>
    );
}