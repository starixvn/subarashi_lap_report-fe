using System.Security.Claims;
using Fanex.Athena.Report.Core.Services.Interfaces;
using Microsoft.AspNetCore.Http;

namespace Fanex.Athena.Report.Core.Services
{
    public class ContextService : IContextService
    {
        private const string PortalIdentityKey = "portal_";
        private readonly IHttpContextAccessor _httpContextAccessor;

        public ContextService(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        protected HttpContext Context => _httpContextAccessor.HttpContext;

        protected ClaimsPrincipal User => Context.User;

        public string IdentityName => GetClaimValue("name");

        public byte AppMode => IdentityName.StartsWith(PortalIdentityKey, StringComparison.OrdinalIgnoreCase) ? Constants.AppMode.LAP : Constants.AppMode.LRF;

        public bool IsAdministrator => GetClaimValue("Administrator", false);

        public IEnumerable<string> GetFunctionKeys()
        {
            return User.Claims
            .Where(_ => _.Type.Equals("role", StringComparison.OrdinalIgnoreCase))
            .Select(_ => _.Value).ToList();
        }

        private T GetClaimValue<T>(string claimType, T _default)
        {
            var claimValue = GetClaimValue(claimType);
            return string.IsNullOrEmpty(claimValue) ? _default : (T)Convert.ChangeType(claimValue, typeof(T));
        }

        private string GetClaimValue(string claimType)
        {
            return User.FindFirst(claimType)?.Value ?? string.Empty;
        }
    }
}