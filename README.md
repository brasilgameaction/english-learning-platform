# English Learning Platform

Uma plataforma para compartilhamento de conteúdo para aprendizado de inglês.

## Tecnologias Utilizadas

- React
- TypeScript
- Material-UI
- i18next para internacionalização
- Vercel Postgres para banco de dados
- Firebase para autenticação

## Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn
- Conta na Vercel para deploy e banco de dados

## Configuração do Ambiente

1. Clone o repositório:
```bash
git clone [URL_DO_SEU_REPOSITORIO]
cd english-learning-platform
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
- Crie um arquivo `.env` na raiz do projeto
- Copie as variáveis necessárias do `.env.example`
- Preencha com suas credenciais

4. Inicie o servidor de desenvolvimento:
```bash
npm start
```

## Scripts Disponíveis

- `npm start`: Inicia o servidor de desenvolvimento
- `npm test`: Executa os testes
- `npm run build`: Gera o build de produção
- `npm run deploy`: Deploy para produção na Vercel
- `npm run deploy:dev`: Deploy para ambiente de desenvolvimento

## Estrutura do Projeto

```
src/
  ├── components/     # Componentes React reutilizáveis
  ├── contexts/       # Contextos React (Auth, etc.)
  ├── lib/           # Utilitários e configurações
  ├── pages/         # Componentes de página
  └── types/         # Definições de tipos TypeScript
```

## Deploy

O projeto está configurado para deploy na Vercel. Para fazer deploy:

1. Certifique-se de ter todas as variáveis de ambiente configuradas
2. Execute `npm run deploy` para produção ou `npm run deploy:dev` para desenvolvimento

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes. 