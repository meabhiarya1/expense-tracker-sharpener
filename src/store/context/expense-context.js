import React from "react";

const ExpenseContext = React.createContext({
    items: [],
    editItems: {},
    addItem: (item) => {},
    removeItem: (item) => {},
    editItem: (item) => {},
    onLogin: ()=>{}
});

export default ExpenseContext;

