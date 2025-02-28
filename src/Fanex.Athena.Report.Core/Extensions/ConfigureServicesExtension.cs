namespace Fanex.Athena.Report.Core.Extensions;

using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Middleware;
using Settings;

public static class ConfigureServicesExtension
{
    public static IServiceCollection AddSettings(this IServiceCollection services, IConfiguration configuration)
    {
        services.Configure<AppSettings>(configuration.GetSection(AppSettings.SettingName));
        services.Configure<SentrySettings>(configuration.GetSection(SentrySettings.SettingName));

        return services;
    }

    public static void AddHealthCheck(this IServiceCollection services)
    {
        services.AddHealthChecks().AddCheck<WhoAmIHealthCheck>("WhoAmIHealthCheck");
    }
}