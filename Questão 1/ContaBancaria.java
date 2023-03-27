**UML (Unified Modeling Language)**

ContaBancaria
------------------------
- numeroConta: int
- titularConta: String
- saldo: double
------------------------
+ ContaBancaria(numeroConta: int, titularConta: String, saldoInicial: double)
+ getNumeroConta(): int
+ setNumeroConta(numeroConta: int): void
+ getTitularConta(): String
+ setTitularConta(titularConta: String): void
+ getSaldo(): double
+ deposito(valor: double): void
+ saque(valor: double): boolean
+ toString(): String
------------------------
