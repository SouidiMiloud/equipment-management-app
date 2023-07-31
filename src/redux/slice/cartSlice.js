import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cartItems: [],
    totalAmount: 0,
    totalQuantity: 0,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.cartItems.find(item => item.id === newItem.id);

            if (existingItem) {
                existingItem.quantity++;
            } else {
                state.cartItems.push({
                    id: newItem.id,
                    productName: newItem.productName,
                    image: newItem.imgUrl,
                    quantity: 1,
                });
            }

            state.totalQuantity++;
            state.totalAmount += newItem.price;
        },
    },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
