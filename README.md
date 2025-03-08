# Diet App - Projeto Senac

O **Diet App** é um aplicativo simples e intuitivo que tem como objetivo ajudar seus usuários a calcular o peso ideal e acompanhar suas metas de saúde e dieta. Com uma interface clara e objetiva, o app oferece funcionalidades como login, registro de novos usuários, visualização do perfil e acompanhamento das metas de forma prática e eficaz. Ele foi desenvolvido com Next.js e utiliza armazenamento local para salvar dados importantes.

## Funcionalidades

- **Tela de Login**: Permite que os usuários façam login para acessar suas informações pessoais e dados de acompanhamento de metas.
- **Tela de Registro**: Nova funcionalidade de cadastro de usuários, permitindo criar uma conta e acessar o app.
- **Tela de Perfil**: Exibe as informações do usuário e seus dados de progresso.
- **Cálculo de Peso Ideal**: Uma ferramenta que calcula o peso ideal do usuário com base em suas informações.
- **Acompanhamento de Metas**: Permite acompanhar o progresso das metas de saúde do usuário de maneira simples e intuitiva.

## Tecnologias Utilizadas

O **Diet App** foi desenvolvido usando as seguintes tecnologias:

- **Next.js**: Framework React para desenvolvimento de aplicações web escaláveis, rápidas e otimizadas.
- **React**: Biblioteca JavaScript para construção de interfaces de usuário dinâmicas e reativas.
- **TailwindCSS**: Framework CSS utilitário para uma estilização mais eficiente e rápida.
- **Zod**: Biblioteca para validação de dados e tipos de forma robusta.
- **React Hook Form**: Biblioteca para formularios em React com alta performance.
- **Lucide React**: Ícones modulares para uso em React.
- **Date-fns**: Biblioteca para manipulação de datas.
- **Recharts**: Biblioteca para criação de gráficos interativos e visualizações de dados.

## Bibliotecas e Impacto no Desempenho

### **@Radix UI**

O **Radix UI** é utilizado para fornecer componentes acessíveis e bem estruturados, como botões, diálogos, checkboxes e menus. Ele garante uma interface de usuário limpa e eficiente, com foco na acessibilidade. Com sua implementação, conseguimos melhorar o desempenho ao reduzir o uso de bibliotecas externas pesadas para esses componentes, além de ter componentes totalmente personalizáveis.

### **Next.js**

O **Next.js** é o alicerce do app, oferecendo renderização no lado do servidor (SSR), geração de páginas estáticas (SSG) e otimização de imagens e scripts. Isso resulta em um tempo de carregamento mais rápido e uma experiência de usuário fluída e dinâmica.

### **React Hook Form**

Com o **React Hook Form**, conseguimos otimizar a manipulação de formulários no app. Essa biblioteca minimiza a re-renderização de componentes, garantindo uma performance mais eficiente, principalmente em formulários grandes como o de cadastro e login.

### **TailwindCSS**

**TailwindCSS** permite um desenvolvimento mais rápido e eficiente de UI, com classes utilitárias que são diretamente aplicadas no HTML/JSX. O uso de classes utilitárias também reduz o tamanho do CSS final, impactando diretamente na performance de carregamento da página.

### **Lucide React**

Os ícones são essenciais para a experiência do usuário, e **Lucide React** nos fornece ícones leves e personalizáveis, sem sobrecarregar o aplicativo com dependências pesadas.

### **React-Day-Picker**

Para a escolha de datas no aplicativo, utilizamos o **react-day-picker**, que permite uma seleção de datas dinâmica e fluída. Essa biblioteca garante uma experiência de usuário interativa e sem latências ao selecionar datas.

### **Zod**

Utilizamos o **Zod** para validação de dados, garantindo que todas as informações inseridas pelos usuários sejam válidas antes de serem enviadas para o backend. Isso ajuda a prevenir erros e melhora a confiabilidade do aplicativo.

## Instalação

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/NickBritoDev/diet-app.git
cd diet-app
npm install
```

Para rodar a aplicação em modo de desenvolvimento:

```bash
npm run dev
```

Isso irá iniciar o servidor localmente em `http://localhost:3000`.

## Conclusão

O **Diet App** foi projetado para ser uma solução simples, rápida e eficaz para quem busca melhorar sua saúde e acompanhar o progresso de suas metas de forma prática. Graças às bibliotecas e tecnologias utilizadas, conseguimos garantir uma boa performance e uma excelente experiência de usuário.
