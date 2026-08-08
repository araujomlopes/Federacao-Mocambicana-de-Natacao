/**
 * Organograma Interativo Enterprise
 * Gerencia acessibilidade, estados focados e tratamento de dados dos cliques.
 */
document.addEventListener('DOMContentLoaded', () => {
  // Seleciona todos os cards estruturais do organograma
  const cards = document.querySelectorAll('.org-card');

  /**
   * Remove o estado ativo de todos os cards da árvore
   */
  const clearActiveStates = () => {
    cards.forEach((card) => card.classList.remove('active'));
  };

  /**
   * Inicializa os ouvintes de evento para cada card
   */
  cards.forEach((card) => {
    // Suporte para clique do mouse e toque em telas mobile
    card.addEventListener('click', (event) => {
      // Evita propagações indesejadas caso existam elementos internos clicáveis
      event.stopPropagation();

      // Se o card já estiver ativo, remove o destaque. Caso contrário, ativa-o.
      if (card.classList.contains('active')) {
        card.classList.remove('active');
      } else {
        clearActiveStates();
        card.classList.add('active');

        // Captura os dados dinâmicos do card clicado para integrações futuras
        const colaborador = {
          nome: card.querySelector('.name')?.textContent.trim() || '',
          cargo: card.querySelector('.role')?.textContent.trim() || '',
          departamento: card.getAttribute('data-dept') || 'Não Especificado',
        };

        // Pipeline pronto para integração com Modais, Painéis Laterais ou requisições de API
        handleCardSelection(colaborador);
      }
    });

    // Acessibilidade: Permite navegar e selecionar cards usando a tecla 'Enter' ou 'Espaço'
    card.setAttribute('tabindex', '0');
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        card.click();
      }
    });
  });

  /**
   * Função Hub para manipulação de dados pós-clique
   * @param {Object} dados - Objeto contendo nome, cargo e setor do colaborador focado
   */
  function handleCardSelection(dados) {
    // Log técnico útil para validação em ambiente de desenvolvimento
    console.log(`[Organograma] Membro Selecionado:`, dados);

    // Exemplo de uso futuro:
    // abrirModalMembro(dados);
  }
});
