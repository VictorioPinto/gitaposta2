
document.getElementById('form-apostas').addEventListener('submit', async function(e) {
  e.preventDefault();

  // Pega os dados do formulário
  const form = e.target;
  const dados = {
    frequencia: form.frequencia.value,
    valor_medio: form.valor_medio.value,
    media_7dias: form.media_7dias.value,
    qtd_semana: form.qtd_semana.value,
    tempo_aposta: form.tempo_aposta.value,
    deixou_pagar: form.deixou_pagar.value,
    tentou_parar: form.tentou_parar.value,
    quer_ajuda: form.quer_ajuda.value,
    idade: form.idade.value,
    genero: form.genero.value
  };

  // Salva no banco (JSON Server deve estar rodando em localhost:3000)
  await fetch('http://localhost:3000/apostas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados)
  });

  alert('Respostas enviadas com sucesso!');
  form.reset();
});
// Exemplo para somar o campo media_7dias de todas as apostas
async function somaApostas() {
  const res = await fetch('http://localhost:3000/apostas');
  const apostas = await res.json();
  let total = 0;
  apostas.forEach(a => {
    const valor = parseFloat(a.media_7dias) || 0;
    total += valor;
  });
  alert('Total apostado (média últimos 7 dias): R$ ' + total.toFixed(2));
}
