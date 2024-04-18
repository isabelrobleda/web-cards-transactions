import React from 'react';
import { Transaction } from "../ApiClient/index";

interface TransactionComponentProps {
    transaction: Transaction;
    bgColor: string; 
}

const TransactionComponent: React.FC<TransactionComponentProps> = ({ transaction, bgColor }) => {
    return (
        <div className={`py-8 px-6 my-2 rounded-md bg-${bgColor} w-96 flex flex-row justify-between text-sm`}>
            <p>{transaction.description}</p>
            <p>{transaction.amount.toFixed(2)}€</p>
        </div>
    );
};

export default TransactionComponent;
