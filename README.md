# Passkeys (Chave de acesso)

O objetivo deste projeto é demonstrar na prática o funcionamento de chaves de acesso (Passkeys) através do protocolo WebAuthn. A aplicação substitui o uso de senhas tradicionais por um modelo de **criptografia assimétrica**, onde um par de chaves (pública e privada) é gerado. A chave privada permanece isolada dentro do hardware seguro do dispositivo do usuário (como o chip TPM via Windows Hello), sendo acessada apenas após a validação de biometria local ou PIN.

### Criptografia no Fluxo do Código
Para garantir a segurança sem o uso de senhas, a aplicação utiliza dois conceitos fundamentais da API WebAuthn:
1. **Desafio (Challenge):** É uma string aleatória e única gerada pelo servidor (backend) a cada tentativa de acesso. Esse dado é enviado ao navegador, que o converte em um vetor binário (`Uint8Array`) para que o hardware do dispositivo possa processá-lo. O *challenge* impede ataques de reutilização (*replay attacks*), garantindo que cada tentativa de login seja exclusiva.
2. **Assinatura Digital:** Ao receber o desafio, o hardware do usuário usa a chave privada local para gerar uma assinatura criptográfica sobre esse bloco de dados. Essa assinatura é enviada de volta ao servidor, que utiliza a chave pública armazenada para verificar se ela é legítima. Se a assinatura for válida, o acesso é liberado sem que nenhuma senha tenha trafegado pela rede.

## Funcionalidades
- Cadastro de usuários
- Geração de chaves criptográficas
- Autenticação por meio de PIN, Biometria ou Face ID
- Logout da sessão

## Tecnologias Utilizadas
### Frontend
 - HTML5
 - CSS3
 - JavaScript
### Backend
 - Node.js
 - Express

## Como funciona
1. O usuário realiza o cadastro
2. O dispositivo do usuário gera um par de chaves  criptográficas assimétricas 
3. A chave pública é armazenada no servidor
4. A chave privada permanece protegida e isolada no dispositivo do usuário
5. Durante o login, o servidor envia um desafio que é assinado localmente pelo dispositivo para liberar o acesso

# Como executar o projeto
## Pré-requisitos
- Ambiente: node.js
- Biblioteca: @simplewebauthn/server

## Passos
