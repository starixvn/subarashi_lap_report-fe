using System.Net;
using Fanex.Athena.Report.Core.Helpers;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace Fanex.Athena.Report.Core.Middleware;

public class ErrorHandler
{
    private readonly RequestDelegate next;
    private readonly ILogger<ErrorHandler> logger;

    public ErrorHandler(RequestDelegate next, ILogger<ErrorHandler> logger)
    {
        this.next = next;
        this.logger = logger;
    }

    public async Task Invoke(HttpContext context)
    {
        try
        {
            await next.Invoke(context);
        }
        catch (Exception exception)
        {
            HandleError(context, exception);
        }
    }

    private void HandleError(HttpContext context, Exception exception)
    {
        var errorMsg = ErrorMessageHelper.GenerateMessage(exception, context);
        logger.LogCritical(exception, errorMsg);
        context.Response.Clear();
        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
    }
}