import React, {useState} from "react";
import {ProductTable} from "./productTable";
import {SearchBar} from "./searchBar";

//--------------------------------------------------------------------------
function filter (products, categoryFilterText, inStockOnlyFilterFlag)
{
    const filteredByCategory = products
        .filter( product => product.category.toLowerCase()
            .startsWith(categoryFilterText.toLowerCase()));

    if(!inStockOnlyFilterFlag)
        return filteredByCategory
    else
        return filteredByCategory
            .filter(product => product.stocked);
}

//--------------------------------------------------------------------------
export function FilterableProductTable({ products })
{
    console.log("FilterableProductTable", products);

    const [filterText, setFilterText] = useState('');
    const [inStockOnly, setInStockOnly] = useState(false);

    return (
        <div>
            <SearchBar
                filterText = {filterText}
                inStockOnly = {inStockOnly}
                onFilterTextChange = {setFilterText}
                onInStockOnlyChange = {setInStockOnly}
            />
            <ProductTable
                products={filter(products, filterText, inStockOnly)}
            />
        </div>
    );
}