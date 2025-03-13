namespace Fanex.Athena.Report.Core.Middleware;

using System.Net;
using Helpers;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

public class ErrorHandler
{
    private readonly ILogger<ErrorHandler> logger;

    private readonly RequestDelegate next;

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