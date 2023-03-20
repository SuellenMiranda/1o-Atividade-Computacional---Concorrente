//A ideia de dividir o vetor em várias partes e calcular a soma em threads separadas é conhecida como programação paralela. É uma técnica muito utilizada para otimizar o desempenho de algoritmos em máquinas com múltiplos núcleos de processamento.

//A classe SomaThread pode ser implementada da seguinte forma:

import java.util.concurrent.atomic.AtomicInteger;

public class SomaThread implements Runnable {

    private int[] vetor;
    private int inicio;
    private int fim;
    private AtomicInteger resultadoParcial;

    public SomaThread(int[] vetor, int inicio, int fim, AtomicInteger resultadoParcial) {
        this.vetor = vetor;
        this.inicio = inicio;
        this.fim = fim;
        this.resultadoParcial = resultadoParcial;
    }

    @Override
    public void run() {
        int soma = 0;
        for (int i = inicio; i < fim; i++) {
            soma += vetor[i];
        }
        resultadoParcial.addAndGet(soma);
    }
}

//Essa classe recebe como parâmetros o vetor de números inteiros, o índice do início e do fim da parte do vetor que será somada e um objeto AtomicInteger para armazenar o resultado parcial da soma.

//O método run() realiza a soma dos elementos do vetor no intervalo [inicio, fim) e adiciona o resultado parcial ao AtomicInteger usando o método addAndGet(int delta), que atomically adiciona o valor dado ao valor atual.

//Para calcular a soma do vetor usando threads, podemos criar um array de objetos SomaThread e iniciar cada thread usando a classe Thread. Depois disso, podemos esperar todas as threads terminarem e obter o resultado final da soma a partir do AtomicInteger.

import java.util.concurrent.atomic.AtomicInteger;

public class SomaVetor {

    public static void main(String[] args) throws InterruptedException {
        int[] vetor = new int[1000000];
        for (int i = 0; i < vetor.length; i++) {
            vetor[i] = i;
        }

        int numThreads = 10;
        SomaThread[] threads = new SomaThread[numThreads];
        AtomicInteger resultadoParcial = new AtomicInteger(0);

        for (int i = 0; i < numThreads; i++) {
            int inicio = i * (vetor.length / numThreads);
            int fim = (i + 1) * (vetor.length / numThreads);
            threads[i] = new SomaThread(vetor, inicio, fim, resultadoParcial);
            new Thread(threads[i]).start();
        }

        for (SomaThread thread : threads) {
            thread.join();
        }

        int resultadoFinal = resultadoParcial.get();
        System.out.println("Soma: " + resultadoFinal);
    }
}

//Nesse exemplo, criamos um vetor de 1 milhão de números inteiros e o preenchemos com os valores de 0 a 999999. Em seguida, criamos 10 objetos SomaThread e iniciamos uma thread para cada objeto usando a classe Thread.

//Cada thread soma uma parte do vetor e armazena o resultado parcial no AtomicInteger resultadoParcial. Depois de iniciar todas as threads, esperamos todas elas terminarem usando o método join() e obtemos o resultado final da soma a partir do AtomicInteger.

//É importante lembrar que a divisão do vetor em partes pode não ser precisa se o tamanho do vetor não for múltiplo do número de threads. Nesse caso, podemos somar



