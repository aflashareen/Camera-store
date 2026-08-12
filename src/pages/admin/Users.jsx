import { Users, UserCheck, UserX } from "lucide-react";
import { getUsers, updateUser } from "../../services/userService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

function AdminUsers() {
  const { data: users = [], isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
  const queryClient = useQueryClient();

  const updateUserMutation = useMutation({
  mutationFn: updateUser,

  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ["users"],
    });
    
  },
});

  if (isLoading) return <p className="text-white">Loading users...</p>;
  if (isError) return <p className="text-red-400">Failed to load users.</p>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-white">
          Users
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your customers and account access
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-[#151515] p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Total Users
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-white">
                {users.length}
              </h2>
            </div>
            <Users className="h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#151515] p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Active Users
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-white">
                {users.filter((user) => !user.isBlocked).length}
              </h2>
            </div>
            <UserCheck className="h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#151515] p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Blocked Users
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-white">
                {users.filter((user) => user.isBlocked).length}
              </h2>
            </div>
            <UserX className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#151515]">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10 text-left text-sm text-gray-500">
              <th className="px-6 py-4">
                Name
              </th>
              <th className="px-6 py-4">
                Email
              </th>
              <th className="px-6 py-4">
                Status
              </th>
              <th className="px-6 py-4">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b border-white/5" >
                <td className="px-6 py-4 text-sm text-white">
                  {user.fullname}
                </td>
                <td className="px-6 py-4 text-sm text-gray-400">
                  {user.email}
                </td>
                <td className="px-6 py-4 text-sm">
                  {user.isBlocked ? (
                    <span className="text-red-400">Blocked</span>
                  ) : (
                    <span className="text-green-400">Active</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <button onClick={() =>
                      updateUserMutation.mutate({
                        id: user.id,
                        isBlocked: !user.isBlocked,
                      })}
                    className="rounded-lg border border-white/10 px-3 py-2 text-sm text-gray-300 hover:bg-white/5">
                    {user.isBlocked ? "Unblock" : "Block"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default AdminUsers;