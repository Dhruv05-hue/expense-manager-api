import {
  Wallet,
  IndianRupee,
  Receipt,
  TrendingUp,
  BarChart3,
  PiggyBank,
} from "lucide-react";

export default function TripStats({ trip }) {
  const cards = [
    {
      title: "Budget",
      value: `₹${Number(trip.budget || 0).toLocaleString()}`,
      icon: Wallet,
      bg: "bg-blue-100",
      color: "text-blue-600",
    },
    {
      title: "Spent",
      value: `₹${Number(trip.totalSpent || 0).toLocaleString()}`,
      icon: IndianRupee,
      bg: "bg-red-100",
      color: "text-red-600",
    },
    {
      title: "Remaining",
      value: `₹${Number(trip.remainingBudget || 0).toLocaleString()}`,
      icon: PiggyBank,
      bg: "bg-green-100",
      color: "text-green-600",
    },
    {
      title: "Expenses",
      value: trip.expenseCount || 0,
      icon: Receipt,
      bg: "bg-purple-100",
      color: "text-purple-600",
    },
    {
      title: "Highest",
      value: `₹${Number(trip.highestExpense || 0).toLocaleString()}`,
      icon: TrendingUp,
      bg: "bg-orange-100",
      color: "text-orange-600",
    },
    {
      title: "Average",
      value: `₹${Number(trip.averageExpense || 0).toLocaleString()}`,
      icon: BarChart3,
      bg: "bg-cyan-100",
      color: "text-cyan-600",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">
                  {card.title}
                </p>

                <h2 className="text-2xl font-bold mt-2 text-gray-800">
                  {card.value}
                </h2>
              </div>

              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center ${card.bg}`}
              >
                <Icon
                  size={28}
                  className={card.color}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}