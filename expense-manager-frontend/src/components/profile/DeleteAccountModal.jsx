import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { deleteAccount } from "../../services/userService";
import ConfirmModal from "../ui/ConfirmModal";

export default function DeleteAccountModal({
  isOpen,
  onClose,
}) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);

      const response = await deleteAccount();

      toast.success(response.data.message);

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to delete account."
      );
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <ConfirmModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleDelete}
      title="Delete Account"
      message="This action cannot be undone. All your expenses, categories and profile information will be permanently deleted."
      confirmText="Delete Account"
      cancelText="Cancel"
      color="red"
      loading={loading}
    />
  );
}