import {
  FaWallet,
  FaMoneyBillWave,
  FaArrowUp,
  FaChartLine,
} from "react-icons/fa";

import SummaryCard from "../ui/SummaryCard";

export default function SummaryCards({ statistics }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 gap-5 lg:gap-6">

      <SummaryCard
  title="Total Expenses"
  value={statistics?.totalExpenses ?? 0}
  icon={FaWallet}
  color="blue"
/>

<SummaryCard
  title="Total Amount"
  value={`₹ ${statistics?.totalAmount ?? 0}`}
  icon={FaMoneyBillWave}
  color="red"
/>

<SummaryCard
  title="Highest Expense"
  value={`₹ ${statistics?.highestExpense ?? 0}`}
  icon={FaArrowUp}
  color="orange"
/>

<SummaryCard
  title="Average Expense"
  value={`₹ ${Math.round(statistics?.averageExpense ?? 0)}`}
  icon={FaChartLine}
  color="green"
/>
    </div>
  );
}