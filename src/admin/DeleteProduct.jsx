import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

const DeleteProduct = ({ productId, productName, onDelete }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${productName}?`
    );


    if(!confirmDelete) return;


    try {

      setLoading(true);


      await API.delete(`/products/${productId}`);


      alert("Product Deleted Successfully");


      if(onDelete){
        onDelete(productId);
      }
      else{
        navigate("/admin/dashboard");
      }


    } catch(err){

      alert(
        err.response?.data?.message ||
        "Delete failed"
      );

    }
    finally{

      setLoading(false);

    }

  };


  return (

    <button

      onClick={handleDelete}

      disabled={loading}

      className="bg-red-600 text-white px-5 py-2 rounded-xl font-semibold hover:bg-red-700 transition disabled:opacity-50"

    >

      {
        loading
        ?
        "Deleting..."
        :
        "Delete"
      }

    </button>

  );

};
export default DeleteProduct;