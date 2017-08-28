# React Product Gallery

For this demo project, you will build a product gallery using React. The finished product should look visually
 similar to that of the provided mock ups as well as satisfy the requirements described the in the specs. 
 
- The project consists of 2 primary screens: "Product Listing" and "Product Details".
- The required JSON data is provided for you. See `src/data.js`.
- You will not have to implement any HTTP requests to fetch the data. You may read the data directly from `src/data.js`.
- The project should be completed in roughly 4 hours (i.e. a single evening).
- Submit the project via email upon completion, providing a link to your project repository.

## Instructions

This project is based around [create-react-app](https://github.com/facebookincubator/create-react-app#create-react-app)
 which means you don't have to worry about setting up any dependencies, build steps, boilerplate, etc...
 For additional information/instructions specific to `create-react-app` see https://github.com/facebookincubator/create-react-app#create-react-app-

- Clone this repo via `git@github.com:practicegenius/react-product-gallery.git`
- `cd react-product-gallery` and install dependencies via `yarn install`
- Execute `yarn start` to begin the development server.
- You should be able to reach the project at http://localhost:3000/

_*`yarn` is interchangable with `npm` throughout these instructions_

### Screen 01: Product Listing

_This screen displays a listing of products along with various search/filter controls._

TODO: Image here...

**Display Products**

Display the appropriate products based on the current search and filter criteria.

Each product in the listing should be clickable to view the Product Details screen for that product.

**Search Products**

Search products via the text search input... 

**Filter by Category**

Filter products by category via the sidebar.

**Filter by Price**
 
Filter products by min price and max price. Both fields being optional.

### Screen 02: Product Details

_This screen displays more detailed information about a single product._

TODO: Image here...

### _*Bonus Feature_

Select one bonus feature to implement:
- Add sorting options (e.g. sort by price lowest/highest).
- Add alternative Product Listing view (e.g. List view)
- Add to cart and display sub-total.
- Paginate items.
- Add tests.
- Add a "Related Products" section to the Product Details page.
- Animate transitions between screens.
- _TODO: More/better ideas here! Also, remove the bad ideas._
