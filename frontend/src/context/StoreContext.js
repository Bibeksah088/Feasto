import { createContext, useEffect} from "react";
import { food_list as staticFoodList } from "../assets/frontend_assets/assets";
import { useState } from "react";
import axios from "axios";

export const StoreContext = createContext();

const StoreContextProvider=(props)=>{

    const [cartItems,setCartItems]=useState({});
    const [login,setlogin]=useState(false);
    const url = process.env.REACT_APP_API_URL;
    const [token,setToken]=useState("");
    const [food_list,setFoodList]=useState([]);

    const addToCart= async (itemId)=>{
        if(!cartItems[itemId]){
            setCartItems(prev=>({...prev,[itemId]:1}));
        }
        else if(cartItems[itemId]){
            setCartItems(prev=>({...prev,[itemId]:prev[itemId]+1}));
        }
        if(token){
            await axios.post(url+"/api/v1/cart/addtocart",{itemId},{headers:{token}})
        }
    }

    const removeFromCart=(itemId)=>{
        setCartItems(prev=>({...prev,[itemId]:prev[itemId]-1}));
        if(token){
            axios.post(url+"/api/v1/cart/removefromcart",{itemId},{headers:{token}})
        }
    }

    const totalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let iteminfo = food_list.find((product) => product._id === item);
                if (iteminfo) {  // Check if iteminfo is defined
                    totalAmount += iteminfo.price * cartItems[item];
                }
            }
        }
        return totalAmount;
    };
    

    const fetchFoodList=async()=>{
        try {
            const response=await axios.get(url+"/api/v1/food/get");
            if (response.data.data && response.data.data.length > 0) {
                setFoodList(response.data.data);
            } else {
                setFoodList(staticFoodList);
            }
        } catch (err) {
            console.log("Backend unavailable, using static food list");
            setFoodList(staticFoodList);
        }
    }

    const loadCartData = async (token) => {
        try {
            const response = await axios.post(url + "/api/v1/cart/getcartitems", {}, { headers: { token } });
            setCartItems(response.data.data || {}); // Ensure cartItems is never undefined
        } catch (err) {
            console.log("Unable to load cart data", err);
        }
    };
    
    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                setToken(storedToken);
                await loadCartData(storedToken); 
            }
        }
        loadData();
    }, []);

    const contextvalue={
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        login,
        setlogin,
        totalCartAmount,
        url,
        token,
        setToken
    }



    return(
        <StoreContext.Provider value={contextvalue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;
