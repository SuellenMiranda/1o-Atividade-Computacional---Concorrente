//Para atender aos requisitos da Questão 01B, podemos criar uma classe ContaBancaria em Java que representa a conta bancária compartilhada pelas threads. A classe deve conter os seguintes atributos: numeroConta, titularConta e saldo. Além disso, deve ter construtores, getters/setters, método toString, validação para número de conta negativo e implementação dos métodos deposito e saque para manipulação do saldo da conta.

//Segue abaixo um esboço de diagrama de classes para a solução: no arquivo ContaBancaria.php

//Para evitar problemas de concorrência, podemos utilizar o recurso de sincronização do Java, utilizando a palavra-chave synchronized em métodos ou blocos críticos que manipulam o saldo da conta. Isso garante que apenas uma thread por vez acesse o recurso compartilhado.

//Segue abaixo uma possível implementação da classe ContaBancaria em Java:

public class ContaBancaria {
    private int numeroConta;
    private String titularConta;
    private double saldo;

    public ContaBancaria(int numeroConta, String titularConta, double saldoInicial) {
        this.numeroConta = numeroConta;
        this.titularConta = titularConta;
        this.saldo = saldoInicial;
    }

    public synchronized int getNumeroConta() {
        return numeroConta;
    }

    public synchronized void setNumeroConta(int numeroConta) {
        this.numeroConta = numeroConta;
    }

    public synchronized String getTitularConta() {
        return titularConta;
    }

    public synchronized void setTitularConta(String titularConta) {
        this.titularConta = titularConta;
    }

    public synchronized double getSaldo() {
        return saldo;
    }

    public synchronized void deposito(double valor) {
        saldo += valor;
        System.out.println("Depósito efetuado: +" + valor + " | Saldo atual: " + saldo);
    }

    public synchronized boolean saque(double valor) {
        if (saldo >= valor) {
            saldo -= valor;
            System.out.println("Saque efetuado: -" + valor + " | Saldo atual: " + saldo);
            return true;
        }
        return false;
    }

    @Override
    public synchronized String toString() {
        return "ContaBancaria{" +
                "numeroConta=" + numeroConta +
                ", titularConta='" + titularConta + '\'' +
                ", saldo=" + saldo +
                '}';
    }
}

//Dessa forma, a classe ContaBancaria pode ser utilizada pelas threads ThreadAGastadora, ThreadAEsperta e ThreadAEconomica para realizar saques e depósitos na conta bancária compartilhada. É importante destacar que cada thread deve ser sincronizada para acessar o objeto ContaBancaria, garantindo a integridade dos dados compartilhados.
