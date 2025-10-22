//package com.produto.cadastro.Service;
//
//import com.produto.cadastro.Interface.CategoriaRepository;
//import com.produto.cadastro.Interface.ProdutoRepository;
//import com.produto.cadastro.Produtos.Categoria;
//import com.produto.cadastro.Produtos.Produto;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//
//@Service
//public class CategoriaService {
//
//    private final CategoriaRepository categoriasRepository;
//
//    public CategoriaService(CategoriaRepository categoriasRepository) {
//        this.categoriasRepository = categoriasRepository;
//    }
//
//
//    public List<Categoria> listaDeCategorias(){
//        return categoriasRepository.findAll();
//    }
//
//    public Categoria cadastrarCategorias(Categoria categorias){
//        return categoriasRepository.save(categorias);
//    }
//
//    public void excluirProduto(Long id){
//        categoriasRepository.deleteById(id);
//    }
//
//    public Categoria buscarCategoriaId(Long id){
//        return categoriasRepository.findById(id).orElse(null);
//    }
//
//}




package com.produto.cadastro.Service;

import com.produto.cadastro.Interface.CategoriaRepository;
import com.produto.cadastro.Produtos.Categoria;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoriaService {

    private final CategoriaRepository categoriasRepository;

    public CategoriaService(CategoriaRepository categoriasRepository) {
        this.categoriasRepository = categoriasRepository;
    }

    public List<Categoria> listaDeCategorias() {
        return categoriasRepository.findAll();
    }

    public Categoria cadastrarCategorias(Categoria categorias) {
        return categoriasRepository.save(categorias);
    }

    public void excluirCategoria(Long id) {
        categoriasRepository.deleteById(id);
    }

    public Categoria buscarCategoriaId(Long id) {
        return categoriasRepository.findById(id).orElse(null);
    }
}