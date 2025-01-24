import { useEffect, useState } from "react";
import axios from "axios";
import * as S from "./styles";
import ChatGemini from "../components/chat-gemini/ChatGemini";
import { auth } from "../services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import http from "../http";
import PizzaChart from "../components/dashboard/PizzaChart";

type Despesa = {
  id: number;
  descricao: string;
  categoria: string;
  valor: number;
  tipo: string;
  data: string;
  user: string;
};

const Dashboard = () => {
  const [despesas, setDespesas] = useState([] as Despesa[]);
  const [filteredDespesas, setFilteredDespesas] = useState([] as Despesa[]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // Mês atual
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Ano atual
  const [user] = useAuthState(auth);

  // Fetch despesas from API
  useEffect(() => {
    const fetchDespesas = async () => {
      try {
        const response = await http.get(`/despesas/${user?.uid}`);
        setDespesas(response.data);
      } catch (error) {
        console.error("Erro ao buscar despesas:", error);
      }
    };
    fetchDespesas();
  }, [user]);

  // Filter despesas by month and year
  useEffect(() => {
    const despesasFiltradas = despesas.filter((despesa) => {
      const dataDespesa = new Date(despesa.data);
      return (
        dataDespesa.getMonth() + 1 === selectedMonth &&
        dataDespesa.getFullYear() === selectedYear
      );
    });
    setFilteredDespesas(despesasFiltradas);
  }, [despesas, selectedMonth, selectedYear]);

  const calcularTotais = (despesasFiltradas: Despesa[]) => {
    if (despesasFiltradas.length === 0) {
      return { entradas: 0, saidas: 0, saldo: 0 };
    }

    const entradas = despesasFiltradas
      .filter((d) => d.tipo === "entrada" && d.valor)
      .reduce((acc, d) => acc + d.valor, 0);

    const saidas = despesasFiltradas
      .filter((d) => d.tipo === "saída" && d.valor)
      .reduce((acc, d) => acc + d.valor, 0);

    return { entradas, saidas, saldo: entradas - saidas };
  };

  const { entradas, saidas, saldo } = calcularTotais(filteredDespesas);

  return (
    <S.TableContainer>
      <S.Title>Dashboard de Finanças</S.Title>

      {/* Filtro por mês e ano */}
      <S.FiltersContainer>
        <label>
          Mês:
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </label>
        <label>
          Ano:
          <input
            type="number"
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
          />
        </label>
      </S.FiltersContainer>

      {/* Totais de Entradas, Saídas e Saldo */}
      <S.CardsContainer>
        <S.Card bgColor=" #007bff">
          <p>Entradas</p>
          <p>R$ {entradas.toFixed(2)}</p>
        </S.Card>
        <S.Card bgColor="#dc3545">
          <p>Saídas</p>
          <p>R$ {saidas.toFixed(2)}</p>
        </S.Card>
        <S.Card bgColor="#28a745">
          <p>Saldo</p>
          <p>R$ {saldo.toFixed(2)}</p>
        </S.Card>
      </S.CardsContainer>

      {/* Gráfico de Pizza */}
      <div style={{ margin: "20px auto", textAlign: "center" }}>
        <PizzaChart entradas={entradas} despesas={saidas} saldo={saldo} />
      </div>

      {/* Tabela com os dados das despesas */}
      <S.StyledTable>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Categoria</th>
            <th>Valor</th>
            <th>Tipo</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {filteredDespesas.map((despesa) => (
            <tr key={despesa.id}>
              <td>{despesa.descricao}</td>
              <td>{despesa.categoria}</td>
              <td>R$ {despesa.valor.toFixed(2)}</td>
              <td>{despesa.tipo}</td>
              <td>{despesa.data}</td>
            </tr>
          ))}
        </tbody>
      </S.StyledTable>
      <ChatGemini despesas={despesas} />
    </S.TableContainer>
  );
};

export default Dashboard;
