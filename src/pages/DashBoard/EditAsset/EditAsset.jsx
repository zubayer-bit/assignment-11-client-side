import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router";

import Swal from "sweetalert2";
import useAxios from "../../../hooks/useAxios";
import useAxiosSecure from "../../../hooks/useAuthSecure";
import useAuth from "../../../hooks/useAuth";

const EditAsset = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const axios = useAxios();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [asset, setAsset] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [newImageFile, setNewImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  //  load existing asset
  useEffect(() => {
    axiosSecure.get(`/assets/${id}`).then((res) => {
      setAsset(res.data);
      setImagePreview(res.data.productImage);
    });
  }, [id, axiosSecure]);

  const handleUpdateAsset = (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const productName = form.productName.value;
    const companyName = form.companyName.value;
    const productType = form.productType.value;
    const productQuantity = form.productQuantity.value;

    // jodi new image na daoa hoa → old image set korbo
    if (!newImageFile) {
      const updatedAsset = {
        companyName,
        productName,
        productType,
        productQuantity,
        productImage: asset.productImage,
        hrEmail: user.email,
      };

      axiosSecure.patch(`/data/${id}`, updatedAsset).then((res) => {
        //   console.log("after approved:", res.data);
        if (res.data.modifiedCount) {
          //ata dile "status" gulu auto change hobe...karon data gulu "refetch" hoa jacce auto ai code dile

          Swal.fire({
            position: "center",
            icon: "success",
            title: `Asset updated successfully.`,
            showConfirmButton: false,
            timer: 1500,
          });
          navigate(-1);
        }
      });

      return;
    }

    //  new image upload
    const formData = new FormData();
    formData.append("image", newImageFile);

    const image_API_URL = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_image_host_KEY
    }`;

    axios.post(image_API_URL, formData).then((res) => {
      const imageUrl = res.data.data.url;

      const updatedAsset = {
        companyName,
        productName,
        productType,
        productQuantity,
        productImage: imageUrl,
        hrEmail: user.email,
      };

      axiosSecure.patch(`/data/${id}`, updatedAsset).then((res) => {
        //   console.log("after approved:", res.data);
        if (res.data.modifiedCount) {
          //ata dile "status" gulu auto change hobe...karon data gulu "refetch" hoa jacce auto ai code dile

          Swal.fire({
            position: "center",
            icon: "success",
            title: `Asset updated successfully.`,
            showConfirmButton: false,
            timer: 1500,
          });
          navigate(-1);
        }
      });
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImageFile(file);
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  if (!asset) return <p className="text-center mt-10">Loading...</p>;

  return (
    <motion.div
      className="max-w-4xl mx-auto p-6 bg-base-100 rounded-lg shadow-lg mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-3xl font-bold mb-6 text-primary">Edit Asset</h2>

      <form onSubmit={handleUpdateAsset} className="space-y-4">
        {/* Company */}
        <div>
          <label className="label">
            <span className="label-text text-secondary">Company Name</span>
          </label>
          <input
            type="text"
            name="companyName"
            defaultValue={asset.companyName}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Product */}
        <div>
          <label className="label">
            <span className="label-text text-secondary">Product Name</span>
          </label>
          <input
            type="text"
            name="productName"
            defaultValue={asset.productName}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Type */}
        <div>
          <label className="label">
            <span className="label-text text-secondary">Product Type</span>
          </label>
          <select
            name="productType"
            defaultValue={asset.productType}
            className="select select-bordered w-full"
          >
            <option value="Returnable">Returnable</option>
            <option value="Non-returnable">Non-returnable</option>
          </select>
        </div>

        {/* Quantity */}
        <div>
          <label className="label">
            <span className="label-text text-secondary">Quantity</span>
          </label>
          <input
            type="number"
            name="productQuantity"
            defaultValue={asset.productQuantity}
            className="input input-bordered w-full"
            min={1}
            required
          />
        </div>

        {/* Image */}
        <div>
          <label className="label">
            <span className="label-text text-secondary">
              Product Image (optional)
            </span>
          </label>
          <input
            type="file"
            className="file-input file-input-bordered w-full"
            onChange={handleImageChange}
          />

          {imagePreview && (
            <img
              src={imagePreview}
              alt="preview"
              className="mt-3 w-32 h-32 object-cover rounded"
            />
          )}
        </div>

        <motion.button
          disabled={loading}
          whileHover={!loading ? { scale: 1.05 } : {}}
          whileTap={!loading ? { scale: 0.95 } : {}}
          transition={{ type: "spring", stiffness: 300 }}
          className="btn btn-primary w-full mt-4 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Updating..." : "Update Asset"}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default EditAsset;
