// pages/DashboardPage.tsx (ou um arquivo correspondente)
import React from 'react';
import PizzaChart from '../components/dashboard/Grafico';
import despesasMock from '../mocks/despesas.json'; // Mock de despesas

// Atualização do DashboardPage.tsx (a parte do Gráfico de Pizza)
const DashboardPage = () => {
    const calcularTotais = () => {
        const entradas = despesasMock
            .filter((despesa) => despesa.tipo === 'entrada')
            .reduce((acc, despesa) => acc + despesa.valor, 0);

        const despesas = despesasMock
            .filter((despesa) => despesa.tipo === 'saída')
            .reduce((acc, despesa) => acc + despesa.valor, 0);

        return { entradas, despesas };
    };

    const { entradas, despesas } = calcularTotais();

    return (
        <main style={{ padding: '20px' }}>
            <h1>Dashboard de Finanças</h1>
            <p>Aqui você pode ver a distribuição de entradas e despesas.</p>
            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                <PizzaChart entradas={entradas} despesas={despesas} />
            </div>
        </main>
    );
};


export default DashboardPage;
