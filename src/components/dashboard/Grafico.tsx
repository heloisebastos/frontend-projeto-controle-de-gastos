import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface PizzaChartProps {
  entradas: number;
  despesas: number;
}

const PizzaChart: React.FC<PizzaChartProps> = ({ entradas, despesas }) => {
  // Dados mockados (substuir pelos dados reais quando o backend estiver disponível)
  const data = {
    labels: ['Entradas', 'Despesas'],
    datasets: [
      {
        data: [entradas, despesas],
        backgroundColor: ['#28a745', '#dc3545'],
        hoverBackgroundColor: ['#218838', '#c82333'],
      },
    ],
  };

  return (
    <div style={{ width: '300px', height: '300px' }}>
      <Pie data={data} />
    </div>
  );
};

export default PizzaChart;
