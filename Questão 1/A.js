//Para resolver essa questão, podemos utilizar o conceito de semáforos para controlar o acesso concorrente à conta bancária, garantindo que cada thread acesse 
//o recurso de forma sincronizada e evitando que duas threads acessem o recurso ao mesmo tempo.

//Podemos criar três semáforos: um para controlar o acesso à conta bancária, outro para indicar se há saldo suficiente na conta e outro para indicar se a thread 
//gastadora pode retirar dinheiro da conta. O semáforo de acesso à conta bancária deve ser inicializado com o valor 1, enquanto os outros dois devem ser 
//inicializados com o valor 0.

//A thread gastadora deve entrar em um loop infinito que a cada 3000 milissegundos verifica se o semáforo de saldo está disponível. Se estiver disponível, a 
//thread deve tentar adquirir o semáforo de acesso à conta bancária e, se conseguir, deve verificar se há saldo suficiente para retirar 10 reais da conta. 
//Se houver, a thread deve retirar o dinheiro e liberar o semáforo de acesso à conta bancária e o semáforo de saldo. Caso contrário, a thread deve liberar 
//apenas o semáforo de saldo e aguardar um tempo antes de verificar novamente.

//A thread esperta deve seguir uma lógica similar, mas com um intervalo de verificação de 6000 milissegundos e uma tentativa de retirar 50 reais da conta. Já a 
//thread econômica deve verificar o saldo da conta apenas a cada 12000 milissegundos e tentar retirar apenas 5 reais, seguindo a mesma lógica das outras threads.

//Cada thread deve ser executada em um loop infinito e pode ser interrompida com uma flag de controle externa, caso necessário. O saldo da conta bancária pode ser 
//armazenado em uma variável compartilhada entre as threads, com um cuidado especial para evitar condições de corrida.

//Além dessas funcionalidades, outras podem ser implementadas, como um log de transações bancárias ou um mecanismo de notificação para o usuário em caso de saldo 
//baixo na conta.

//Embora React seja uma biblioteca para desenvolvimento de interfaces de usuário e não uma linguagem de programação, podemos utilizar JavaScript com React para 
//implementar a solução para essa questão.

//Para iniciar, podemos criar um componente "ContaBancaria" que irá representar a conta bancária compartilhada pelas threads. Nesse componente, podemos definir 
//o saldo inicial da conta em uma variável de estado e implementar métodos para retirar dinheiro da conta (métodos "retirar10", "retirar50" e "retirar5").

import React, { useState } from 'react';

function ContaBancaria() {
  const [saldo, setSaldo] = useState(100);

  const retirar10 = () => {
    if (saldo >= 10) {
      setSaldo(saldo - 10);
      return true;
    }
    return false;
  };

  const retirar50 = () => {
    if (saldo >= 50) {
      setSaldo(saldo - 50);
      return true;
    }
    return false;
  };

  const retirar5 = () => {
    if (saldo >= 5) {
      setSaldo(saldo - 5);
      return true;
    }
    return false;
  };

  return (
    <div>
      Saldo: {saldo}
    </div>
  );
}

export default ContaBancaria;

//Em seguida, podemos criar os componentes para cada uma das threads: "ThreadAGastadora", "ThreadAEsperta" e "ThreadAEconomica". Em cada um desses componentes, podemos utilizar o método "setInterval" para executar uma função a cada intervalo de tempo correspondente à thread. Dentro dessas funções, podemos utilizar as funções "retirar10", "retirar50" e "retirar5" da conta bancária para realizar as operações correspondentes.

import React, { useState, useEffect } from 'react';

function ThreadAGastadora({ contaBancaria }) {
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    const id = setInterval(() => {
      if (contaBancaria.retirar10()) {
        console.log('ThreadAGastadora: retirou 10 reais');
      }
    }, 3000);
    setIntervalId(id);
    return () => clearInterval(id);
  }, [contaBancaria]);

  return null;
}

function ThreadAEsperta({ contaBancaria }) {
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    const id = setInterval(() => {
      if (contaBancaria.retirar50()) {
        console.log('ThreadAEsperta: retirou 50 reais');
      }
    }, 6000);
    setIntervalId(id);
    return () => clearInterval(id);
  }, [contaBancaria]);

  return null;
}

function ThreadAEconomica({ contaBancaria }) {
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    const id = setInterval(() => {
      if (contaBancaria.retirar5()) {
        console.log('ThreadAEconomica: retirou 5 reais');
      }
    }, 12000);
    setIntervalId(id);
    return () => clearInterval(id);
  }, [contaBancaria]);

  return null;
}

//Por fim, podemos criar um componente "App" que irá renderizar a conta bancária e as threads, utilizando o componente "Conta Bancaria" como uma propriedade das 
//threads.

import React from 'react';
import ContaBancaria from './ContaBancaria';
import ThreadAGastadora from './ThreadAGastadora';
import ThreadAEsperta from './ThreadAEsperta';
import ThreadAEconomica from './ThreadAEconomica';

function App() {
  const contaBancaria = ContaBancaria();

  return (
    <div>
      <h1>Conta Bancária</h1>
      {contaBancaria}
      <h1>Threads</h1>
      <ThreadAGastadora contaBancaria={contaBancaria} />
      <ThreadAEsperta contaBancaria={contaBancaria} />
      <ThreadAEconomica contaBancaria={contaBancaria} />
    </div>
  );
}

export default App;

//Nesse exemplo, as threads irão imprimir mensagens no console quando conseguirem retirar dinheiro da conta bancária, mas poderiam executar outras ações ou 
//atualizar a interface do usuário de acordo com as regras de negócio do sistema.

//Vale ressaltar que essa implementação utiliza somente threads em JavaScript, que é uma linguagem de programação de thread único. Em outras linguagens de 
//programação, a implementação de threads pode variar.
