namespace Fanex.Athena.Report.Core.Helpers
{
    public static class UrlHelper
    {
        public static string ContentLink(string contentPath, string appBaseUrl, string webRootPath, string cdnDomain)
        {
            var appPath = string.IsNullOrEmpty(cdnDomain) ? appBaseUrl : cdnDomain;
            var baseUrl = appPath != null && appPath.Length > 1 ? appPath : string.Empty;
            var version = GenerateContentVersion(contentPath, webRootPath);
            return $"{baseUrl}{contentPath}?v={version}";
        }

        private static string GenerateContentVersion(string contentPath, string webRootPath)
        {
            const string format = "MMddyyyy_HHmm";
            var fullPathFile = Path.GetFullPath(Path.Join(webRootPath, contentPath));
            var version = File.GetLastWriteTime(fullPathFile).ToString(format);
            return version;
        }
    }
}