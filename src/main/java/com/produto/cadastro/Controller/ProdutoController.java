//package com.produto.cadastro.Controller;
//
//import com.produto.cadastro.Produtos.Produto;
//import com.produto.cadastro.Service.ProdutoService;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/produtos")
//public class ProdutoController {
//    private final ProdutoService service;
//
//    public ProdutoController(ProdutoService service) {
//        this.service = service;
//    }
//
//    @GetMapping
//    public List<Produto> carregaProdutos(){
//        return  service.listaDeProdutos();
//    }
//
//    @PostMapping
//    public Produto salvaNovoPruduto(@RequestBody Produto produtos){
//        return service.cadastrarProdutos(produtos);
//    }
//
//    @DeleteMapping("/{id}")
//    public void deletarProduto(@PathVariable Long id){
//        service.excluirProduto(id);
//    }
//
//    @GetMapping("/{id}")
//    public Produto buscarPrudutoPeloId(@PathVariable Long id){
//        return service.buscarProdutoId(id);
//    }
//
//}




package com.produto.cadastro.Controller;

import com.produto.cadastro.Produtos.ProdutoDTO;
import com.produto.cadastro.Service.ProdutoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/produtos")
@CrossOrigin(origins = "http://localhost:8080") // Permite apenas nesta origem
public class ProdutoController {
    private final ProdutoService service;

    public ProdutoController(ProdutoService service) {
        this.service = service;
    }

    @GetMapping
    public List<ProdutoDTO> carregaProdutos() {
        return service.listaDeProdutos();
    }

    @PostMapping
    public ProdutoDTO salvaNovoProduto(@RequestBody ProdutoDTO produtoDTO) {
        return service.cadastrarProdutos(produtoDTO);
    }

    @DeleteMapping("/{id}")
    public void deletarProduto(@PathVariable Long id) {
        service.excluirProduto(id);
    }

    @GetMapping("/{id}")
    public ProdutoDTO buscarProdutoPeloId(@PathVariable Long id) {
        return service.buscarProdutoId(id);
    }

    @GetMapping("/categoria/{categoriaId}")
    public List<ProdutoDTO> buscarProdutosPorCategoria(@PathVariable Long categoriaId) {
        return service.buscarProdutosPorCategoria(categoriaId);
    }
}