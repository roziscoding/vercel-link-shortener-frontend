Vercel Link Shortener
---

Criado ao vivo em https://twitch.tv/roziscoding

Encurtador de URLs serverless com painel admin e bot do Telegram para gerenciamento

## Variáveis de ambiente

- `NOTFOUND_URL`: URL a ser utilizada caso um link com aquele shortcode não seja encontrado
- `DB_NAME`: Nome do banco de dados onde os links serão armazenados
- `DB_URI`: String de conexão com o MongoDB.
  - ⚠️ Se pretende utilizar a integração do Mongo Atlas com a Vercel, preencha com qualquer valor e depois **exclua no painel de controle da Vercel**
- `TELEGRAM_TOKEN`: Token do chatbot no Telegram (obtenha um com o [@botfather](t.me/botfather))
- `ADMIN_ID`: Seu ID no Telegram. O bot só responderá a pessoa dona desse ID. Deixe em branco caso queira que ele responda qualquer pessoa
- `SHORT_URL_PREFIX`: Prefixo / domínio das URLs geradas, incluindo o protocolo

## Deploy

Clique no botão para fazer deploy com a Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Froziscoding%2Fvercel-link-shortener-frontend&env=NOTFOUND_URL,DB_NAME,DB_URI,TELEGRAM_TOKEN,ADMIN_ID,SHORT_URL_PREFIX&envDescription=Configura%C3%A7%C3%B5es%20de%20conex%C3%A3o%20com%20o%20banco%20e%20com%20o%20Telegram&envLink=https%3A%2F%2Fgithub.com%2Froziscoding%2Fvercel-link-shortener-frontend%2Fblob%2Fmaster%2FREADME.md&project-name=link-shortener&repo-name=link-shortener&integration-ids=oac_jnzmjqM10gllKmSrG0SGrHOH&skippable-integrations=1)