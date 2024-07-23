import { Pagination } from "@mui/material";
import React, {
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateProductMutation,
  useGetAllProductsMutation,
} from "../../../services/apiList/productApi";
import * as numeral from "numeral";

const ProductPage = () => {
  const navigate = useNavigate();

  const [fetchProduct] = useGetAllProductsMutation();
  const [fetchCreateProduct] = useCreateProductMutation();

  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(12);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [rows, setRows] = useState<any[]>([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    setPerPage(12);
    setTotalPages(0);
    setSearchText("");
    getProducts();
  }, []);

  const getProducts = async () => {
    let _page = page - 1;
    try {
      const products = await fetchProduct({
        page: _page,
        size: perPage,
        search: searchText,
      }).unwrap();

      console.log(products);

      setTotalItems(products.totalItems);
      setTotalPages(products.totalPages);
      setRows(products.result);

      console.log(products);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const keyEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      searchProduct();
    }
  };

  const searchProduct = () => {
    getProducts();
  };

  const addProduct = () => {
    navigate("/product/new");
  };

  useMemo(getProducts, [page]);

  return (
    <div className="bg-white">
      <div>
        <div className="pb-4">
          <button
            className="btn btn-primary w-full sm:w-3/6 lg:w-1/4 xl:w-1/5 text-base"
            onClick={() => addProduct()}
          >
            Tambah Produk
          </button>
        </div>
        <div>
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              className="grow"
              placeholder="Search"
              onKeyUp={keyEnter}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70 cursor-pointer"
              onClick={() => searchProduct()}
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {rows.map((item: any) => (
            <div key={item.id} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md border-2 border-gray-300 bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  alt="Front of men's Basic Tee in black."
                  src={item?.product_varians[0]?.imageLocation}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {item?.name}
                    </a>
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Pagination
        count={totalPages}
        page={page}
        onChange={handleChange}
        className="flex justify-center"
        color="secondary"
      />
    </div>
  );
};

export default ProductPage;
