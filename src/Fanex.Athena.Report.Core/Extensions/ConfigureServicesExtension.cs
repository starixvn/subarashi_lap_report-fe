using Fanex.Athena.Report.Core.Middleware;
using Fanex.Athena.Report.Core.Settings;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Fanex.Athena.Report.Core.Extensions
{
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
}