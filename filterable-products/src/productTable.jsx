import React from "react";
import {ProductCategoryRow} from "./productCategoryRow";
import {ProductRow} from "./productRow";

//--------------------------------------------------------------------------
function populateRows(products)
{
    const rows = [];
    let lastCategory = null;

    products.forEach((product) => {
        if (product.category !== lastCategory) {
            rows.push(
                <ProductCategoryRow
                    category={product.category}
                    key={product.category}
                />
            );
        }
        rows.push(
            <ProductRow
                product={product}
                key={product.name}
            />
        );
        lastCategory = product.category;
    });

    return rows;
}

//--------------------------------------------------------------------------
export function ProductTable({ products })
{
    return (
        <table>
            <thead>
            <tr>
                <th>Name</th>
                <th>Price</th>
            </tr>
            </thead>
            <tbody>{populateRows(products)}</tbody>
        </table>
    );
}