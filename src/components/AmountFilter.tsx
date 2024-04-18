import React from "react";

interface AmountFilterProps {
  filterAmount: number;
  setFilterAmount: (amount: number) => void;

}

const AmountFilter: React.FC<AmountFilterProps> = ({ filterAmount, setFilterAmount }) => {

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilterAmount(value ? parseFloat(value) : 0)
  }

  return (
    <div className="flex flex-col justify-center w-96">
      <input
        type="number"
        placeholder="Amount filter"
        value={filterAmount || ""}
        onChange={handleInputChange}
        className="border rounded-md p-2 mb-5 text-sm"
      />
    </div>
  );
};

export default AmountFilter;
