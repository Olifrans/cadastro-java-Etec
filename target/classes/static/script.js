

    // Base URL da API - ajuste conforme necessário
    const API_BASE_URL = 'http://localhost:8080';

    // Elementos do DOM
    const menuItems = document.querySelectorAll('.menu-item');
    const sections = document.querySelectorAll('.section');
    const pageTitle = document.getElementById('page-title');

    // Elementos do Dashboard
    const totalProdutosEl = document.getElementById('total-produtos');
    const totalCategoriasEl = document.getElementById('total-categorias');
    const valorMedioEl = document.getElementById('valor-medio');
    const produtosSemCategoriaEl = document.getElementById('produtos-sem-categoria');
    const produtosRecentesEl = document.getElementById('produtos-recentes');


    // Elementos da lista de produtos
    const listaProdutosEl = document.getElementById('lista-produtos');
    const novoProdutoBtn = document.getElementById('novo-produto');
    const refreshListaProdutosBtn = document.getElementById('refresh-lista-produtos');

    // Elementos das categorias
    const formCategoria = document.getElementById('form-categoria');
    const listaCategoriasEl = document.getElementById('lista-categorias');
    const refreshCategoriasBtn = document.getElementById('refresh-categorias');

    // Elementos dos relatórios
    const produtosPorCategoriaEl = document.getElementById('produtos-por-categoria');
    const produtoMaisCaroEl = document.getElementById('produto-mais-caro');
    const produtoMaisBaratoEl = document.getElementById('produto-mais-barato');
    const valorTotalEstoqueEl = document.getElementById('valor-total-estoque');
    const estatisticasDetalhadasEl = document.getElementById('estatisticas-detalhadas');

    // Elementos do modal de produto
    const modalProduto = document.getElementById('modal-produto');
    const modalProdutoTitle = document.getElementById('modal-produto-title');
    const formProduto = document.getElementById('form-produto');
    const produtoIdEl = document.getElementById('produto-id');
    const produtoNomeEl = document.getElementById('produto-nome');
    const produtoDescricaoEl = document.getElementById('produto-descricao');
    const produtoPrecoEl = document.getElementById('produto-preco');
    const produtoCategoriaEl = document.getElementById('produto-categoria');
    const salvarProdutoBtn = document.getElementById('salvar-produto');
    const cancelarProdutoBtn = document.getElementById('cancelar-produto');
    const modalCloseBtns = document.querySelectorAll('.modal-close');

    // Dados em cache
    let produtos = [];
    let categorias = [];

    // Inicialização
    document.addEventListener('DOMContentLoaded', function() {
        // Configurar navegação do menu
        menuItems.forEach(item => {
            item.addEventListener('click', function() {
                const sectionId = this.getAttribute('data-section');
                showSection(sectionId);

                // Atualizar menu ativo
                menuItems.forEach(i => i.classList.remove('active'));
                this.classList.add('active');
            });
        });

        // Configurar botões
        novoProdutoBtn.addEventListener('click', () => openProdutoModal());
        refreshListaProdutosBtn.addEventListener('click', () => carregarProdutos());
        refreshCategoriasBtn.addEventListener('click', () => carregarCategorias());
        document.getElementById('refresh-produtos').addEventListener('click', () => carregarDashboard());

        // Configurar formulários
        formCategoria.addEventListener('submit', salvarCategoria);
        salvarProdutoBtn.addEventListener('click', salvarProduto);
        cancelarProdutoBtn.addEventListener('click', () => closeModal(modalProduto));

        // Configurar fechamento de modais
        modalCloseBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const modal = this.closest('.modal');
                closeModal(modal);
            });
        });

        // Fechar modal ao clicar fora
        window.addEventListener('click', function(event) {
            if (event.target.classList.contains('modal')) {
                closeModal(event.target);
            }
        });

        // Carregar dados iniciais
        carregarDashboard();
        carregarCategorias();
    });

    // Funções de navegação
    function showSection(sectionId) {
        sections.forEach(section => {
            section.classList.remove('active');
        });

        document.getElementById(`${sectionId}-section`).classList.add('active');

        // Atualizar título da página
        const titles = {
            'dashboard': 'Dashboard',
            'produtos': 'Produtos',
            'categorias': 'Categorias',
            'relatorios': 'Relatórios'
        };
        pageTitle.textContent = titles[sectionId];

        // Carregar dados específicos da seção
        if (sectionId === 'produtos') {
            carregarProdutos();
        } else if (sectionId === 'relatorios') {
            carregarRelatorios();
        }
    }

    // Funções da API
    async function fetchProdutos() {
        try {
            const response = await fetch(`${API_BASE_URL}/produtos`);
            if (!response.ok) throw new Error('Erro ao carregar produtos');
            produtos = await response.json();
            return produtos;
        } catch (error) {
            console.error('Erro:', error);
            showNotification('Erro ao carregar produtos', 'error');
            return [];
        }
    }

    async function fetchCategorias() {
        try {
            const response = await fetch(`${API_BASE_URL}/categorias`);
            if (!response.ok) throw new Error('Erro ao carregar categorias');
            categorias = await response.json();
            return categorias;
        } catch (error) {
            console.error('Erro:', error);
            showNotification('Erro ao carregar categorias', 'error');
            return [];
        }
    }

    async function salvarProdutoAPI(produto) {
        try {
            const url = produto.id ? `${API_BASE_URL}/produtos/${produto.id}` : `${API_BASE_URL}/produtos`;
            const method = produto.id ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(produto)
            });

            if (!response.ok) throw new Error('Erro ao salvar produto');

            const produtoSalvo = await response.json();
            showNotification('Produto salvo com sucesso!', 'success');
            closeModal(modalProduto);
            carregarProdutos();
            carregarDashboard();
            return produtoSalvo;
        } catch (error) {
            console.error('Erro:', error);
            showNotification('Erro ao salvar produto', 'error');
        }
    }

    async function excluirProdutoAPI(id) {
        try {
            const response = await fetch(`${API_BASE_URL}/produtos/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) throw new Error('Erro ao excluir produto');

            showNotification('Produto excluído com sucesso!', 'success');
            carregarProdutos();
            carregarDashboard();
        } catch (error) {
            console.error('Erro:', error);
            showNotification('Erro ao excluir produto', 'error');
        }
    }

    async function salvarCategoriaAPI(categoria) {
        try {
            const response = await fetch(`${API_BASE_URL}/categorias`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(categoria)
            });

            if (!response.ok) throw new Error('Erro ao salvar categoria');

            const categoriaSalva = await response.json();
            showNotification('Categoria salva com sucesso!', 'success');
            formCategoria.reset();
            carregarCategorias();
            carregarDashboard();
            return categoriaSalva;
        } catch (error) {
            console.error('Erro:', error);
            showNotification('Erro ao salvar categoria', 'error');
        }
    }

    async function excluirCategoriaAPI(id) {
        try {
            const response = await fetch(`${API_BASE_URL}/categorias/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) throw new Error('Erro ao excluir categoria');

            showNotification('Categoria excluída com sucesso!', 'success');
            carregarCategorias();
            carregarDashboard();
        } catch (error) {
            console.error('Erro:', error);
            showNotification('Erro ao excluir categoria', 'error');
        }
    }

    // Funções de carregamento de dados
    async function carregarDashboard() {
        await fetchProdutos();
        await fetchCategorias();

        // Atualizar cards do dashboard
        totalProdutosEl.textContent = produtos.length;
        totalCategoriasEl.textContent = categorias.length;

        // Calcular valor médio
        const precoTotal = produtos.reduce((sum, produto) => sum + (produto.preco || 0), 0);
        const valorMedio = produtos.length > 0 ? precoTotal / produtos.length : 0;
        valorMedioEl.textContent = `R$ ${valorMedio.toFixed(2)}`;

        // Calcular produtos sem categoria
        const produtosSemCategoria = produtos.filter(p => !p.categoriaId).length;
        produtosSemCategoriaEl.textContent = produtosSemCategoria;

        // Carregar produtos recentes (últimos 5)
        const produtosRecentes = produtos.slice(-5).reverse();
        produtosRecentesEl.innerHTML = produtosRecentes.map(produto => `
            <tr>
                <td>${produto.nome}</td>
                <td>${produto.descricao || '-'}</td>
                <td>R$ ${produto.preco?.toFixed(2) || '0,00'}</td>
                <td>${produto.categoriaNome || 'Sem categoria'}</td>
                <td>
                    <button class="btn btn-outline btn-sm" onclick="editarProduto(${produto.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="excluirProduto(${produto.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    }

    async function carregarProdutos() {
        await fetchProdutos();

        listaProdutosEl.innerHTML = produtos.map(produto => `
            <tr>
                <td>${produto.id}</td>
                <td>${produto.nome}</td>
                <td>${produto.descricao || '-'}</td>
                <td>R$ ${produto.preco?.toFixed(2) || '0,00'}</td>
                <td>${produto.categoriaNome || 'Sem categoria'}</td>
                <td>
                    <button class="btn btn-outline btn-sm" onclick="editarProduto(${produto.id})">
                        <i class="fas fa-edit"></i> Editar
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="excluirProduto(${produto.id})">
                        <i class="fas fa-trash"></i> Excluir
                    </button>
                </td>
            </tr>
        `).join('');
    }

    async function carregarCategorias() {
        await fetchCategorias();
        await fetchProdutos();

        // Atualizar select de categorias no modal de produto
        produtoCategoriaEl.innerHTML = `
            <option value="">Selecione uma categoria</option>
            ${categorias.map(cat => `
                <option value="${cat.id}">${cat.nome}</option>
            `).join('')}
        `;

        // Calcular quantidade de produtos por categoria
        const categoriasComQuantidade = categorias.map(categoria => {
            const quantidade = produtos.filter(p => p.categoriaId === categoria.id).length;
            return { ...categoria, quantidade };
        });

        listaCategoriasEl.innerHTML = categoriasComQuantidade.map(categoria => `
            <tr>
                <td>${categoria.id}</td>
                <td>${categoria.nome}</td>
                <td>${categoria.quantidade}</td>
                <td>
                    <button class="btn btn-danger btn-sm" onclick="excluirCategoria(${categoria.id})">
                        <i class="fas fa-trash"></i> Excluir
                    </button>
                </td>
            </tr>
        `).join('');
    }

    async function carregarRelatorios() {
        await fetchProdutos();
        await fetchCategorias();

        // Produtos por categoria
        const categoriasComProdutos = categorias.map(cat => {
            const produtosNaCategoria = produtos.filter(p => p.categoriaId === cat.id).length;
            return { nome: cat.nome, quantidade: produtosNaCategoria };
        });

        produtosPorCategoriaEl.textContent = categoriasComProdutos.length;

        // Produto mais caro e mais barato
        const precos = produtos.map(p => p.preco || 0).filter(p => p > 0);
        const produtoMaisCaro = precos.length > 0 ? Math.max(...precos) : 0;
        const produtoMaisBarato = precos.length > 0 ? Math.min(...precos) : 0;

        produtoMaisCaroEl.textContent = `R$ ${produtoMaisCaro.toFixed(2)}`;
        produtoMaisBaratoEl.textContent = `R$ ${produtoMaisBarato.toFixed(2)}`;

        // Valor total em estoque
        const valorTotal = produtos.reduce((sum, produto) => sum + (produto.preco || 0), 0);
        valorTotalEstoqueEl.textContent = `R$ ${valorTotal.toFixed(2)}`;

        // Estatísticas detalhadas
        estatisticasDetalhadasEl.innerHTML = `
            <tr>
                <td>Total de Produtos</td>
                <td>${produtos.length}</td>
                <td>Quantidade total de produtos cadastrados</td>
            </tr>
            <tr>
                <td>Total de Categorias</td>
                <td>${categorias.length}</td>
                <td>Quantidade total de categorias cadastradas</td>
            </tr>
            <tr>
                <td>Produtos sem Categoria</td>
                <td>${produtos.filter(p => !p.categoriaId).length}</td>
                <td>Produtos que não estão associados a uma categoria</td>
            </tr>
            <tr>
                <td>Valor Médio dos Produtos</td>
                <td>R$ ${(valorTotal / (produtos.length || 1)).toFixed(2)}</td>
                <td>Preço médio dos produtos cadastrados</td>
            </tr>
        `;
    }

    // Funções do modal de produto
    function openProdutoModal(produto = null) {
        if (produto) {
            // Modo edição
            modalProdutoTitle.textContent = 'Editar Produto';
            produtoIdEl.value = produto.id;
            produtoNomeEl.value = produto.nome;
            produtoDescricaoEl.value = produto.descricao || '';
            produtoPrecoEl.value = produto.preco || '';
            produtoCategoriaEl.value = produto.categoriaId || '';
        } else {
            // Modo criação
            modalProdutoTitle.textContent = 'Novo Produto';
            formProduto.reset();
            produtoIdEl.value = '';
        }

        openModal(modalProduto);
    }

    async function salvarProduto() {
        const produto = {
            nome: produtoNomeEl.value,
            descricao: produtoDescricaoEl.value,
            preco: parseFloat(produtoPrecoEl.value),
            categoriaId: parseInt(produtoCategoriaEl.value)
        };

        if (produtoIdEl.value) {
            produto.id = parseInt(produtoIdEl.value);
        }

        await salvarProdutoAPI(produto);
    }

    async function editarProduto(id) {
        const produto = produtos.find(p => p.id === id);
        if (produto) {
            openProdutoModal(produto);
        }
    }

    async function excluirProduto(id) {
        if (confirm('Tem certeza que deseja excluir este produto?')) {
            await excluirProdutoAPI(id);
        }
    }

    async function salvarCategoria(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const nome = formData.get('categoria-nome') || document.getElementById('categoria-nome').value;

        const categoria = {
            nome: nome
        };

        await salvarCategoriaAPI(categoria);
    }

    async function excluirCategoria(id) {
        if (confirm('Tem certeza que deseja excluir esta categoria?')) {
            await excluirCategoriaAPI(id);
        }
    }

    // Funções utilitárias
    function openModal(modal) {
        modal.style.display = 'flex';
    }

    function closeModal(modal) {
        modal.style.display = 'none';
    }

    function showNotification(message, type = 'info') {
        // Criar elemento de notificação
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'exclamation-triangle' : 'info'}"></i>
                <span>${message}</span>
            </div>
        `;

        // Adicionar estilos para a notificação
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#4cc9f0' : type === 'error' ? '#f72585' : '#4361ee'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 5px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            z-index: 3000;
            animation: slideIn 0.3s ease;
        `;

        document.body.appendChild(notification);

        // Remover após 3 segundos
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Adicionar estilos de animação para notificações
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }

        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);


