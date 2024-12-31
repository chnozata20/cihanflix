# 1. Node.js'in resmi imajını kullanıyoruz
FROM node:16 AS build

# 2. Çalışma dizinini belirtiyoruz
WORKDIR /app

# 3. package.json ve package-lock.json dosyalarını kopyalıyoruz
COPY package*.json ./

# 4. Bağımlılıkları yüklüyoruz
RUN npm install

# 5. Proje dosyalarını kopyalıyoruz
COPY . .

# 6. React uygulamasını build ediyoruz
RUN npm run build

# 7. İkinci bir aşama: Nginx ile build dosyalarını sunmak
FROM nginx:alpine

# 8. Build edilmiş dosyaları nginx'e kopyalıyoruz
COPY --from=build /app/build /usr/share/nginx/html

# 9. Nginx için port açıyoruz
EXPOSE 80

# 10. Nginx'i başlatıyoruz
CMD ["nginx", "-g", "daemon off;"]
