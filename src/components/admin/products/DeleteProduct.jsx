import { X } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { softDeleteProduct, hardDeleteProduct, restoreProduct } from "../../../services/productService";
import toast from "react-hot-toast";

function DeleteProduct({ product, onClose }) {

    const queryClient = useQueryClient();
    const softDeleteMutation = useMutation({
        mutationFn: softDeleteProduct,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["products"],
            });
            toast.success("Product deleted temporarily!");
            onClose();
        },
    });

    const hardDeleteMutation = useMutation({
        mutationFn: hardDeleteProduct,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["products"],
            });
            toast.success("Product deleted successfully!");
            onClose();
        },
    });

    const restoreMutation = useMutation({
        mutationFn: restoreProduct,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["products"],
            });
            toast.success("Product restored successfully!");
            onClose();
        },
    });

    if (!product) return null;

    const isDeleting = softDeleteMutation.isPending || hardDeleteMutation.isPending;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
            <div className="w-full max-w-md rounded-2xl bg-[#151515] p-6">

                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Delete Product</h2>
                    <button
                        onClick={onClose}
                        disabled={isDeleting}
                        className="rounded-lg p-2 hover:bg-zinc-800">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <p className="text-zinc-400">What do you want to do with{" "}
                    <span className="font-medium text-white">{product.name}</span> ? 
                </p>

                <div className="mt-6 flex gap-3">
                    {product.isDeleted ? (
                        <button
                            onClick={() => restoreMutation.mutate(product.id)}
                            disabled={restoreMutation.isPending}
                            className="w-full rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:opacity-50">
                            {restoreMutation.isPending ? "Restoring..." : "Restore Product"}
                        </button>
                    ) : (
                        <>
                            <button
                                onClick={() => softDeleteMutation.mutate(product.id)}
                                disabled={isDeleting}
                                className="flex-1 rounded-lg bg-zinc-700 px-4 py-2">
                                Soft Delete
                            </button>

                            <button
                                onClick={() => hardDeleteMutation.mutate(product.id)}
                                disabled={isDeleting}
                                className="flex-1 rounded-lg bg-red-600 px-4 py-2" >
                                Delete Permanently
                            </button>
                        </> )}
                </div>
                <button
                    onClick={onClose}
                    disabled={isDeleting}
                    className="mt-3 w-full rounded-lg border border-zinc-700 px-4 py-2 hover:bg-zinc-800 disabled:opacity-50">
                    Cancel
                </button>
            </div>
        </div>
    );
}

export default DeleteProduct;