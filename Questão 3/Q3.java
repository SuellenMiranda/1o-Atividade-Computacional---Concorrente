//Para implementar essa solução concorrente, podemos utilizar a classe CompletableFuture do Java, que permite que operações assíncronas sejam executadas de forma concorrente e possam ser combinadas em um único resultado.

//Podemos começar criando uma classe Lanche que terá os métodos getPipoca(), getRefrigerante() e lanchePronto(). Esses métodos serão executados de forma concorrente e precisam ser combinados em um único resultado. Para isso, podemos utilizar o método thenCombine() da classe CompletableFuture.

//Segue abaixo um exemplo de implementação em Java:

import java.util.concurrent.CompletableFuture;

public class Lanche {
    private CompletableFuture<String> pipoca;
    private CompletableFuture<String> refrigerante;

    public Lanche() {
        this.pipoca = CompletableFuture.supplyAsync(() -> getPipoca());
        this.refrigerante = CompletableFuture.supplyAsync(() -> getRefrigerante());
    }

    public String getPipoca() {
        try {
            Thread.sleep(5000); // Simulando o tempo para fazer a pipoca
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return "Pipoca Pronta";
    }

    public String getRefrigerante() {
        try {
            Thread.sleep(3000); // Simulando o tempo para fazer o refrigerante
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return "Refrigerante Pronto";
    }

    public String lanchePronto() {
        CompletableFuture<String> combinado = pipoca.thenCombine(refrigerante, (pipoca, refrigerante) -> {
            return "Lanche Pronto: " + pipoca + " e " + refrigerante;
        });
        return combinado.join();
    }
}

//No exemplo acima, criamos as CompletableFuture para a pipoca e o refrigerante no construtor da classe Lanche. Em seguida, implementamos os métodos getPipoca() e getRefrigerante(), que retornam as strings "Pipoca Pronta" e "Refrigerante Pronto", respectivamente, após simular o tempo para fazer cada um.

//Por fim, temos o método lanchePronto(), que utiliza o método thenCombine() para combinar os resultados das CompletableFuture da pipoca e do refrigerante e retornar a string "Lanche Pronto: Pipoca Pronta e Refrigerante Pronto".

//Assim, quando o cliente pedir um lanche, o método lanchePronto() será chamado e retornará a string "Lanche Pronto: Pipoca Pronta e Refrigerante Pronto" somente após a finalização da preparação da pipoca e do refrigerante de forma concorrente.
