# Sistema de Feiras de Comércio Justo

Bem-vindo ao projeto de **Sistema de Feiras de Comércio Justo**, uma plataforma web desenvolvida para conectar produtores rurais locais com consumidores. Este projeto foi desenvolvido como parte das atividades acadêmicas do curso.

https://www.canva.com/design/DAGXyi1CMXE/rvf6nxG7ukGwro9Yk-97dA/edit?utm_content=DAGXyi1CMXE&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton

## Equipe

- Gabriel Guzzatti: Frontend
- Gabriel Milano: UI/UX
- Paulo Francisconi: Gerenciamento de projeto
- Matheus Leal: Backend


## Professor

- Ramon Venson

## Descrição do Projeto

O Sistema de Feiras de Comércio Justo tem como objetivo facilitar a conexão entre produtores rurais e consumidores em Criciúma, oferecendo uma plataforma onde os usuários podem:

- **Visualizar Feiras**: Informações sobre feiras de comércio justo, incluindo datas, locais e participantes.
- **Cadastrar Feirantes**: Feirantes podem se cadastrar, adicionar informações sobre seus produtos, fotos e as feiras nas quais participarão.
- **Acompanhar Feiras e Produtos**: Consumidores podem acompanhar as feiras, visualizar os feirantes e os produtos disponíveis.

## Funcionalidades

1. **Página Inicial**: Exibição das próximas feiras com datas, locais e breve descrição.
2. **Página das Feiras**: Calendário das feiras, detalhes, e lista de feirantes participantes e produtos disponíveis.
3. **Área do Feirante**: Cadastro, gerenciamento de feiras e produtos, e upload de fotos do stand.
4. **Área do Consumidor**: Alertas sobre feiras, detalhes sobre feirantes e produtos.
5. **Sistema de Administração**: Gerenciamento de feiras, feirantes, e relatórios estatísticos.

## Tecnologias Utilizadas

- **Front-end**: 
  - React / Next.js
  - Tailwind CSS

- **Back-end**: 
  - Spring Boot

- **Banco de Dados**: 
  - PostgreSQL / MySQL

- **Autenticação**: 
  - Spring Security

- **Notificações**: 
  - Firebase Cloud Messaging (opcional)

- **Armazenamento de Imagens**: 
  - AWS S3

## Estrutura do Projeto

### Front-end

1. **Configuração do Projeto**: 
   - Criado usando `create-next-app` para iniciar com Next.js.

2. **Componentes**: 
   - Página Inicial
   - Página das Feiras
   - Perfil do Feirante
   - Dashboard do Feirante

3. **Estilização**: 
   - Utiliza Tailwind CSS para estilização.

### Back-end

1. **Configuração do Projeto**: 
   - Configurado usando Spring Initializr.

2. **Entidades JPA**: 
   - Definidas para Feiras, Feirantes, Produtos e Usuários.

3. **Controladores REST**: 
   - Endpoints para gerenciamento de feiras, feirantes e produtos.

4. **Segurança**: 
   - Configuração de autenticação com Spring Security.

5. **Banco de Dados**: 
   - Configuração para armazenamento de dados.

## Instalação e Execução

### Front-end

Clone o repositório:
   ```bash
   git clone <url-do-repositorio>
   cd <nome-do-repositorio>

Instale as dependências:
npm install

Inicie o servidor de desenvolvimento:
npm run dev

Acesse a aplicação em http://localhost:3000.



