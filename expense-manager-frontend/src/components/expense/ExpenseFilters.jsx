import { FaSearch, FaFilter, FaSortAmountDown } from "react-icons/fa";

export default function ExpenseFilters({
  search,
  category,
  sort,
  onSearchChange,
  onCategoryChange,
  onSortChange,
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

      {/* Search */}
      <div className="relative">
        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

        <input
          type="text"
          placeholder="Search by expense name..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="
            w-full
            pl-11
            pr-4
            py-3
            rounded-xl
            border
            border-gray-200
            bg-gray-50
            focus:bg-white
            focus:border-blue-500
            focus:ring-4
            focus:ring-blue-100
            outline-none
            transition-all
          "
        />
      </div>

      {/* Category */}
      <div className="relative">
        <FaFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />

        <select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="
            w-full
            appearance-none
            pl-11
            pr-4
            py-3
            rounded-xl
            border
            border-gray-200
            bg-gray-50
            focus:bg-white
            focus:border-blue-500
            focus:ring-4
            focus:ring-blue-100
            outline-none
            transition-all
          "
        >
          <option value="">All Categories</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Shopping">Shopping</option>
          <option value="Bills">Bills</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Health">Health</option>
          <option value="Education">Education</option>
          <option value="Travel">Travel</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Sort */}
      <div className="relative">
        <FaSortAmountDown className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />

        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          className="
            w-full
            appearance-none
            pl-11
            pr-4
            py-3
            rounded-xl
            border
            border-gray-200
            bg-gray-50
            focus:bg-white
            focus:border-blue-500
            focus:ring-4
            focus:ring-blue-100
            outline-none
            transition-all
          "
        >
          <option value="createdAt-desc">Newest First</option>
          <option value="createdAt-asc">Oldest First</option>
          <option value="amount-desc">Highest Amount</option>
          <option value="amount-asc">Lowest Amount</option>
        </select>
      </div>

    </div>
  );
}