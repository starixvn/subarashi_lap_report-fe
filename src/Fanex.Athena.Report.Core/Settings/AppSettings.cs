namespace Fanex.Athena.Report.Core.Settings;

public class AppSettings
{
    public const string SettingName = "AppSettings";

    public string StaticDomain { get; set; } = string.Empty;

    public string BetTicketEventBuilderUrl { get; set; } = string.Empty;

    public string HomeToken { get; set; }

    public string Environment { get; set; } = string.Empty;

    public bool UseErrorHandler { get; set; }
}