# Projeto Hack@Cloud Oracle - Grupo 3

### Geração de imagem docker do projeto

Para geração correta da imagem, o parâmetro "--openssl-legacy-provider" tem que ser passado no arquivo package.json.

```bash
docker build -t oci-frontend .
```

### Execução do container

```bash
docker run -d -p 3000:3000 oci-frontend
```

