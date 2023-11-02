namespace Fanex.Athena.Report.Core.Services.Interfaces
{
    public interface IContextService
    {
        int LicenseeId { get; }
        string Language { get; }
        string SiteName { get; }
        string SiteDBServer { get; }
        bool IsAllowedCustomerComm { get; }
        bool IsEnableBA { get; }
        bool IsEnableSingleWallet { get; }
        bool IsFakeLicensee { get; }
        string IdentityName { get; }
        byte AppMode { get; }

        bool ForceIgnoreSharding { get; }

        bool IsInRoles(params string[] roles);
    }
}