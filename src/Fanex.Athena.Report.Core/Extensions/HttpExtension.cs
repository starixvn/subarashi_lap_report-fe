using Microsoft.AspNetCore.Http;

namespace Fanex.Athena.Report.Core.Extensions
{
    public static class HttpExtension
    {
        public static bool IsAjaxRequest(this HttpRequest request)
        {
            return request == null
                       ? throw new ArgumentNullException(nameof(request))
                       : request.Headers["X-Requested-With"] == "XMLHttpRequest";
        }
    }
}
