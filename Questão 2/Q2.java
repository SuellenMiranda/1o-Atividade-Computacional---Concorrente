//Para resolver esse problema, podemos utilizar threads para processar simultaneamente todos os arquivos de cada curso de graduação. Cada thread vai ler um arquivo e buscar por alunos com a flag "CONCLUÍDO", adicionando esses alunos a uma lista compartilhada.

//Para implementar isso em Java, podemos criar uma classe Aluno com os atributos matrícula, nome, curso e status, e uma classe que representa cada thread de processamento, chamada de ProcessaArquivoThread. Essa classe recebe como parâmetro o caminho do arquivo que será processado e uma lista compartilhada de alunos formandos. No método run(), a thread lê o arquivo, verifica se o status do aluno é "CONCLUÍDO" e, se for, adiciona o aluno à lista compartilhada.

//Além disso, precisamos de uma classe principal, que cria uma lista compartilhada de alunos formandos e inicia uma thread para cada arquivo de cada curso de graduação.

//Segue abaixo o código implementado:

import java.io.BufferedReader;
import java.io.FileReader;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class Formandos {

    public static void main(String[] args) {
        String[] cursos = {"COMPUTACAO.TXT", "ENGENHARIA.TXT", "MEDICINA.TXT"}; // lista dos arquivos de cursos
        List<String> formandos = new ArrayList<>(); // lista compartilhada entre as threads
        ExecutorService executor = Executors.newFixedThreadPool(cursos.length); // cria um pool de threads com o tamanho da lista de cursos
        
        for (String curso : cursos) {
            Runnable tarefa = new BuscaFormandos(curso, formandos); // cria uma tarefa para cada arquivo de curso
            executor.execute(tarefa); // executa a tarefa na thread pool
        }
        
        executor.shutdown(); // espera todas as threads finalizarem
        
        while (!executor.isTerminated()) { // espera as threads finalizarem
            Thread.yield();
        }
        
        System.out.println("Formandos:");
        for (String aluno : formandos) {
            System.out.println(aluno);
        }
    }
}

class BuscaFormandos implements Runnable {
    private String arquivo;
    private List<String> formandos;
    
    public BuscaFormandos(String arquivo, List<String> formandos) {
        this.arquivo = arquivo;
        this.formandos = formandos;
    }
    
    @Override
    public void run() {
        try (BufferedReader br = new BufferedReader(new FileReader(arquivo))) {
            String linha;
            while ((linha = br.readLine()) != null) {
                String[] dados = linha.split(" ");
                String flag = dados[dados.length - 1];
                if (flag.equals("CONCLUÍDO")) {
                    formandos.add(linha);
                }
            }
        } catch (Exception e) {
            System.err.println("Erro na leitura do arquivo " + arquivo + ": " + e.getMessage());
        }
    }
}

//Neste exemplo, criamos uma classe BuscaFormandos que implementa a interface Runnable. Cada objeto desta classe é uma tarefa que será executada em uma thread separada. O construtor da classe recebe o nome do arquivo de curso e a lista de formandos compartilhada entre as threads.

//Dentro do método run(), a classe lê cada linha do arquivo e verifica se a flag de conclusão de curso é "CONCLUÍDO". Se for, adiciona a linha na lista de formandos.

//No método main(), criamos uma lista de arquivos de cursos e uma lista de formandos compartilhada. Em seguida, criamos uma thread para cada arquivo de curso, executando a tarefa BuscaFormandos na thread pool. Depois, aguardamos as threads finalizarem e exibimos a lista de formandos encontrados.
