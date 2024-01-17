import Footer from "./Footer";

// Functional component that takes in a single prop 'children'
// 'children' is a special prop that represents the content between the opening and closing tags of a component
export default function Layout({children}) {
    // renders a JSX structure.
    // consists of a 'div' element that contains two nested elements.
    return (
        <div>
            {/* div wraps around the 'children' prop, representing the main content of the layout  */}
            <div className="p-5">
                {children}
            </div>
            {/* component responsible for rendering information or links at the bottom of the page */}
            <Footer/>
        </div>
    );
}