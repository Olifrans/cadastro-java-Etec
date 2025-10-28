

# ProdutoDTO - Data Transfer Object (Objeto de Transferência de Dados)

O **ProdutoDTO** é um padrão de projeto utilizado para transferir dados entre diferentes camadas da aplicação, especialmente entre o backend e frontend. Vou explicar em detalhes:

## O que é um DTO?

DTO significa **Data Transfer Object** (Objeto de Transferência de Dados). É um objeto que carrega dados entre processos, sem qualquer comportamento de negócio.

## Por que usar DTO?

### 1. **Separação de Concerns**
```java
// ENTIDADE (Modelo de Domínio)
public class Produto {
    private Long id;
    private String nome;
    private String descricao;
    private Double preco;
    private Categoria categoria;  // Objeto completo
}

// DTO (Para transferência)
public class ProdutoDTO {
    private Long id;
    private String nome;
    private String descricao;
    private Double preco;
    private Long categoriaId;      // Apenas o ID
    private String categoriaNome;  // Apenas o nome
}
```

### 2. **Evitar Exposição de Dados Sensíveis**
```java
// Entidade pode ter dados internos
public class Usuario {
    private String senha;
    private String tokenRecuperacao;
    // ... outros campos sensíveis
}

// DTO expõe apenas o necessário
public class UsuarioDTO {
    private String nome;
    private String email;
    // Nenhum dado sensível
}
```

### 3. **Otimização de Performance**
```java
// SEM DTO - Carrega objeto completo com relacionamentos
Produto produto = produtoRepository.findById(id);
// Carrega: Produto + Categoria + todos os relacionamentos

// COM DTO - Carrega apenas dados necessários
ProdutoDTO produtoDTO = produtoService.buscarProdutoId(id);
// Carrega apenas: id, nome, descricao, preco, categoriaId, categoriaNome
```

## No Código: ProdutoDTO

```java
package com.produto.cadastro.Produtos;

public class ProdutoDTO {
    private Long id;
    private String nome;
    private String descricao;
    private Double preco;
    private Long categoriaId;      // ID para referência
    private String categoriaNome;  // Nome para exibição

    // Construtor que recebe a entidade Produto
    public ProdutoDTO(Produto produto) {
        this.id = produto.getId();
        this.nome = produto.getNome();
        this.descricao = produto.getDescricao();
        this.preco = produto.getPreco();
        
        // Tratamento seguro para evitar NullPointerException
        if (produto.getCategoria() != null) {
            this.categoriaId = produto.getCategoria().getId();
            this.categoriaNome = produto.getCategoria().getNome();
        }
    }
}
```

## Vantagens no Seu Projeto

### 1. **Evita Referência Circular**
```java
// PROBLEMA: Referência circular
Categoria → List<Produto> → Categoria → List<Produto>...

// SOLUÇÃO com DTO
Categoria → não referencia produtos diretamente
ProdutoDTO → contém apenas categoriaId e categoriaNome
```

### 2. **Controle de Dados Expostos**
```java
// Backend controla o que envia
public ProdutoDTO toDTO(Produto produto) {
    return new ProdutoDTO(
        produto.getId(),
        produto.getNome(),
        produto.getDescricao(), 
        produto.getPreco(),
        produto.getCategoria() != null ? produto.getCategoria().getId() : null,
        produto.getCategoria() != null ? produto.getCategoria().getNome() : null
    );
}
```

### 3. **Flexibilidade para o Frontend**
```java
// Frontend recebe dados prontos para uso
{
    "id": 1,
    "nome": "Notebook Dell",
    "descricao": "Notebook i7 16GB RAM",
    "preco": 3500.00,
    "categoriaId": 2,
    "categoriaNome": "Eletrônicos"
    // Dados planos e fáceis de consumir
}
```

## Fluxo de Dados com DTO

```
[ENTIDADE] → [SERVICE] → [DTO] → [CONTROLLER] → [JSON] → [FRONTEND]
   Produto     (toDTO)   ProdutoDTO   (@RestController)   (JavaScript)
```

### Exemplo Prático:

```java
// Service converte Entidade para DTO
private ProdutoDTO toDTO(Produto produto) {
    return new ProdutoDTO(
        produto.getId(),
        produto.getNome(),
        produto.getDescricao(),
        produto.getPreco(),
        produto.getCategoria() != null ? produto.getCategoria().getId() : null,
        produto.getCategoria() != null ? produto.getCategoria().getNome() : null
    );
}

// Controller retorna DTO (não a entidade)
@GetMapping("/{id}")
public ProdutoDTO buscarProdutoPeloId(@PathVariable Long id) {
    return service.buscarProdutoId(id); // Retorna ProdutoDTO, não Produto
}
```

## Quando Usar DTO?

| Cenário | Recomendação |
|---------|-------------|
| API REST | ✅ **SEMPRE** use DTO |
| Dados para frontend | ✅ **SEMPRE** use DTO |
| Comunicação entre microsserviços | ✅ **SEMPRE** use DTO |
| Operações internas no backend | ⚠️ Pode usar entidades |
| JPA/Hibernate (camada de persistência) | ❌ Não use DTO |

## Resumo

O **ProdutoDTO** no projeto:
- ✅ **Separa** a camada de domínio da camada de apresentação
- ✅ **Otimiza** as consultas (evita LazyLoading exceptions)
- ✅ **Controla** quais dados são expostos na API
- ✅ **Facilita** o consumo pelo frontend
- ✅ **Evita** problemas de serialização JSON
