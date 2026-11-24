# Documentação do software — Anexo 1

**Sistema:** gestão de clínica veterinária

**Estudante:** Davi de Souza Silva

**Atualização:** 24/11/2026

**Número da prova:** preencher conforme identificação oficial.

## 1.1 Requisitos funcionais do sistema

Os quatro requisitos abaixo correspondem às quatro linhas do formulário das fotos. As operações detalhadas foram agrupadas por funcionalidade.

| ID | Requisito | Descrição |
| --- | --- | --- |
| RF01 | Autenticação e sessão | Permitir login por e-mail e senha; validar campos e credenciais; apresentar mensagem em caso de falha; controlar a expiração da sessão e permitir sair do sistema. |
| RF02 | Funcionalidade principal | Exibir o nome do usuário autenticado, oferecer acesso aos recursos de tutores, pets e agendamentos e disponibilizar Sair. |
| RF03 | Gerenciamento de tutores e pets | Cadastrar e listar tutores; buscar por termo confirmado e atualizar a listagem; editar e persistir seus dados. Cadastrar e listar pets, associando cada pet obrigatoriamente a um tutor existente. Permitir editar os dados descritivos do pet. |
| RF04 | Gerenciamento de agendamentos | Cadastrar e listar agendamentos por dia e horário, com os dados do pet e do tutor; permitir alterar a data/hora de um agendamento e salvar o reagendamento no banco. |

## 1.2 Requisitos de infraestrutura

| Campo do formulário | Preenchimento |
| --- | --- |
| SGBD utilizado | MySQL Community Server. |
| Versão do SGBD | MySQL 8.0.16 ou superior da série 8.0. Registrar a versão efetiva retornada por `SELECT VERSION();`. |
| Linguagem de programação | JavaScript, com módulos ES (`import` / `export`). |
| Versão da linguagem / execução | ECMAScript 2022 ou superior; Node.js 22 ou superior compatível. Confirmar a versão do computador com `node --version`. |
| Ferramenta de modelagem | MySQL Workbench 8.0.x; confirmar a versão em Help > About. |
| Interface | HTML5, CSS3 e JavaScript no navegador. |
| Acesso ao banco | Biblioteca mysql2, com consultas parametrizadas. |
| Execução local | Servidor HTTP em `http://localhost:3000`; serviço MySQL ativo. |

Workbench é a ferramenta cliente; MySQL Server é o SGBD. Node.js é o ambiente de execução; JavaScript é a linguagem. A versão 22.23.4 anotada no formulário deve ser conferida no computador, sem apresentá-la como versão da linguagem.

## Regras de negócio e proteção de dados

| ID | Regra | Implementação |
| --- | --- | --- |
| RN01 | Pelo menos três registros em todas as tabelas | `banco/saep_db.sql` popula usuarios, tutores, pets e agendamentos. |
| RN02 | Associar pet a tutor | `pets.tutor_id` é obrigatório e referencia `tutores.id`. |
| RN03 | Associar agendamento a pet | `agendamentos.pet_id` é obrigatório; o tutor é obtido pelo relacionamento do pet. |
| RN04 | CPF criptografado | AES-256-GCM antes do INSERT/UPDATE; HMAC em campo único para impedir duplicidade. As chaves ficam na configuração local. |
| RN05 | Senha protegida | Hash scrypt com sal aleatório. A senha original não é armazenada no banco. |
| RN06 | Expiração de autenticação | Prazo absoluto de três horas por padrão, conferido no servidor. Reiniciar o processo encerra sessões. |
| RN07 | Integridade e validação | Validar entradas no servidor, usar parâmetros nas consultas e FKs para os vínculos obrigatórios. |
| RN08 | Dados nas telas | Exibir CPF mascarado; não retornar senha, cifra, HMAC ou chaves. |

Criptografia e autenticação são medidas técnicas da atividade. Isoladamente, não comprovam conformidade integral com a LGPD.

## Telas e operações

| Tela | Recursos |
| --- | --- |
| Login | E-mail, senha, validação e mensagem de falha. |
| Principal | Nome do usuário, menu e saída. |
| Tutores | Formulário, listagem, busca por nome/e-mail e edição. CPF vazio na edição preserva o anterior. |
| Pets | Formulário com seleção de tutor, listagem e edição descritiva. Não permite transferir o pet para outro tutor. |
| Agendamentos | Seleção de pet, procedimento, valor, data/hora, listagem cronológica e edição. |

## Entregas correspondentes às fotos

| Entrega | Arquivo no repositório |
| --- | --- |
| Documentação do software | Este arquivo Markdown, conforme formato solicitado pelo estudante. Para a entrega formal, exportar para `documentacao.pdf` se o avaliador mantiver a exigência da folha. |
| Diagrama entidade relacionamento | [`diagramas/der.png`](diagramas/der.png). |
| Script de criação e população | [`../banco/saep_db.sql`](../banco/saep_db.sql). |
| Código das cinco funcionalidades | Raiz, `public/` e `servidor/`; na compactação para a atividade, colocar esse código na pasta `sistema/`. |
| Complementos solicitados | [`diagramas/fluxograma.png`](diagramas/fluxograma.png) e [`diagramas/casos_de_uso.png`](diagramas/casos_de_uso.png). |

A folha solicita a pasta compactada com o nome completo do estudante. Confirme o número da prova e as versões do laboratório antes de entregar.
