import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import Input from "../forms/Input";
import { updateProfile } from "../../services/userService";

export default function EditProfileModal({
  isOpen,
  onClose,
  user,
  onSuccess,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        phone: user.phone,
        profession: user.profession,
      });
    }
  }, [user, reset]);

  if (!isOpen) return null;

  const onSubmit = async (data) => {
    try {
      const response = await updateProfile(data);

      toast.success(response.data.message);

      onSuccess();
      onClose();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update profile."
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl w-full max-w-lg p-6">

        <h2 className="text-2xl font-bold mb-6">
          Edit Profile
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>

          <Input
            label="Name"
            register={register("name", {
              required: "Name is required",
            })}
            error={errors.name}
          />

          <Input
            label="Phone"
            register={register("phone", {
              required: "Phone is required",
            })}
            error={errors.phone}
          />

          <Input
            label="Profession"
            register={register("profession", {
              required: "Profession is required",
            })}
            error={errors.profession}
          />

          <div className="flex justify-end gap-3 mt-6">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-lg border"
            >
              Cancel
            </button>

            <button
              className="px-5 py-2 rounded-lg bg-blue-600 text-white"
            >
              Save
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}