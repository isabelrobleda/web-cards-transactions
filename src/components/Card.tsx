import React, { useState, useEffect } from "react";
import {
  getCards,
  getTransactions,
  Card as CardType,
  Transaction,
} from "../ApiClient/index";
import TransactionComponent from "./Transaction";
import AmountFilter from "./AmountFilter";
import businessIcon from "../assets/business-icon.png";
import personalIcon from "../assets/personal-icon.png";
import TransactionSearch from "./TransactionsSearch";
import sadEmoji from "../assets/sad-emoji.png";

function Card() {
  const [cardsData, setCardsData] = useState<CardType[]>([]);
  const [transactionsData, setTransactionsData] = useState<Transaction[]>([]);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [filterAmount, setFilterAmount] = useState<number>(0);
  const [selectedCardColor, setSelectedCardColor] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    async function loadCards() {
      const cards = await getCards();
      setCardsData(cards);
    }
    loadCards();
  }, []);

  useEffect(() => {
    async function loadTransactions() {
      if (selectedCardId) {
        try {
          const transactions: Transaction[] = await getTransactions(
            selectedCardId
          );
          setTransactionsData(transactions);
        } catch (error) {
          console.error(error);
        }
      }
    }
    loadTransactions();
  }, [selectedCardId]);

  const handleCardSelection = (cardId: string, description: string) => {
    if (selectedCardId !== cardId) {
      setSelectedCardId(cardId);
      setSelectedCardColor(
        description === "Private Card" ? "slate-200" : "blue-100"
      );
      setSearchQuery("");
      setFilterAmount(0);
    }
  };

  const getIcon = (description: any) => {
    switch (description) {
      case "Private Card":
        return personalIcon;
      case "Business Card":
        return businessIcon;
      default:
        return null;
    }
  };

  const filteredTransactions = transactionsData.filter(
    (transaction) =>
      transaction.amount >= filterAmount &&
      transaction.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col w-full py-6">
      <div className="flex flex-row justify-center space-x-4">
        {cardsData.map((card) => (
          <div
            key={card.id}
            onClick={() => handleCardSelection(card.id, card.description)}
            className={`border rounded-md my-10 bg- p-8 text-sm cursor-pointer bg- ${
              selectedCardId === card.id ? `bg-${selectedCardColor}` : ""
            }`}
          >
            <div className="flex flex-col items-center ">
              <img
                src={getIcon(card.description)}
                alt="Card Icon"
                className="w-9"
              />
            </div>
            <h2 className="text-lg text-center">{card.description}</h2>
            <p className="text-xs text-gray-500 text-center">{card.id}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center">
        <h2 className="font-semibold text-sm mb-2"> Filters</h2>
        <AmountFilter
          setFilterAmount={setFilterAmount}
          filterAmount={filterAmount}
        />
        <TransactionSearch
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </div>
      <div className="flex flex-row justify-center items-center mb-2">
        <h2 className="font-semibold text-sm text-center mr-1">
          Transactions
        </h2>
        <div className="flex items-center justify-center bg-slate-400 rounded-full w-6 h-6">
          <p className="text-white text-xs leading-none">
            {filteredTransactions.length}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center">
        {selectedCardId && filteredTransactions.length > 0 ? (
          filteredTransactions.map((transaction) => (
            <TransactionComponent
              key={transaction.id}
              transaction={transaction}
              bgColor={selectedCardColor}
            />
          ))
        ) : (
          <div className="flex flex-col items-center mt-3 w-96 text-center">
            <img src={sadEmoji} alt="sad-emoji" className="w-14 mr-1" />
            <h2 className="text-xl text-gray-600 font-semibold mt-3 mb-1">No results</h2>
            <p className="text-sm text-gray-600">
                Sorry, there are no transactions matching your search, please try again
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Card;
