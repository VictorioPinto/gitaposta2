document.addEventListener("DOMContentLoaded", async function () {
  const resp = await fetch("http://localhost:3000/apostas");
  const apostas = await resp.json();

  // Faixa Etária
  const faixaLabels = [
    "Menos de 18",
    "18 a 24",
    "25 a 34",
    "35 a 44",
    "45 a 54",
    "55+",
  ];
  const faixaKeys = [
    "faixa_etaria_menos_18",
    "faixa_etaria_18_24",
    "faixa_etaria_25_34",
    "faixa_etaria_35_44",
    "faixa_etaria_45_54",
    "faixa_etaria_55_mais",
  ];
  const faixaData = faixaKeys.map((key) =>
    apostas.reduce((acc, a) => acc + (a[key] || 0), 0)
  );

  // Gênero
  const generoLabels = ["Masculino", "Feminino", "Outro"];
  const generoKeys = ["genero_masculino", "genero_feminino", "genero_outro"];
  const generoData = generoKeys.map((key) =>
    apostas.reduce((acc, a) => acc + (a[key] || 0), 0)
  );

  // Tempo Apostando
  const tempoLabels = [
    "Menos de 6 meses",
    "6 meses a 1 ano",
    "1 a 2 anos",
    "2 a 5 anos",
    "Mais de 5 anos",
  ];
  const tempoKeys = [
    "tempo_aposta_menos_6_meses",
    "tempo_aposta_6_meses_1_ano",
    "tempo_aposta_1_2_anos",
    "tempo_aposta_2_5_anos",
    "tempo_aposta_mais_5_anos",
  ];
  const tempoData = tempoKeys.map((key) =>
    apostas.reduce((acc, a) => acc + (a[key] || 0), 0)
  );

  // Frequência Semanal
  const freqLabels = ["1 vez", "2-3 vezes", "4-6 vezes", "Todos os dias"];
  const freqKeys = [
    "freq_semana_1_vez",
    "freq_semana_2_3_vezes",
    "freq_semana_4_6_vezes",
    "freq_semana_todos_os_dias",
  ];
  const freqData = freqKeys.map((key) =>
    apostas.reduce((acc, a) => acc + (a[key] || 0), 0)
  );

  // Valor Médio
  const valorLabels = [
    "Até R$50",
    "R$51-200",
    "R$201-500",
    "R$501-1000",
    "Mais de R$1000",
  ];
  const valorKeys = [
    "valor_medio_ate_50",
    "valor_medio_51_200",
    "valor_medio_201_500",
    "valor_medio_501_1000",
    "valor_medio_mais_1000",
  ];
  const valorData = valorKeys.map((key) =>
    apostas.reduce((acc, a) => acc + (a[key] || 0), 0)
  );

  // Deixou de pagar contas
  const deixouLabels = ["Não", "Sim"];
  const deixouKeys = ["deixou_pagar_nao", "deixou_pagar_sim"];
  const deixouData = deixouKeys.map((key) =>
    apostas.reduce((acc, a) => acc + (a[key] || 0), 0)
  );

  // Tentou parar
  const tentouLabels = ["Não", "Sim"];
  const tentouKeys = ["tentou_parar_nao", "tentou_parar_sim"];
  const tentouData = tentouKeys.map((key) =>
    apostas.reduce((acc, a) => acc + (a[key] || 0), 0)
  );

  // Precisa de ajuda
  const ajudaLabels = ["Não", "Sim"];
  const ajudaKeys = ["precisa_ajuda_nao", "precisa_ajuda_sim"];
  const ajudaData = ajudaKeys.map((key) =>
    apostas.reduce((acc, a) => acc + (a[key] || 0), 0)
  );

  // Cores para os gráficos
  const cores = [
    "#ff7645",
    "#ffb88c",
    "#232323",
    "#ffd6c1",
    "#8c7ae6",
    "#00b894",
  ];

  // Função para criar gráfico pizza
  function criaPizza(id, labels, data) {
    new Chart(document.getElementById(id), {
      type: "pie",
      data: {
        labels,
        datasets: [
          {
            data,
            backgroundColor: cores.slice(0, labels.length),
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: "bottom", labels: { color: "#fff" } },
        },
      },
    });
  }

  criaPizza("graficoFaixaEtaria", faixaLabels, faixaData);
  criaPizza("graficoGenero", generoLabels, generoData);
  criaPizza("graficoTempoAposta", tempoLabels, tempoData);
  criaPizza("graficoFrequencia", freqLabels, freqData);
  criaPizza("graficoValor", valorLabels, valorData);
  criaPizza("graficoDeixouPagar", deixouLabels, deixouData);
  criaPizza("graficoTentouParar", tentouLabels, tentouData);
  criaPizza("graficoPrecisaAjuda", ajudaLabels, ajudaData);
});
