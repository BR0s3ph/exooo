FROM node:22-alpine
# On nomme un dossier de travail dans le conta  iner
# C'est là ou se trouvera notre application
WORKDIR /app
# Ici on décide tout copier dans la répertoire de travail
# Car on va définir un fichier qui s'appelle .dockerignore dans le quel on définit les fichiers/dossiers à ignorer
COPY . .
RUN npm ci
EXPOSE 3000
CMD ["npm", "run", "docker:dev"]