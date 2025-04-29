# =======================
# Этап 1: Сборка приложения
# =======================
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Копируем csproj и восстанавливаем зависимости
COPY *.csproj .
RUN dotnet restore

# Копируем всё остальное и публикуем релизную версию
COPY . .
RUN dotnet publish -c Release -o /app/publish

# ==========================
# Этап 2: Запуск приложения
# ==========================
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

# Копируем опубликованные файлы из предыдущего этапа
COPY --from=build /app/publish .

# Открываем порт (если нужно, но Compose сам пробросит)
EXPOSE 80

# Запускаем приложение
ENTRYPOINT ["dotnet", "NoteService.dll"]