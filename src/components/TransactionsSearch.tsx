import React from "react";
import searchIcon from "../assets/search-icon.png";

interface TransactionSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const TransactionSearch: React.FC<TransactionSearchProps> = ({ searchQuery, setSearchQuery }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }

  return (
    <div className="flex flex-col justify-center w-96">
      <div className="flex items-center border rounded-md mb-10">
        <img src={searchIcon} alt="Search" className="ml-2 h-4 w-4" />
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder="Search Transactions"
          className="flex-1 p-2 text-sm border-none outline-none"
        />
      </div>
    </div>
  );
};

export default TransactionSearch;
