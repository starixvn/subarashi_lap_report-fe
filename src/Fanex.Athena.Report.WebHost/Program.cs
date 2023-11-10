var builder = WebApplication.CreateBuilder(args);

var services = builder.Services;
var configuration = builder.Configuration;

services.AddControllersWithViews();

var instrospecCacheDuration = int.TryParse(configuration["IdentityServer:CacheDuration"], out int cache) ? cache : 0;
services.AddAuthentication("Bearer")
   .AddOAuth2Introspection("Bearer", options =>
   {
       options.Authority = configuration["IdentityServer:Host"];
       options.ClientId = configuration["IdentityServer:CredentialIntrospection:ClientId"];
       options.ClientSecret = configuration["IdentityServer:CredentialIntrospection:ClientSecret"];
       options.SaveToken = true;
       options.SkipTokensWithDots = true;
       options.EnableCaching = instrospecCacheDuration > 0;
       options.CacheKeyPrefix = "OAuth2Introspection:";
       options.CacheDuration = TimeSpan.FromMinutes(instrospecCacheDuration);
       options.DiscoveryPolicy.RequireHttps = false;
       options.TokenRetriever = TokenRetrieval.FromAuthorizationHeader();
   });

services.AddHttpContextAccessor();
services.AddHealthChecks().AddCheck<WhoAmIHealthCheck>("WhoAmIHealthCheck");

services.ConfigRequestLocalization();
services.AddSettings(configuration);
services.AddCore();

var app = builder.Build();

app.MapGet("/", () => "LAP Report Client App is Running ...");

app.UseForwardedHeaders();

app.UseStaticFiles();
app.UseWhoAmICheck();

app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();
app.UseRequestLocalization();

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllerRoute(name: "Default", pattern: "{controller=Home}/{action=Index}");
    endpoints.MapFallbackToController("Index", "Home");
});

app.Run();