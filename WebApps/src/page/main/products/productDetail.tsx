import {
  Autocomplete,
  Button,
  DialogActions,
  FormControlLabel,
  Grid,
  Switch,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useGetCategoryOptionMutation } from "../../../services/apiList/categoryApi";
import { CustomizableDialog } from "../../../components/customDialog";
import {
  toBase64,
  uploadSingleDocument,
  validate,
} from "../../../services/utils.service";
import { ErrorAlert, InfoAlert, SuccessAlert } from "../../../components/alert";
import defaultImage from "../../../assets/image.png";
import { useCreateProductMutation } from "../../../services/apiList/productApi";
import { useLocation, useNavigate } from "react-router-dom";

const ProductDetailPage = () => {
  const [fetcCategory] = useGetCategoryOptionMutation();
  const [fetchCreateProuct] = useCreateProductMutation();
  const [categoryList, setCategoryList] = useState<any[]>([]);
  const [openDialog, setOPenDialog] = useState<boolean>(false);

  const [productVariantList, setProductVariantList] = useState<any[]>([]);
  const [imageSelected, setImageSelected] = useState({
    file: undefined,
    base64: "",
  });

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    getCategory();
    setProductVariantList([]);
    setImageSelected({
      file: undefined,
      base64: "",
    });
  }, []);

  const getCategory = async () => {
    try {
      const category = await fetcCategory({}).unwrap();
      setCategoryList(
        category &&
          category.map((item: any) => {
            return {
              ...item,
              label: item?.name,
            };
          })
      );
    } catch (error) {}
  };

  const productForm = useFormik({
    initialValues: {
      plu: "",
      name: "",
      productCategoryId: "",
      active: true,
    },
    validationSchema: Yup.object({
      plu: Yup.string().required(),
      name: Yup.string().required(),
      productCategoryId: Yup.string().required(),
      active: Yup.boolean().required(),
    }),
    onSubmit: (values) => {},
  });

  const productVarianForm = useFormik({
    initialValues: {
      code: "",
      name: "",
      qty: 0,
      price: 0,
      active: true,
    },
    validationSchema: Yup.object({
      code: Yup.string().required(),
      qty: Yup.number().required(),
      price: Yup.number().required(),
      active: Yup.boolean().required(),
    }),
    onSubmit: (values) => {},
  });

  const addProduct = async () => {
    try {
      if (
        productForm.values.name === "" ||
        productForm.values.plu === "" ||
        productForm.values.productCategoryId === "" ||
        productVariantList.length === 0
      ) {
        return;
      }
      let productVariant = productVariantList.map((item) => {
        return {
          ...item,
          imageLocation: "",
        };
      });
      let _productVariant: any[] = [];

      for (let i = 0; i < productVariant.length; i++) {
        let formData = new FormData();
        formData.append("file", productVariant[i].image.file);
        const fetchData = await uploadSingleDocument(formData, "products");
        let _data = {
          ...productVariant[i],
          imageLocation: fetchData.url,
        };
        delete _data.image;
        _productVariant.push(_data);

        if (i === productVariant.length - 1) {
          let data = {
            product: {
              ...productForm.values,
              productCategoryId: productForm.values.productCategoryId as any,
            },
            productVariant: _productVariant,
          };
          data.product.productCategoryId = data.product.productCategoryId.id;

          await fetchCreateProuct({ ...data }).unwrap();
          SuccessAlert(3000, "berhasil menambah produk");

          navigate(-1);
        }
      }
    } catch (error) {
      ErrorAlert(
        300,
        "Ada kesalahan saat menambah data produk. Harap ulangi beberapa saat lagi."
      );
    }
  };

  const addProductVariant = () => {
    const _productVarianForm = [...productVariantList];
    _productVarianForm.push({
      ...productVarianForm.values,
      image: {
        file: imageSelected.file,
        base64: imageSelected.base64,
      },
    });

    setProductVariantList(_productVarianForm);
    handleCloseDialog();
  };

  const deleteProductVarian = (item: any) => {
    const update = productVariantList.filter((e) => e.code !== item.code);
    setProductVariantList(update);
  };

  const handleOpenDialog = () => {
    setImageSelected({
      file: undefined,
      base64: "",
    });
    productVarianForm.resetForm();
    setOPenDialog(true);
  };

  const handleCloseDialog = () => {
    setOPenDialog(false);
  };

  const selectedCategory = (value: any) => {
    productForm.setFieldValue("productCategoryId", value);
  };

  function changePicture(value: any) {
    if (!value) {
      return;
    }

    let file: File = value?.item(0);
    setImageSelected({
      file: undefined,
      base64: "",
    });
    let validateImage = validate(file, 1024);
    if (validateImage !== "") {
      InfoAlert(3000, validateImage);
      return;
    }
    toBase64(file).then((result: any) => {
      setImageSelected({
        file: file as any,
        base64: result,
      });
    });
  }

  return (
    <>
      <div className="card w-full shadow-xl border-2 border-gray-300 mb-6">
        <div className="card-body">
          <div className="flex justify-between mb-10">
            <div className="text-4xl font-bold">Produk</div>
            <div>
              <Button
                onClick={() => addProduct()}
                variant="contained"
                disableElevation
                sx={{
                  backgroundColor: "#61677A",
                  color: "#ffffff",
                  borderRadius: "5px",
                  "&:hover": {
                    backgroundColor: "#ADC4CE",
                  },
                  textTransform: "capitalize",
                }}
              >
                tambah produk
              </Button>
            </div>
          </div>

          <div className="card-title" style={{ textTransform: "capitalize" }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4} lg={4} xl={4}>
                <TextField
                  id="plu"
                  name="plu"
                  label="plu"
                  variant="outlined"
                  fullWidth
                  value={productForm.values.plu}
                  onChange={productForm.handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={4} lg={4} xl={4}>
                <TextField
                  id="name"
                  name="name"
                  label="nama"
                  variant="outlined"
                  fullWidth
                  value={productForm.values.name}
                  onChange={productForm.handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={4} lg={4} xl={4}>
                <div>
                  <Autocomplete
                    disablePortal
                    options={categoryList}
                    renderInput={(params) => (
                      <TextField
                        key={params.id}
                        {...params}
                        variant="outlined"
                        label="kategori"
                        name="productCategoryId"
                        id="productCategoryId"
                        placeholder="kategori"
                      />
                    )}
                    onChange={(e, value) => selectedCategory(value)}
                    value={productForm.values.productCategoryId}
                  />
                </div>
              </Grid>
              <Grid item>
                <FormControlLabel
                  control={
                    <Switch
                      id="active"
                      name="name"
                      defaultChecked={productForm.values.active}
                      onChange={productForm.handleChange}
                    />
                  }
                  label="aktif"
                />
              </Grid>
            </Grid>
          </div>

          <div>
            <Button
              onClick={() => handleOpenDialog()}
              variant="contained"
              disableElevation
              sx={{
                backgroundColor: "#61677A",
                color: "#ffffff",
                borderRadius: "5px",
                "&:hover": {
                  backgroundColor: "#ADC4CE",
                },
                textTransform: "capitalize",
              }}
            >
              tambah varian
            </Button>
          </div>

          <div className="mt-10 mb-10">
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {productVariantList.map((item: any) => (
                <div key={item.id} className="group relative">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md border-2 border-gray-300 bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                    <img
                      alt="Front of men's Basic Tee in black."
                      src={item.image.base64 ?? defaultImage}
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                  </div>
                  <div>
                    <Button
                      onClick={() => deleteProductVarian(item)}
                      variant="contained"
                      disableElevation
                      fullWidth
                      sx={{
                        backgroundColor: "#61677A",
                        color: "#ffffff",
                        borderRadius: "5px",
                        "&:hover": {
                          backgroundColor: "#ADC4CE",
                        },
                        textTransform: "capitalize",
                      }}
                    >
                      hapus
                    </Button>
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="font-bold text-gray-900 text-start">
                        <a>
                          <span
                            aria-hidden="true"
                            className="absolute inset-0 font-bold"
                          />
                          {item?.name}
                        </a>
                      </h3>
                    </div>
                    <p className="font-bold text-gray-900 text-end">
                      {item.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <CustomizableDialog
        open={openDialog}
        onClose={handleCloseDialog}
        dialogSize="md"
        title={"Produk Varian"}
      >
        <div className="mb-10">
          <div className="card-title" style={{ textTransform: "capitalize" }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} lg={6} xl={6}>
                <TextField
                  id="code"
                  name="code"
                  label="kode"
                  variant="outlined"
                  fullWidth
                  value={productVarianForm.values.code}
                  onChange={productVarianForm.handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6} lg={6} xl={6}>
                <TextField
                  id="name"
                  name="name"
                  label="nama"
                  variant="outlined"
                  fullWidth
                  value={productVarianForm.values.name}
                  onChange={productVarianForm.handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6} lg={6} xl={6}>
                <TextField
                  id="qty"
                  name="qty"
                  label="QTY"
                  variant="outlined"
                  fullWidth
                  value={productVarianForm.values.qty}
                  onChange={productVarianForm.handleChange}
                  type="tel"
                />
              </Grid>
              <Grid item xs={12} sm={6} lg={6} xl={6}>
                <TextField
                  id="price"
                  name="price"
                  label="harga"
                  variant="outlined"
                  fullWidth
                  value={productVarianForm.values.price}
                  onChange={productVarianForm.handleChange}
                  type="tel"
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  control={
                    <Switch
                      id="active"
                      name="name"
                      defaultChecked={productForm.values.active}
                      onChange={productForm.handleChange}
                    />
                  }
                  label="aktif"
                />
              </Grid>
            </Grid>
          </div>
          <div className="flex justify-center">
            <label>
              <input
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                onChange={(e) => changePicture(e.target.files)}
                hidden
              />
              <img
                src={imageSelected.base64 ? imageSelected.base64 : defaultImage}
                alt="photo"
                className="w-60 h-60 relative"
              ></img>
            </label>
          </div>
        </div>

        <DialogActions>
          <Button
            onClick={handleCloseDialog}
            variant="contained"
            disableElevation
            sx={{
              backgroundColor: "#61677A",
              color: "#ffffff",
              borderRadius: "5px",
              "&:hover": {
                backgroundColor: "#ADC4CE",
              },
              textTransform: "capitalize",
            }}
          >
            Batal
          </Button>
          <Button
            onClick={() => addProductVariant()}
            variant="contained"
            disableElevation
            sx={{
              backgroundColor: "#00008f",
              "&:hover": {
                backgroundColor: "#1F6E8C",
              },
              textTransform: "capitalize",
            }}
          >
            tambah varian
          </Button>
        </DialogActions>
      </CustomizableDialog>
    </>
  );
};

export default ProductDetailPage;
