namespace Fanex.Athena.Report.Core.Settings;

using Microsoft.Extensions.Logging;
using Sentry.Extensibility;

public class SentrySettings
{
    public const string SettingName = "Sentry";

    public string Environment { get; set; }

    public string FrontEndDsn { get; set; }

    public string Dsn { get; set; }

    public LogLevel MinimumBreadcrumbLevel { get; set; }

    public LogLevel MinimumEventLevel { get; set; }

    public int MaxBreadcrumbs { get; set; }

    public bool SendDefaultPii { get; set; }

    public RequestSize MaxRequestBodySize { get; set; }
}