using Fanex.Athena.Report.Core.Services;
using Fanex.Athena.Report.Core.Services.Interfaces;
using Fanex.Athena.Report.Core.Settings;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Fanex.Athena.Report.Core.Extensions
{
    public static class DefendencyInjectionExtension
    {
        public static IServiceCollection AddSettings(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddSingleton(configuration.GetSection("AppSettings").Get<AppSettings>());
            return services;
        }

        public static IServiceCollection AddCore(this IServiceCollection services)
        {
            return services
                .AddServices()
                .AddRepositories();
        }

        private static IServiceCollection AddServices(this IServiceCollection services)
        {
            services.AddScoped<IContextService, ContextService>();

            return services;
        }

        private static IServiceCollection AddRepositories(this IServiceCollection services)
        {
            return services;
        }
    }
}