var builder = WebApplication.CreateBuilder(args);

builder.WebHost.UseSentry();

var services = builder.Services;
var configuration = builder.Configuration;

services.AddControllersWithViews();

services.AddHttpContextAccessor();
services.AddHealthChecks().AddCheck<WhoAmIHealthCheck>("WhoAmIHealthCheck");

services.AddSettings(configuration);

var app = builder.Build();

app.UseForwardedHeaders();

if (app.Environment.IsProduction() || string.Equals(configuration["UseErrorHandler"], "1"))
{
    app.UseErrorHandler();
}
else
{
    app.UseDeveloperExceptionPage(); //NOSONAR not used in secure context
}

app.UseStaticFiles(new StaticFileOptions
{
    OnPrepareResponse = ctx =>
    {
        const int OneYear = 60 * 60 * 24 * 365;
        ctx.Context.Response.Headers[HeaderNames.CacheControl] = app.Environment.IsDevelopment() ?
        "no-cache" : "public,max-age=" + OneYear;
        ctx.Context.Response.Headers[HeaderNames.AccessControlAllowOrigin] = "*";
    }
});

app.UseWhoAmICheck();

app.UseRouting();
app.UseRequestLocalization();
app.UseCors();

app.MapGet("/", () => "LAP Report Client App is Running ...");

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllerRoute(name: "Default", pattern: "{controller=Home}/{action=Index}");
    endpoints.MapFallbackToController("Index", "Home");
});

app.Run();