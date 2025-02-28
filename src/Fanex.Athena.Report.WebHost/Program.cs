var builder = WebApplication.CreateBuilder(args);
var services = builder.Services;
var configuration = builder.Configuration;

var sentrySettings = configuration.GetSection(SentrySettings.SettingName).Get<SentrySettings>();
var appSettings = configuration.GetSection(AppSettings.SettingName).Get<AppSettings>();

builder.WebHost.UseSentry(config =>
{
    config.Dsn = sentrySettings.Dsn;
    config.Environment = sentrySettings.Environment;
    config.MinimumBreadcrumbLevel = sentrySettings.MinimumBreadcrumbLevel;
    config.MinimumEventLevel = sentrySettings.MinimumEventLevel;
    config.MaxBreadcrumbs = sentrySettings.MaxBreadcrumbs;
    config.SendDefaultPii = sentrySettings.SendDefaultPii;
    config.MaxRequestBodySize = sentrySettings.MaxRequestBodySize;
});

services.AddControllersWithViews();
services.AddHttpContextAccessor();
services.AddHealthCheck();
services.AddSettings(configuration);

var app = builder.Build();

app.UseForwardedHeaders();
app.UseForwardedHttpScheme();

if (app.Environment.IsProduction() || appSettings.UseErrorHandler)
{
    app.UseErrorHandler();
}
else
{
    app.UseDeveloperExceptionPage(); //NOSONAR not used in secure context
}

if (!app.Environment.IsDevelopment())
{
    app.UseHsts();
}

app.UseHttpsRedirection();

app.UseStaticFiles(app.Environment.IsDevelopment());

app.UseWhoAmICheck(appSettings);

app.UseRouting();
app.UseCors();

app.MapGet("/", () => "LAP Report Client App is Running ...");

app.MapControllerRoute("Default", "{controller=Home}/{action=Index}");
app.MapFallbackToController("Index", "Home");

app.Run();