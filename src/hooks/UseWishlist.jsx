import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom"
import { useCurrentUser } from "./UseCurrentUser";
import { addToWishlist, getWishlist, removeFromWishlist } from "../services/wishlistService";
import toast from "react-hot-toast";

export const UseWishlist = (product) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data: user } = useCurrentUser();

    const { data: wishlist = [] } = useQuery({
        queryKey: ["wishlist", user?.id],
        queryFn: () => getWishlist(user?.id),
        enabled: !!user,
    });

    const existingItem = wishlist.find((item)=>
    String(item.productId) === String(product?.id) &&
    String(item.userId) === String(user?.id),
    );

    const isWishlisted = !!existingItem;

    const addMutation = useMutation({
        mutationFn: addToWishlist,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["wishlist"], });
        toast.success("Added to wishlist");
    },
    onError: () =>{
        toast.error("Failed to add to wishlist")
    }
    });

    const removeMutation = useMutation({
        mutationFn: removeFromWishlist,
        onSuccess: () =>{
            queryClient.invalidateQueries({ queryKey: ["wishlist"] }),
            toast.error("Removed from wishlist")
        },
        onError:()=>{
            toast.error("Failed to remove from wishlist")
        }
    });

    const handleWishlist = (e) => {
        e.preventDefault();

        if(!user){
            navigate("/login");
            return;
        }
        if(isWishlisted){
            removeMutation.mutate(existingItem.id);
        } else {
            addMutation.mutate({
                ...product,
                userId: user.id,
                productId: product.id,
            });
        }
    };

    return { isWishlisted, handleWishlist }
}