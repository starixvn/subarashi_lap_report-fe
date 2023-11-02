using System.Globalization;
using Fanex.Athena.Report.Core.Constants;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Localization;
using Microsoft.Extensions.DependencyInjection;

namespace Fanex.Athena.Report.Core.Extensions
{
    public static class ConfigureExtension
    {
        public static void ConfigRequestLocalization(this IServiceCollection services)
        {
            services.Configure<RequestLocalizationOptions>(options =>
            {
                const string EnCultureName = "en-US";
                var enCulture = new CultureInfo(EnCultureName)
                {
                    DateTimeFormat = new DateTimeFormatInfo
                    {
                        ShortDatePattern = "M/d/yyyy",
                        ShortTimePattern = "h:mm tt",
                        LongDatePattern = "MM/dd/yyyy",
                        LongTimePattern = "h:mm:ss tt"
                    }
                };

                options.DefaultRequestCulture = new RequestCulture(EnCultureName);
                options.SupportedCultures = new List<CultureInfo>
                {
                    enCulture
                };
                options.SupportedUICultures = new List<CultureInfo>
                {
                    enCulture,
                    new CultureInfo("zh-CN"),
                    new CultureInfo("zh-Hans"),
                    new CultureInfo("zh-TW"),
                    new CultureInfo("vi-VN")
                };

                options.RequestCultureProviders = new List<IRequestCultureProvider>
                {
                    new CustomRequestCultureProvider(async context =>
                    {
                        var langCode = context.User.FindFirst("Language")?.Value ?? "en";
                        var culture = Languages.SupportedLanguages.GetValueOrDefault(langCode,"en-US");
                        return await Task.FromResult(new ProviderCultureResult(culture: EnCultureName, uiCulture: culture));
                    })
                };
            });
        }
    }
}