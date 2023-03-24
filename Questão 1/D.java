//Para implementar a nova thread APatrocinadora, podemos criar uma classe que extende a classe Thread e que, quando o saldo da conta bancária for zero, realizará um depósito de R$ 100,00 e notificará as demais threads que estavam aguardando para realizar saques.

//Abaixo está o código da classe APatrocinadora:

public class APatrocinadora extends Thread {
  private Conta conta;

  public APatrocinadora(Conta conta) {
    this.conta = conta;
  }

  @Override
  public void run() {
    while (true) {
      synchronized (conta) {
        while (conta.getSaldo() != 0) {
          try {
            conta.wait();
          } catch (InterruptedException e) {
            e.printStackTrace();
          }
        }
        conta.depositar(100);
        System.out.println("Depósito de R$100,00 realizado pela thread APatrocinadora.");
        conta.notifyAll();
      }
    }
  }
}

//A thread APatrocinadora também usa a sincronização com a conta bancária e fica em um loop infinito. Quando o saldo da conta é zero, ela realiza um depósito de R$ 100,00 e notifica as outras threads para que possam verificar se já podem realizar saques novamente.

//É importante lembrar que, para que o código funcione corretamente, as demais threads (AGastadora, AEsperta e AEconomica) devem chamar o método wait() dentro do laço while quando não houver saldo suficiente na conta para realizar o saque. Quando a thread APatrocinadora realizar um depósito, ela deve chamar o método notifyAll() para notificar todas as outras threads que estavam aguardando para realizar saques.

