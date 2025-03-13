namespace Fanex.Athena.Report.Core.Tests.MiddleWares;

using System;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Middleware;
using NSubstitute;
using NSubstitute.ExceptionExtensions;
using UnitTests.Common.AutoData;
using Xunit;

public class ErrorHandlerTest
{
    [Theory]
    [AutoContextData]
    public async Task Invoke_WithoutError_InvokeNext(
        HttpContext httpContext,
        RequestDelegate next,
        ILogger<ErrorHandler> logger)
    {
        //Arrange
        var handler = new ErrorHandler(next, logger);

        //Act
        await handler.Invoke(httpContext);

        //Assert
        await next.Received().Invoke(httpContext);
    }

    [Theory]
    [AutoContextData]
    public async Task Invoke_HandleErrorWithException_RedirectResult(
        HttpContext httpContext,
        Exception exception,
        RequestDelegate next,
        ILogger<ErrorHandler> logger)
    {
        // Arrange
        next.Invoke(httpContext).Throws(exception);
        var handler = new ErrorHandler(next, logger);

        // Act
        await handler.Invoke(httpContext);

        // Assert
        Assert.Equal((int)HttpStatusCode.InternalServerError, httpContext.Response.StatusCode);
    }
}