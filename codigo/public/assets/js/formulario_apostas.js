document
  .getElementById("form-apostas")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const usuarioCorrente = JSON.parse(
      sessionStorage.getItem("usuarioCorrente")
    );
    if (!usuarioCorrente) {
      alert("Você precisa estar logado para responder.");
      return;
    }

    const form = e.target;

    // Obter os valores de todas as perguntas
    const faixa_etaria = form.faixa_etaria.value;
    const genero = form.genero.value;
    const tempo_aposta = form.tempo_aposta.value;
    const freq_semana = form.freq_semana.value;
    const valor_medio = form.valor_medio.value;
    const deixou_pagar = form.deixou_pagar.value;
    const tentou_parar = form.tentou_parar.value;
    const precisa_ajuda = form.precisa_ajuda.value;

    // Montar o objeto de dados completo
    const dados = {
      usuarioId: usuarioCorrente.id,
      faixa_etaria_menos_18: faixa_etaria === "1" ? 1 : 0,
      faixa_etaria_18_24: faixa_etaria === "2" ? 1 : 0,
      faixa_etaria_25_34: faixa_etaria === "3" ? 1 : 0,
      faixa_etaria_35_44: faixa_etaria === "4" ? 1 : 0,
      faixa_etaria_45_54: faixa_etaria === "5" ? 1 : 0,
      faixa_etaria_55_mais: faixa_etaria === "6" ? 1 : 0,
      genero_masculino: genero === "1" ? 1 : 0,
      genero_feminino: genero === "2" ? 1 : 0,
      genero_outro: genero === "3" ? 1 : 0,
      tempo_aposta_menos_6_meses: tempo_aposta === "1" ? 1 : 0,
      tempo_aposta_6_meses_1_ano: tempo_aposta === "2" ? 1 : 0,
      tempo_aposta_1_2_anos: tempo_aposta === "3" ? 1 : 0,
      tempo_aposta_2_5_anos: tempo_aposta === "4" ? 1 : 0,
      tempo_aposta_mais_5_anos: tempo_aposta === "5" ? 1 : 0,
      freq_semana_1_vez: freq_semana === "1" ? 1 : 0,
      freq_semana_2_3_vezes: freq_semana === "2" ? 1 : 0,
      freq_semana_4_6_vezes: freq_semana === "3" ? 1 : 0,
      freq_semana_todos_os_dias: freq_semana === "4" ? 1 : 0,
      valor_medio_ate_50: valor_medio === "1" ? 1 : 0,
      valor_medio_51_200: valor_medio === "2" ? 1 : 0,
      valor_medio_201_500: valor_medio === "3" ? 1 : 0,
      valor_medio_501_1000: valor_medio === "4" ? 1 : 0,
      valor_medio_mais_1000: valor_medio === "5" ? 1 : 0,
      deixou_pagar_nao: deixou_pagar === "1" ? 1 : 0,
      deixou_pagar_sim: deixou_pagar === "2" ? 1 : 0,
      tentou_parar_nao: tentou_parar === "1" ? 1 : 0,
      tentou_parar_sim: tentou_parar === "2" ? 1 : 0,
      precisa_ajuda_nao: precisa_ajuda === "1" ? 1 : 0,
      precisa_ajuda_sim: precisa_ajuda === "2" ? 1 : 0,
    };

    try {
      // ---- A LÓGICA PRINCIPAL ESTÁ AQUI ----
      const resp = await fetch(
        `http://localhost:3000/apostas?usuarioId=${usuarioCorrente.id}`
      );
      const apostas = await resp.json();

      if (apostas.length === 0) {
        // SE NÃO EXISTE, CRIA UM NOVO (POST)
        await fetch("http://localhost:3000/apostas", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dados),
        });
        alert("Resposta registrada com sucesso!");
      } else {
        // SE JÁ EXISTE, ATUALIZA O EXISTENTE (PATCH)
        const apostaId = apostas[0].id;
        await fetch(`http://localhost:3000/apostas/${apostaId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dados),
        });
        alert("Sua resposta foi atualizada com sucesso!");
      }

      form.reset();
    } catch (error) {
      console.error("Falha ao enviar os dados:", error);
      alert(
        "Ocorreu um erro ao enviar sua resposta. Verifique o console para mais detalhes."
      );
    }
  });
