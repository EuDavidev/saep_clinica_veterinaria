# Validação

## Testes automáticos

Execute `npm ci` e `npm test` na raiz. Os testes usam `node:test`, sem biblioteca adicional e sem conectar ao MySQL.

| Grupo | Cobertura |
| --- | --- |
| CPF | Normalização, dígitos verificadores, cifragem/decifragem, IV aleatório, tag de integridade, HMAC e máscara pública. |
| Senha | Sal aleatório e conferência de senha correta/incorreta. |
| Entradas | Data inexistente, ano bissexto, tutor obrigatório, idade inválida e valor negativo. |
| Sessão | Usuário autorizado, expiração e remoção do token vencido. |
| População | Chaves de demonstração compatíveis com as cifras do SQL; ausência de CPF e senha em texto puro no arquivo. |
| HTTP | Páginas da clínica, API sem sessão, entradas malformadas, configuração não exposta e logout. |

O teste HTTP inicia temporariamente o servidor na porta 3000; pare outra instância local antes de executar. Os testes automáticos não demonstram a execução do SQL ou a persistência dos cadastros no seu MySQL.

## Testar no MySQL do laboratório

| Teste | Ação | Esperado |
| --- | --- | --- |
| T01 | Executar `banco/saep_db.sql` em schema novo/vazio. | Quatro tabelas e três registros em cada. |
| T02 | Entrar com a conta de demonstração. | Tela principal mostra o nome e os recursos. |
| T03 | Usar senha incorreta. | Mensagem de falha, sem sessão válida. |
| T04 | Buscar tutor por nome/e-mail e confirmar. | Listagem filtrada; busca vazia recupera todos. |
| T05 | Editar contato e recarregar a página. | Alteração persiste no banco. |
| T06 | Editar tutor com CPF vazio. | Documento anterior permanece. |
| T07 | Cadastrar CPF repetido com outra formatação. | HTTP 409, sem duplicar o tutor. |
| T08 | Cadastrar pet sem tutor ou com FK inexistente. | Operação rejeitada. |
| T09 | Cadastrar pet com tutor existente. | Vínculo salvo corretamente. |
| T10 | Consultar a agenda de exemplo. | Mel: 01/12/2026 08:30; Milo: 01/12/2026 10:00; Luna: 02/12/2026 09:00. |
| T11 | Reagendar Luna para 01/12/2026 07:30. | Luna passa ao início da lista; alteração persiste após recarga. |
| T12 | Definir SESSION_SECONDS=5, reiniciar e fazer login. | Próxima requisição após cinco segundos é recusada. Restaurar 10800 ao concluir. |
| T13 | Sair e tentar acessar novamente os dados. | Sessão recusada e retorno ao login. |
| T14 | Inspecionar CPF e senha no banco. | Cifras e hashes, sem os valores originais. |
| T15 | Usar caracteres HTML em um nome. | Exibidos como texto, sem execução de HTML/JavaScript. |

```sql
USE saep_clinica;
SELECT 'usuarios' AS tabela, COUNT(*) AS total FROM usuarios
UNION ALL SELECT 'tutores', COUNT(*) FROM tutores
UNION ALL SELECT 'pets', COUNT(*) FROM pets
UNION ALL SELECT 'agendamentos', COUNT(*) FROM agendamentos;

SELECT id, nome, cpf_criptografado, cpf_hash FROM tutores;
SELECT id, email, senha_hash FROM usuarios;

SELECT a.id, a.data_hora, p.nome AS pet, t.nome AS tutor
FROM agendamentos a
JOIN pets p ON p.id = a.pet_id
JOIN tutores t ON t.id = p.tutor_id
ORDER BY a.data_hora, a.id;
```

O script inicial não é uma migração da loja. Ele não executa DROP e não deve ser repetido sobre tabelas existentes. As operações CREATE não são desfeitas pelo rollback da população.
