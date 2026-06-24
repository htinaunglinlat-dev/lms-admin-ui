import {
  createUser,
  deleteUser,
  fetchAdminById,
  fetchAdmins,
  updateUser,
} from "@/api/admin"; // Adjust this path to your actual file location
import {
  CreateAdminFormValues,
  EditAdminFormValues,
} from "@/validations/admin.schema";
import { AdminQueryType } from "@/types/admin"; // Adjust these paths to your types
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useAdmins = () => {
  const queryClient = useQueryClient();

  // Query: Fetch paginated or filtered collection of admins
  const adminListQuery = (query?: AdminQueryType) =>
    useQuery({
      queryKey: ["admins", query],
      queryFn: () => fetchAdmins(query),
    });

  // Query: Fetch isolated details for a singular admin profile
  const adminByIdQuery = (id: number) =>
    useQuery({
      queryKey: ["admin", id],
      queryFn: () => fetchAdminById(id),
      enabled: !!id && !isNaN(id), // Ensures query doesn't execute on zero or invalid identifiers
    });

  // Mutation: Create a new admin instance
  const createAdminMutation = useMutation({
    mutationFn: (data: Omit<CreateAdminFormValues, "password_confirmation">) =>
      createUser(data),
    onSuccess: () => {
      // Invalidate the collection cache to trigger background re-fetching
      queryClient.invalidateQueries({ queryKey: ["admins"] });
    },
  });

  // Mutation: Modify properties of an existing admin instance
  const updateAdminMutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: Omit<EditAdminFormValues, "password_confirmation">;
    }) => updateUser(id, data),
    onSuccess: (_data, variables) => {
      // Simultaneously refresh the global collection and the specific detail query
      queryClient.invalidateQueries({ queryKey: ["admins"] });
      queryClient.invalidateQueries({ queryKey: ["admin", variables.id] });
    },
  });

  // Mutation: Safely purge an admin profile
  const deleteAdminMutation = useMutation({
    mutationFn: (id: number) => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admins"] });
    },
  });

  return {
    adminListQuery,
    adminByIdQuery,
    createAdminMutation,
    updateAdminMutation,
    deleteAdminMutation,
  };
};
