
# LABMedication

Um projeto de gerenciamento de medicamentos para pacientes de um ambiente hospitalar. Nele os médicos podem cadastrar novos pacientes e realizar o controle das medicações de cada um.

Além de ser possível ver estatísticas gerais do sistema, como quantidade total de pacientes e medicamentos.

## Tecnologias utilizadas

* [Angular](https://angular.io/)
* [Typescript](https://www.typescriptlang.org/)
* [Tailwindcss](https://tailwindcss.com/)
* [ngx-mask](https://jsdaddy.github.io/ngx-mask/)

## Técnicas utilizadas

Nas funcionalidades da navbar e toast alert foi utilizado o paradgima de programação orientada a eventos. Essa implementação foi facilitada pelo Angular que já possui a classe EventEmitter para o envio das informações necessárias.

Além disso também foram utilizadas algumas técnicas de organização tanto dentro do git para versionamento, quanto na estrutura interna do projeto.

## Executando o projeto

Para realizar a execução do projeto siga os seguintes passos:

* Clonar o projeto
* Instalar as dependências com o comando _**npm install**_
* Executar o comando _**ng serve**_ para rodar o servidor de desenvolvimento local

## Melhorias a serem realizadas

* Continuar a refatoração do projeto
* Atualizar a sidebar, para quando estiver fechada mostrar opções
* Atualizar a sidebar no mobile para desaparecer por completa e preencher a tela quando for acionada
* Melhorar o toast alert para funcionar como uma lista, em vez de substituir as informações

## Dificuldades encontradas

Ao realizar o desenvolvimento da estilização da sidebar, queria que no mobile ela ficasse sobre a página para não modificar a estrutura, porém o único modo que consegui fazer isso sem alterar o funcionamento em telas maiores foi fazendo uma barra "invisível" por trás dela que some no mobile.