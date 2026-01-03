import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAuthSecure";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";

const RequestAsset = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedAsset, setSelectedAsset] = useState(null);

  //request ar button conditional korar jonno state declare:
  //    const [requestButtonStatus, setRequestButtonStatus] = useState(null);
  const [note, setNote] = useState("");
  const { user } = useAuth();

  //request asset page aa available asset gulu load kora holo:
  const {
    data: assets = [],

    // isFetching,
  } = useQuery({
    queryKey: ["assets"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/asset/available`);

      //   setLoading(false);
      return res.data;
    },
  });

  //1:request button conitional korar jonno "requestCollection" theke data get kora holo:
  const { data: requestCollectionData = [], refetch } = useQuery({
    queryKey: ["asset-requests", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/requests-status?email=${user.email}`);
      return res.data;
    },
  });
  //2:
  //old vabe status get
  // const getRequestStatusByAssetId = (requestAssetId) => {
  //   const request = requestCollectionData.find(
  //     (req) => req.assetId === requestAssetId
  //   );

  //   //ame only "requestStatus" return korbo jodi request thake,na thakle null return korbo
  //   return request?.requestStatus || null;
  // };

  //new vabe status get:
  const getRequestStatusByAssetId = (requestAssetId) => {
  const requests = requestCollectionData.filter(
    (req) => req.assetId === requestAssetId
  );

  if (requests.length === 0) return null;

  const latestRequest = requests.reduce((latest, current) => {
    return new Date(current.requestDate) > new Date(latest.requestDate)
      ? current
      : latest;
  });

  return latestRequest.requestStatus || null;
};

  //3:

  //  Submit asset request function handler:
  const handleRequest = () => {
    if (!note.trim()) {
      return Swal.fire({
        icon: "warning",
        title: "Note is required",
      });
    }

    const requestData = {
      assetId: selectedAsset._id,

      assetName: selectedAsset.productName,
      assetType: selectedAsset.productType,
      requesterName: user.displayName,
      requesterEmail: user.email,
      hrEmail: selectedAsset.hrEmail,
      companyName: selectedAsset.companyName,
      note,
    };

    axiosSecure.post("/asset-requests", requestData).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Request Sent",
          timer: 1500,
          showConfirmButton: false,
        });
        setSelectedAsset(null);
        setNote("");
        //jokhn data post korbo tokhn "refetch" call kore dibo jate kore notun request ar data guluo load hoa jai
        refetch();
      }
    });
  };

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-3xl font-semibold text-primary mb-6">
        Request Company Assets
      </h2>

      {/*  Asset Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {assets.map((asset) => {
          // 3: Get request status for the current asset
          const status = getRequestStatusByAssetId(asset._id);
          return (
            <motion.div
              key={asset._id}
              whileHover={{ scale: 1.03 }}
              className="card bg-base-100 shadow-md"
            >
              <figure className="px-4 pt-4">
                <img
                  src={asset.productImage}
                  alt={asset.productName}
                  className="h-40 w-full  rounded-lg"
                />
              </figure>

              <div className="card-body">
                <h3 className="text-lg font-semibold text-primary">
                  {asset.productName}
                </h3>

                <p className="text-secondary text-sm">
                  Type:
                  <span className="ml-1 font-medium">{asset.productType}</span>
                </p>

                <p className="text-secondary text-sm">
                  Available Quantity:
                  <span className="ml-1 font-semibold text-green-600">
                    {asset.availableQuantity}
                  </span>
                </p>

                {/*4: request button condition */}
                {status === "pending" && (
                  <button className="btn btn-warning btn-sm" disabled>
                    Requested
                  </button>
                )}

                {status === "approved" &&
                  (asset.availableQuantity > 0 ? (
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => setSelectedAsset(asset)}
                    >
                      Request Again
                    </button>
                  ) : (
                    <button className="btn btn-warning btn-sm" disabled>
                      Approved
                    </button>
                  ))}

                {/* {status === "approved" && (
                  <button className="btn btn-warning btn-sm" disabled>
                    Approved
                  </button>
                )} */}

                {status === "rejected" && (
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => setSelectedAsset(asset)}
                  >
                    Request Again
                  </button>
                )}
                {status === "returned" && (
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => setSelectedAsset(asset)}
                  >
                    Request Again
                  </button>
                )}
             

                {!status && (
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => setSelectedAsset(asset)}
                  >
                    Request
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/*  Request Modal */}
      {selectedAsset && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg text-primary mb-2">
              Request: {selectedAsset.productName}
            </h3>

            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Write a note (why you need this asset)"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            ></textarea>

            <div className="modal-action">
              <button
                className="btn btn-outline"
                onClick={() => setSelectedAsset(null)}
              >
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleRequest}>
                Submit Request
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default RequestAsset;
