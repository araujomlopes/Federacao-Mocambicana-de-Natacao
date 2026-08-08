/* ==========================================================================
   BASE DE DADOS INTERNA E MOTOR DE RENDERIZAÇÃO AUTOMÁTICO DO ORGANOGRAMA
   ========================================================================== */

// 1. BASE DE DADOS CENTRALIZADA (FÁCIL ALTERAÇÃO E MANUTENÇÃO)
const dadosOrganograma = {
  mesaAssembleia: [
    { nome: 'Fernando Miguel', cargo: 'Presidente', foto: '' },
    { nome: 'Páscoa Themba', cargo: 'Vice-Presidente', foto: '' },
  ],
  conselhoFiscal: [
    { nome: 'Paulo Goque', cargo: 'Presidente', foto: '' },
    { nome: 'Paloma Rola', cargo: 'Secretário', foto: '' },
  ],
  conselhoJurisdicional: [
    { nome: 'Fernando Campini', cargo: 'Presidente', foto: '' },
    { nome: 'Lurdes Danga', cargo: 'Secretário', foto: '' },
  ],
  direccao: [
    { nome: 'Justino Francisco', cargo: 'Presidente', foto: '' },
    { nome: 'Ailson Semá', cargo: '1º Vice-presidente', foto: '' },
    { nome: 'Sergio Rodrigues', cargo: '2º Vice-presidente', foto: '' },
    { nome: 'Filipe Lobo', cargo: 'Secretário-Geral', foto: '' },
    { nome: 'Pedro Langa', cargo: 'Secretário-G. Adj.', foto: '' },
    { nome: 'Analcária Dalsuco', cargo: 'Tesouraria', foto: '' },
  ],
  comissoesApoio: [
    {
      titulo: 'Comissão Técnica',
      membros: [
        { nome: 'Filipe Túlio', cargo: 'Presidente', foto: '' },
        { nome: 'Eleutério Malate', cargo: 'Vice-Presidente', foto: '' },
        { nome: 'Azad Mabuzissane', cargo: 'Secretário', foto: '' },
        { nome: 'Aristides Gumende', cargo: 'Vogal', foto: '' },
      ],
    },
    {
      titulo: 'Comissão de Arbitragem',
      membros: [
        { nome: 'Lourenço Masc.', cargo: 'Presidente', foto: '' },
        { nome: 'M. Helena Abiatar', cargo: 'Secretária', foto: '' },
        { nome: 'Elidio João Macie', cargo: 'Relator', foto: '' },
        { nome: 'Julião Fafetine', cargo: 'Vogal', foto: '' },
      ],
    },
    {
      titulo: 'Comissão do Polo',
      membros: [
        { nome: 'Ricardo dos Santos', cargo: 'Presidente', foto: '' },
        { nome: 'Ivan Loonat', cargo: 'Vice-Presidente', foto: '' },
        { nome: 'Jose Muchanga', cargo: 'Secretário', foto: '' },
      ],
    },
    {
      titulo: 'Com. de Natação Adaptada',
      membros: [
        { nome: 'Andrea Lourenço', cargo: 'Presidente', foto: '' },
        { nome: 'José Mossiane', cargo: 'Secretário', foto: '' },
      ],
    },
    {
      titulo: 'Comissão de Saúde',
      membros: [
        { nome: 'Carolina Araújo', cargo: 'Presidente', foto: '' },
        { nome: 'Caetano Guita', cargo: 'Vice-Presidente', foto: '' },
      ],
    },
    {
      titulo: 'Comissão de Massificação',
      membros: [
        { nome: 'Dalila Tsihlakis', cargo: 'Presidente', foto: '' },
        { nome: 'Soraya Santos', cargo: 'Vice-Presidente', foto: '' },
        { nome: 'José Albasine', cargo: 'Secretário', foto: '' },
      ],
    },
    {
      titulo: 'Comissão de Águas Abertas',
      membros: [
        { nome: 'Vanusa Cândida', cargo: 'Presidente', foto: '' },
        { nome: 'Amina Matandalasse', cargo: 'Vice-Presidente', foto: '' },
      ],
    },
    {
      titulo: 'Comissão de Infra-Estruturas',
      membros: [
        { nome: 'Paulo Aliang', cargo: 'Presidente', foto: '' },
        { nome: 'Elton Mangore', cargo: 'Vice-Presidente', foto: '' },
        {
          nome: 'Araújo Lopes',
          cargo: 'Secretário',
          foto: 'assets/images/perfil_jogador/colaboradores/araujo.jpg',
        },
      ],
    },
  ],
};

// 2. TEMPLATE REUTILIZÁVEL DO CARD (MOLDE HTML UNIQUE CORRIGIDO PARA TOUCH)
function gerarCardHTML(membro) {
  let conteudoAvatar = '';

  // Verifica se a propriedade 'foto' existe e não está vazia
  if (membro.foto && membro.foto.trim() !== '') {
    // CORREÇÃO: draggable="false" impede que o telemóvel trave o toque tentando arrastar a imagem
    conteudoAvatar = `<img src="${membro.foto}" alt="${membro.nome}" draggable="false">`;
  } else {
    // Se NÃO tiver foto, injeta o ícone SVG padrão
    conteudoAvatar = `<svg><use href="#user-icon-shape"/></svg>`;
  }

  return `
        <div class="org-card">
            <div class="org-avatar">
                ${conteudoAvatar}
            </div>
            <div class="org-name">${membro.nome}</div>
            <div class="org-role">${membro.cargo}</div>
        </div>
    `;
}

// 3. EXECUÇÃO E INJEÇÃO DE DADOS APÓS O CARREGAMENTO DA PÁGINA
document.addEventListener('DOMContentLoaded', () => {
  // Função auxiliar para injetar as filas lineares padrão
  const injetarFila = (dadosLista, elementoId) => {
    const targetContainer = document.getElementById(elementoId);
    if (targetContainer) {
      targetContainer.innerHTML = dadosLista.map((membro) => gerarCardHTML(membro)).join('');
    }
  };

  // Renderiza as 4 primeiras secções horizontais
  injetarFila(dadosOrganograma.mesaAssembleia, 'render-mesa');
  injetarFila(dadosOrganograma.conselhoFiscal, 'render-fiscal');
  injetarFila(dadosOrganograma.conselhoJurisdicional, 'render-jurisdicional');
  injetarFila(dadosOrganograma.direccao, 'render-direccao');

  // Renderiza a estrutura complexa de Grid das Comissões de Apoio
  const containerComissoes = document.getElementById('render-comissoes');
  if (containerComissoes && dadosOrganograma.comissoesApoio) {
    containerComissoes.innerHTML = dadosOrganograma.comissoesApoio
      .map((comissao) => {
        // Gera os cards específicos desta comissão
        const htmlMembrosInternos = comissao.membros
          .map((membro) => gerarCardHTML(membro))
          .join('');

        // Retorna a coluna montada com o título e os seus respectivos membros
        return `
                <div class="commission-column">
                    <div class="commission-title">${comissao.titulo}</div>
                    ${htmlMembrosInternos}
                </div>
            `;
      })
      .join('');
  }
});
