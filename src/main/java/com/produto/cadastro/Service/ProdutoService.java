package com.produto.cadastro.Service;

import com.produto.cadastro.Interface.ProdutoRepository;
import com.produto.cadastro.Produtos.Produto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProdutoService {

    private final ProdutoRepository produtoRepository;

    public ProdutoService(ProdutoRepository produtoRepository) {
        this.produtoRepository = produtoRepository;
    }
    public List<Produto> listaDeProdutos(){
        return produtoRepository.findAll();
    }

    public Produto cadastrarProdutos(Produto produtos){
        return produtoRepository.save(produtos);
    }

    public void excluirProduto(Long id){
        produtoRepository.deleteById(id);
    }

    public Produto buscarProdutoId(Long id){
        return produtoRepository.findById(id).orElse(null);
    }

}
