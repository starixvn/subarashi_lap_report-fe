FROM hub.nexdev.net/base/dotnet/core/sdk:6.0 AS builder

RUN apt-get update  \
    && curl --silent --location https://deb.nodesource.com/setup_20.x | bash -  \
    && apt-get install -y nodejs

RUN node -v
RUN npm -v

WORKDIR /src/Fanex.Athena.Report.WebHost/ClientApp

COPY src/Fanex.Athena.Report.WebHost/ClientApp/package.json ./
COPY src/Fanex.Athena.Report.WebHost/ClientApp/package-lock.json ./

RUN npm ci

WORKDIR /src

COPY NuGet.Config .
RUN dotnet nuget add source http://nuget.nexdev.net/api/v2

COPY src/Fanex.Athena.Report.Core/Fanex.Athena.Report.Core.csproj ./Fanex.Athena.Report.Core/
RUN dotnet restore Fanex.Athena.Report.Core/Fanex.Athena.Report.Core.csproj -v n

COPY src/Fanex.Athena.Report.WebHost/Fanex.Athena.Report.WebHost.csproj ./Fanex.Athena.Report.WebHost/
RUN dotnet restore Fanex.Athena.Report.WebHost/Fanex.Athena.Report.WebHost.csproj -v n

COPY src .

WORKDIR /src/Fanex.Athena.Report.WebHost/ClientApp

#build front-end
RUN npm run build-prod

WORKDIR /src/Fanex.Athena.Report.WebHost

RUN dotnet publish "Fanex.Athena.Report.WebHost.csproj" -c Release -o /publish \
    --runtime alpine-x64 \
    --self-contained false

FROM hub.nexdev.net/base/dotnet/core/aspnet:6.0-alpine

ENV ASPNETCORE_URLS=http://*:5000
EXPOSE 5000


WORKDIR /app

COPY --from=builder /publish .

ENTRYPOINT ["dotnet", "Fanex.Athena.Report.WebHost.dll"]
