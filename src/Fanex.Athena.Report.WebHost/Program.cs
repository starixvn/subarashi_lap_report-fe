var builder = WebApplication.CreateBuilder(args);

builder.WebHost.UseSentry();

var services = builder.Services;
var configuration = builder.Configuration;

services.AddControllersWithViews();

services.AddHttpContextAccessor();
services.AddHealthCheck();

services.AddSettings(configuration);

var app = builder.Build();

app.UseForwardedHeaders();
app.UseHttpsScheme();

if (app.Environment.IsEnvironment("PROD") || string.Equals(configuration["UseErrorHandler"], "1"))
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

app.UseWhoAmICheck();

app.UseRouting();
app.UseCors();

app.MapGet("/", () => "LAP Report Client App is Running ...");

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllerRoute(name: "Default", pattern: "{controller=Home}/{action=Index}");
    endpoints.MapFallbackToController("Index", "Home");
});

app.Run();