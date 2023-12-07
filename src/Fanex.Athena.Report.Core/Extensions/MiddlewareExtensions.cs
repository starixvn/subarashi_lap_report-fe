using System.Net.Mime;
using Fanex.Athena.Report.Core.Middleware;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using Newtonsoft.Json;

namespace Fanex.Athena.Report.Core.Extensions
{
    public static class MiddlewareExtensions
    {
        public static IApplicationBuilder UseWhoAmICheck(this IApplicationBuilder app)
        {
            return app.UseHealthChecks("/whoami", new HealthCheckOptions
            {
                AllowCachingResponses = false,
                Predicate = _ => true,
                ResponseWriter = async (context, report) =>
                {
                    var result = JsonConvert.SerializeObject(
                        new
                        {
                            status = report.Status.ToString(),
                            monitors = report.Entries.Select(e => new { name = e.Key, status = Enum.GetName(typeof(HealthStatus), e.Value.Status), values = e.Value.Data })
                        }, Formatting.Indented);

                    context.Response.ContentType = MediaTypeNames.Application.Json;
                    await context.Response.WriteAsync(result);
                }
            });
        }

        public static void UseErrorHandler(this IApplicationBuilder app)
        {
            app.UseMiddleware<ErrorHandler>();
        }
    }
}