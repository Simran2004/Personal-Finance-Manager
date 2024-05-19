import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ budget, expenses }) => {
  const budgetExpenses = expenses.filter(expense => expense.budgetId === budget.id);
  const totalSpent = budgetExpenses.reduce((total, expense) => total + expense.amount, 0);
  const remainingAmount = budget.amount - totalSpent;

  // Function to generate a random color
  
  const generateRandomColor = () => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  };

  const vibrantColors = budgetExpenses.map(() => generateRandomColor());
  vibrantColors.push('#CCCCCC'); // Color for the remaining budget

  const data = {
    labels: [
      ...budgetExpenses.map(expense => expense.name),
      'Remaining Budget'
    ],
    datasets: [{
      label: `${budget.name} Expenses`,
      data: [
        ...budgetExpenses.map(expense => expense.amount),
        remainingAmount > 0 ? remainingAmount : 0
      ],
      backgroundColor: vibrantColors,
    }]
  };

  return (
    <div className="pie-chart-container">
      <h3>{budget.name}</h3>
      <div className="pie-chart">
        <Pie data={data} />
      </div>
    </div>
  );
};

export default PieChart;
