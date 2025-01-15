FROM hub.nexdev.net/base/dotnet/core/sdk:8.0-nodejs-v20 AS builder

ARG TRANSFORM_CONFIG

RUN node -v
RUN npm -v

WORKDIR /src/Fanex.Athena.Report.WebHost/ClientApp

COPY src/Fanex.Athena.Report.WebHost/ClientApp/package.json ./
COPY src/Fanex.Athena.Report.WebHost/ClientApp/package-lock.json ./

RUN npm install

WORKDIR /src

COPY NuGet.Config .
RUN dotnet nuget add source http://nuget.nexdev.net/api/v2

COPY src/Fanex.Athena.Report.Core/Fanex.Athena.Report.Core.csproj ./Fanex.Athena.Report.Core/
RUN dotnet restore Fanex.Athena.Report.Core/Fanex.Athena.Report.Core.csproj -v n

COPY src/Fanex.Athena.Report.WebHost/Fanex.Athena.Report.WebHost.csproj ./Fanex.Athena.Report.WebHost/
RUN dotnet restore Fanex.Athena.Report.WebHost/Fanex.Athena.Report.WebHost.csproj -v n

COPY src .

WORKDIR /src/Fanex.Athena.Report.WebHost/ClientApp

# Build front-end
RUN case "$TRANSFORM_CONFIG" in \
    (LOCAL|SIT) npm run build-dev;; \
    (*) npm run build-prod;; \
    esac
#

WORKDIR /src/Fanex.Athena.Report.WebHost

RUN dotnet publish "Fanex.Athena.Report.WebHost.csproj" -c Release -o /publish
    --use-current-runtime \
    --self-contained false

FROM hub.nexdev.net/base/dotnet/core/aspnet:8.0-alpine-25h1 AS final

ENV DOTNET_HOSTBUILDER__RELOADCONFIGONCHANGE=false
ENV ASPNETCORE_HTTP_PORTS=5000
EXPOSE 5000

# Dont run as root
RUN adduser --disabled-password \
    --home /app \
    --gecos '' dotnetuser && chown -R dotnetuser /app && chown -R dotnetuser /tmp
USER dotnetuser
#

WORKDIR /app

COPY --from=builder /publish .
ENV TZ="America/La_Paz"

ENTRYPOINT ["dotnet", "Fanex.Athena.Report.WebHost.dll"]
