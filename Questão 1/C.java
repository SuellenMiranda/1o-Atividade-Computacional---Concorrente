//Para colocar os threads em espera quando a conta estiver com saldo zero, podemos adicionar um laço while que verifica continuamente o saldo da conta e coloca o thread em espera caso o saldo seja zero. Podemos fazer isso dentro dos métodos de saque de cada thread, por exemplo:

public synchronized void saque() {
    while (saldo == 0) {
        try {
            System.out.println(Thread.currentThread().getName() + " em espera. Saldo zero.");
            wait();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
    if (saldo >= valorSaque) {
        saldo -= valorSaque;
        System.out.println(Thread.currentThread().getName() + " sacou " + valorSaque + " reais. Saldo atual: " + saldo);
        saquesRealizados++;
        valorTotalRetirado += valorSaque;
    } else {
        System.out.println(Thread.currentThread().getName() + " não pode sacar " + valorSaque + " reais. Saldo insuficiente.");
    }
}

//No método saque() acima, utilizamos um laço while para verificar continuamente se o saldo da conta é zero. Se for, o thread é colocado em espera com o método wait(). Quando o saldo da conta for diferente de zero, o thread é liberado da espera e continua a execução do método.

//Além disso, adicionamos duas variáveis, saquesRealizados e valorTotalRetirado, para registrar o número de saques realizados e o valor total retirado da conta por cada thread. Essas variáveis são atualizadas a cada saque realizado.

//Para imprimir a quantidade de saques efetuados e o valor total retirado da conta quando todos os threads estiverem em espera, podemos adicionar um trecho de código após a chamada dos métodos saque() de cada thread, por exemplo:

AGastadora.saque();
AEsperta.saque();
AEconomica.saque();

// Todos os threads estão em espera aqui
System.out.println("Todos os threads estão em espera.");
System.out.println("Saques realizados por AGastadora: " + AGastadora.getSaquesRealizados() + ", valor total retirado: " + AGastadora.getValorTotalRetirado());
System.out.println("Saques realizados por AEsperta: " + AEsperta.getSaquesRealizados() + ", valor total retirado: " + AEsperta.getValorTotalRetirado());
System.out.println("Saques realizados por AEconomica: " + AEconomica.getSaquesRealizados() + ", valor total retirado: " + AEconomica.getValorTotalRetirado());

//O trecho de código acima chama os métodos saque() de cada thread e depois imprime uma mensagem informando que todos os threads estão em espera. Em seguida, são impressas as informações sobre a quantidade de saques realizados e o valor total retirado da conta por cada thread, utilizando os métodos getSaquesRealizados() e getValorTotalRetirado() que adicionamos à classe ThreadSaque.

