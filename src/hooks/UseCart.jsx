import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom"
import { useCurrentUser } from "./UseCurrentUser";
import { addToCart, getCart, removeFromCart, updateCart } from "../services/cartService";
import toast from "react-hot-toast";

export const useCart = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data: user } = useCurrentUser();

    const { data: cart = [], isLoading } = useQuery({
        queryKey: ["cart", user?.id],
        queryFn: () => getCart(user?.id),
        enabled: !!user,
    });

    const cartMutation = useMutation({
        mutationFn: addToCart,
        onSuccess: () =>
            queryClient.invalidateQueries({
                queryKey: ["cart"]
            }),
    });

    const removeMutation = useMutation({
        mutationFn: removeFromCart,
        onSuccess: () =>
            queryClient.invalidateQueries({
                queryKey: ["cart"]
            }),
    });
    const updateMutation = useMutation({
        mutationFn: updateCart,
        onSuccess: () =>
            queryClient.invalidateQueries({
                queryKey: ["cart", user?.id],
            }),
    });
    const removeItem = (id) => {
        removeMutation.mutate(id);
    };

    const updateQuantity = (id, quantity) => {
        updateMutation.mutate({ id, quantity });
    };

    const handleCart = (product) => {
        if (!user) {
            navigate("/login");
            return;
        }

        const existingCartItem = cart.find(
            (item) =>
                String(item.productId) === String(product.id)
        );

        if (existingCartItem) {
            toast("Product already in cart");
            return;
        }

        cartMutation.mutate({
            ...product,
            userId: user.id,
            productId: product.id,
            quantity: 1,
        });
    };

    return { handleCart, cart, removeItem, updateQuantity, isLoading };
}