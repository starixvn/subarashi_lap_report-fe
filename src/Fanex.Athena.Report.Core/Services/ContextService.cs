using System.Security.Claims;
using Fanex.Athena.Report.Core.Constants;
using Fanex.Athena.Report.Core.Services.Interfaces;
using Microsoft.AspNetCore.Http;

namespace Fanex.Athena.Report.Core.Services
{
    public class ContextService : IContextService
    {
        private readonly string Portal_Identity_Key = "portal_";
        private readonly IHttpContextAccessor _httpContextAccessor;

        public ContextService(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        protected HttpContext Context => _httpContextAccessor.HttpContext;
        protected ClaimsPrincipal User => Context.User;

        public string ClientIP => Context.Connection.RemoteIpAddress.ToString();

        public bool IsAllowedCustomerComm => GetClaimValue<bool>("IsAllowedCustomerComm");

        public bool IsEnableBA => GetClaimValue<bool>("IsEnableBA");

        public bool IsEnableSingleWallet => GetClaimValue<bool>("IsEnableSingleWallet");

        public int LicenseeId => GetClaimValue("LicenseeId", -1);

        public string Language => Languages.MapIetfLanguageCodes.GetValueOrDefault(GetClaimValue("Language"), "en-US");

        public string SiteName => GetClaimValue("SiteName");

        public string IdentityName => GetClaimValue("name");

        public byte AppMode => IdentityName.StartsWith(Portal_Identity_Key, StringComparison.OrdinalIgnoreCase) ? Constants.AppMode.LAP : Constants.AppMode.LRF;
        public bool IsFakeLicensee => GetClaimValue<bool>("IsFakeLicensee");

        public string SiteDBServer => GetClaimValue("SiteDBServer");

        public bool IsInRoles(params string[] roles)
        {
            return Array.Exists(roles, x => User.IsInRole(x));
        }

        public bool ForceIgnoreSharding => bool.TrueString.Equals(Context.Request.Headers["X-IgnoreSharding"], StringComparison.OrdinalIgnoreCase);

        private T GetClaimValue<T>(string claimType)
        {
            return (T)Convert.ChangeType(GetClaimValue(claimType), typeof(T));
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