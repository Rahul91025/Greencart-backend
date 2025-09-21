const calculateKPIs = (orders, routes) => {
  let totalProfit = 0;
  let totalDeliveries = orders.length;
  let onTimeDeliveries = 0;
  let totalFuelCost = 0;

  orders.forEach((order) => {
    const route = routes.find(r => r._id.toString() === order.routeId);
    if (!route) return;

    // Fuel cost
    let fuel = route.distance * 5;
    if (route.traffic === "high") fuel += route.distance * 2;

    // Profit calculation
    let profit = order.value - fuel;

    // Late delivery penalty
    if (order.status === "late") profit -= 50;
    else onTimeDeliveries++;

    // High-value bonus
    if (order.status === "delivered" && order.value > 1000) profit += order.value * 0.1;

    totalProfit += profit;
    totalFuelCost += fuel;
  });

  const efficiencyScore = (onTimeDeliveries / totalDeliveries) * 100;

  return { totalProfit, efficiencyScore, totalFuelCost, totalDeliveries, onTimeDeliveries };
};

module.exports = calculateKPIs;
