import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface PizzaChartProps {
    entradas: number;
    despesas: number;
    saldo: number;
}

const PizzaChart: React.FC<PizzaChartProps> = ({ entradas, despesas, saldo }) => {
    const data = {
        labels: ['Entradas', 'Despesas', 'Saldo'],
        datasets: [
            {
                data: [entradas, despesas, saldo],
                backgroundColor: ['#007bff', ' #dc3545', ' #28a745'],
                hoverBackgroundColor: ['#218838', '#c82333', '#0056b3'],
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
