import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";

import DataTable from "react-data-table-component";
import {
  useCreateCategoryMutation,
  useGetAllCategoriesMutation,
  useUpdateCategoryMutation,
} from "../../../services/apiList/categoryApi";
import { Button, DialogActions, Pagination, TextField } from "@mui/material";
import { CustomizableDialog } from "../../../components/customDialog";
import { ErrorAlert, InfoAlert, SuccessAlert } from "../../../components/alert";
import { useSelector } from "react-redux";

const CategoryPage = () => {
  const [fetcCategory] = useGetAllCategoriesMutation();
  const [fetchAddCategory] = useCreateCategoryMutation();
  const [fetchUpdateCategory] = useUpdateCategoryMutation();
  const [page, setPage] = useState<number>(0);
  const [perPage, setPerPage] = useState<number>(10);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [rows, setRows] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const handleChange = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const [openDialog, setOpenDialog] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [pageType, setPageType] = useState<string>("new");

  const [categoryId, setCategoryId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const user = useSelector((state: any) => state.auth.authentication);

  useEffect(() => {
    setPerPage(10);
    setSearchText("");
    getCategories();
    setName("");
  }, []);

  const getCategories = async () => {
    try {
      const categories = await fetcCategory({
        page: page,
        size: perPage,
        search: searchText,
      }).unwrap();
      console.log(categories);
      setRows(categories.result);
      setTotalItems(categories.totalItems);
      setTotalPages(categories.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  const addCategory = async () => {
    try {
      if (name === "" || name === undefined || name === null) {
        return InfoAlert(3000, "nama kategory harus di isi");
      }

      await fetchAddCategory({
        name: name,
        createdUser: user.id,
        createdDate: new Date(),
      });

      SuccessAlert(3000, "berhasi menambah kategori");
      handleClose();
      getCategories();
    } catch (error) {
      ErrorAlert(3000, "Ada kesalahan. Mohon ulangi beberapa saat lagi.");
    }
  };

  const updateCategory = async () => {
    try {
      if (name === "" || name === undefined || name === null) {
        return InfoAlert(3000, "nama kategory harus di isi");
      }

      await fetchUpdateCategory({
        id: categoryId,
        data: {
          name: name,
          updatedUser: user.id,
          updatedDate: new Date(),
        },
      });

      SuccessAlert(3000, "berhasi memperbarui kategori");
      handleClose();
      getCategories();
    } catch (error) {
      ErrorAlert(3000, "Ada kesalahan. Mohon ulangi beberapa saat lagi.");
    }
  };

  const keyEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      searchCategory();
    }
  };

  const searchCategory = () => {
    getCategories();
  };

  const handleOpen = (type: "new" | "edit", data: any) => {
    if (type === "edit") {
      setCategoryId(data.id);
      setName(data.name);
    }

    setPageType(type);
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <div>
      <div className="pb-6">
        <div className="pb-4">
          <button
            className="btn btn-primary w-full sm:w-3/6 lg:w-1/4 xl:w-1/5 text-base"
            onClick={() => handleOpen("new", null)}
          >
            Tambah Kategori
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
              onClick={() => searchCategory()}
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </div>
      </div>

      {rows.map((item, index) => (
        <div
          className="card w-full shadow-xl bg-cyan-300 mb-6"
          key={index}
          onClick={() => handleOpen("edit", item)}
        >
          <div className="card-body">
            <h2 className="card-title" style={{ textTransform: "capitalize" }}>
              {item.name}
            </h2>
          </div>
        </div>
      ))}

      <Pagination
        count={totalPages}
        page={page}
        onChange={handleChange}
        className="flex justify-center pt-10"
      />

      <CustomizableDialog
        open={openDialog}
        onClose={handleClose}
        dialogSize="md"
        title={"Kategori Produk"}
      >
        <div className="mb-10">
          <TextField
            fullWidth
            required
            id="outlined-required"
            label="Nama"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <DialogActions>
          <Button
            onClick={handleClose}
            variant="contained"
            disableElevation
            sx={{
              backgroundColor: "#61677A",
              color: "#ffffff",
              borderRadius: "5px",
              "&:hover": {
                backgroundColor: "#ADC4CE",
              },
            }}
          >
            Batal
          </Button>
          <Button
            onClick={() =>
              pageType === "new" ? addCategory() : updateCategory()
            }
            variant="contained"
            disableElevation
            sx={{
              backgroundColor: "#00008f",
              "&:hover": {
                backgroundColor: "#1F6E8C",
              },
            }}
          >
            {pageType === "new" ? "Tambah" : "Simpan"}
          </Button>
        </DialogActions>
      </CustomizableDialog>
    </div>
  );
};

export default CategoryPage;
