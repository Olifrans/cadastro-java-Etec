//package com.produto.cadastro.Controller;
//
//import com.produto.cadastro.Produtos.Categoria;
//import com.produto.cadastro.Produtos.Produto;
//import com.produto.cadastro.Service.CategoriaService;
//import com.produto.cadastro.Service.ProdutoService;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/categorias")
//public class CategoriaController {
//    private final CategoriaService service;
//
//    public CategoriaController(CategoriaService service) {
//        this.service = service;
//    }
//
//
//    @GetMapping
//    public List<Categoria> carregaCategorias(){
//        return  service.listaDeCategorias();
//    }
//
//    @PostMapping
//    public Categoria salvaNovocategorias(@RequestBody Categoria categorias){
//        return service.cadastrarCategorias(categorias);
//    }
//
//    @DeleteMapping("/{id}")
//    public void deletarCategoria(@PathVariable Long id){
//        service.excluirProduto(id);
//    }
//
//    @GetMapping("/{id}")
//    public Categoria buscarCategoriasPeloId(@PathVariable Long id){
//        return service.buscarCategoriaId(id);
//    }
//
//}


package com.produto.cadastro.Controller;

import com.produto.cadastro.Produtos.Categoria;
import com.produto.cadastro.Service.CategoriaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categorias")
public class CategoriaController {
    private final CategoriaService service;

    public CategoriaController(CategoriaService service) {
        this.service = service;
    }

    @GetMapping
    public List<Categoria> carregaCategorias() {
        return service.listaDeCategorias();
    }

    @PostMapping
    public Categoria salvaNovaCategoria(@RequestBody Categoria categoria) {
        return service.cadastrarCategorias(categoria);
    }

    @DeleteMapping("/{id}")
    public void deletarCategoria(@PathVariable Long id) {
        service.excluirCategoria(id);
    }

    @GetMapping("/{id}")
    public Categoria buscarCategoriaPeloId(@PathVariable Long id) {
        return service.buscarCategoriaId(id);
    }
}