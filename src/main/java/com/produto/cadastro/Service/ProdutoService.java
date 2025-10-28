//package com.produto.cadastro.Service;
//
//import com.produto.cadastro.Interface.ProdutoRepository;
//import com.produto.cadastro.Produtos.Produto;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//
//@Service
//public class ProdutoService {
//
//    private final ProdutoRepository produtoRepository;
//
//    public ProdutoService(ProdutoRepository produtoRepository) {
//        this.produtoRepository = produtoRepository;
//    }
//    public List<Produto> listaDeProdutos(){
//        return produtoRepository.findAll();
//    }
//
//    public Produto cadastrarProdutos(Produto produtos){
//        return produtoRepository.save(produtos);
//    }
//
//    public void excluirProduto(Long id){
//        produtoRepository.deleteById(id);
//    }
//
//    public Produto buscarProdutoId(Long id){
//        return produtoRepository.findById(id).orElse(null);
//    }
//
//}




package com.produto.cadastro.Service;

import com.produto.cadastro.Interface.CategoriaRepository;
import com.produto.cadastro.Interface.ProdutoRepository;
import com.produto.cadastro.Produtos.Categoria;
import com.produto.cadastro.Produtos.Produto;
import com.produto.cadastro.Produtos.ProdutoDTO;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProdutoService {

    private final ProdutoRepository produtoRepository;
    private final CategoriaRepository categoriaRepository;

    public ProdutoService(ProdutoRepository produtoRepository, CategoriaRepository categoriaRepository) {
        this.produtoRepository = produtoRepository;
        this.categoriaRepository = categoriaRepository;
    }

    public List<ProdutoDTO> listaDeProdutos() {
        return produtoRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }


    public ProdutoDTO cadastrarProdutos(ProdutoDTO produtoDTO) {
        Categoria categoria = categoriaRepository.findById(produtoDTO.getCategoriaId())
                .orElseThrow(() -> new RuntimeException("Categoria não encontrada"));

        Produto produto = new Produto();
        produto.setNome(produtoDTO.getNome());
        produto.setDescricao(produtoDTO.getDescricao());
        produto.setPreco(produtoDTO.getPreco());
        produto.setCategoria(categoria);

        Produto produtoSalvo = produtoRepository.save(produto);
        return toDTO(produtoSalvo);
    }

    public void excluirProduto(Long id) {
        produtoRepository.deleteById(id);
    }

    public ProdutoDTO buscarProdutoId(Long id) {
        Produto produto = produtoRepository.findById(id).orElse(null);
        return produto != null ? toDTO(produto) : null;
    }

    public List<ProdutoDTO> buscarProdutosPorCategoria(Long categoriaId) {
        return produtoRepository.findAll().stream()
                .filter(produto -> produto.getCategoria() != null &&
                        produto.getCategoria().getId().equals(categoriaId))
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

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
}