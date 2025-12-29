import React, { useState } from "react";
import { motion } from "framer-motion";
import useAxios from "../../../hooks/useAxios";
import useAxiosSecure from "../../../hooks/useAuthSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const AddAsset = () => {
  const [imagePreview, setImagePreview] = useState(null);

  const axios = useAxios();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const handleAddAsset = (e) => {
    e.preventDefault();
    const form = e.target;
    const productName = form.productName.value;
    const companyName = form.companyName.value;
    const productType = form.productType.value;
    const productQuantity = form.productQuantity.value;
    const productImage = form.productImage.files[0];

    //new---(start)
    const formData = new FormData();
    formData.append("image", productImage);
    const image_API_URL = `https://api.imgbb.com/1/upload?expiration=600&key=${
      import.meta.env.VITE_image_host_KEY
    }`;
    axios.post(image_API_URL, formData).then((res) => {
      console.log("image url after axios post:", res.data.data.url);
      const productImage = res.data.data.url;
      // এখানে asset submit logic হবে, যেমন axios post
      console.log({
        companyName,
        productName,
        productType,
        productQuantity,
        productImage,
      });

      //data "assetCollection" aa post kora hocce:---(start)
      const assetsData = {
        companyName,
        productName,
        productType,
        productQuantity,
        productImage,
        hrEmail: user.email,
      };
      axiosSecure.post("/assets", assetsData).then((res) => {
        //data jodi post hoa tahole "insertedId" paoa jai
        if (res.data.insertedId) {
          console.log("assets created in assets collection data base");

          //alert:
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Asset Added Successfully",
            showConfirmButton: false,
            timer: 1500,
          });

          //form reset
          form.reset();
          setImagePreview(null);
        }
      });
    });
    //data "assetCollection" aa post kora hocce:---(end)

    //new---(end)
  };

  const handleImageChange = (e) => {
    //1: image ta file ar index[0] ar moddhe thake,tai "file[0]" select kora hoice
    const file = e.target.files[0];

    //2: jodi file paoa jai tahole ai khane asbe
    if (file) {
      //3: ai "new FileReader()" akti object make kore,ar kaj holo amr upload kora file ke se "JavaScript" aa read kore dite pare...tai ata set korlam
      const reader = new FileReader(); //ai line ta korle akti "reader" make hoa

      //5:onload event set korlam..."reader" jokhon upload kora file "read" kora ses korbe...tokhn line "active" hobe...ai line ta " reader.readAsDataURL(file);" ai line ar agei set korte hobe
      //"reader.onload" ai part ar kaj hocce jokhon "reader" file read kora ses korbe tokhn ---->setImagePreview(reader.result); ai kaj ta korte bole
      //"reader.result" ar moddhe "url" ta thake...seta "setImagePreview" ar moddhe add korlam
      reader.onload = () => setImagePreview(reader.result);

      //4:ai line aa je "reader" ame make korci...oi reader ar vitore "upload-file" ta dilam...
      //ai file ke se "URL" aa convert korbe...then step:5
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  return (
    <motion.div
      className="max-w-4xl mx-auto p-6 bg-base-100 rounded-lg shadow-lg mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold mb-6 text-primary">Add New Asset</h2>

      <form onSubmit={handleAddAsset} className="space-y-4">
        {/* company name */}
        <div>
          <label className="label">
            <span className="label-text text-secondary">Company Name</span>
          </label>
          <input
            type="text"
            name="companyName"
            placeholder="Enter company name"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/*  product Name */}
        <div>
          <label className="label">
            <span className="label-text text-secondary"> Product Name</span>
          </label>
          <input
            type="text"
            name="productName"
            placeholder="Enter Product Name"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* product type */}
        <div>
          <label className="label">
            <span className="label-text text-secondary">Product Type</span>
          </label>
          <select
            name="productType"
            className="select select-bordered w-full"
            required
          >
            <option disabled selected>
              Select Product Type
            </option>
            <option value="Returnable">Returnable</option>
            <option value="Non-returnable">Non-returnable</option>
          </select>
        </div>

        {/* product Quantity */}
        <div>
          <label className="label">
            <span className="label-text text-secondary">Product Quantity</span>
          </label>
          <input
            type="number"
            name="productQuantity"
            placeholder="Product Quantity"
            className="input input-bordered w-full"
            min={1}
            required
          />
        </div>

      

        {/* Product Image */}
        <div>
          <label className="label">
            <span className="label-text text-secondary">Product Image</span>
          </label>
          <input
            type="file"
            name="productImage"
            accept="image/*"
            className="file-input file-input-bordered w-full"
            onChange={handleImageChange}
          />
          {/* ame jokhn image select korbo seta screen aa preview hisebe show korar code */}
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-2 w-32 h-32 object-cover rounded"
            />
          )}
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          className="btn btn-primary w-full mt-4"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Add Asset
        </motion.button>
      </form>
    </motion.div>
  );
};

export default AddAsset;
