namespace Fanex.Athena.Report.Core.Extensions;

using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Middleware;
using Settings;

public static class ConfigureServicesExtension
{
    public static IServiceCollection AddSettings(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddSingleton(configuration.GetSection("AppSettings").Get<AppSettings>());
        return services;
    }

    public static void AddHealthCheck(this IServiceCollection services)
    {
        services.AddHealthChecks().AddCheck<WhoAmIHealthCheck>("WhoAmIHealthCheck");
    }
}