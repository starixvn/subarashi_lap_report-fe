namespace Fanex.Athena.Report.Core.Tests.Middlewares;

using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Sockets;
using System.Threading;
using System.Threading.Tasks;
using Core.Middleware;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using NSubstitute;
using Xunit;

public class WhoAmIHealthCheckTests
{
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly IWebHostEnvironment _webHostEnvironment;
    private readonly WhoAmIHealthCheck _healthCheck;
    private readonly HttpContext _httpContext;
    private readonly ConnectionInfo _connectionInfo;
    private readonly HttpRequest _request;

    public WhoAmIHealthCheckTests()
    {
        _httpContextAccessor = Substitute.For<IHttpContextAccessor>();
        _webHostEnvironment = Substitute.For<IWebHostEnvironment>();
        _httpContext = Substitute.For<HttpContext>();
        _connectionInfo = Substitute.For<ConnectionInfo>();
        _request = Substitute.For<HttpRequest>();

        _httpContextAccessor.HttpContext.Returns(_httpContext);
        _httpContext.Connection.Returns(_connectionInfo);
        _httpContext.Request.Returns(_request);

        _healthCheck = new WhoAmIHealthCheck(_httpContextAccessor, _webHostEnvironment);
    }

    private void SetupDefaultContext()
    {
        _connectionInfo.LocalIpAddress.Returns(System.Net.IPAddress.Loopback);
        _connectionInfo.LocalPort.Returns(1234);
        _connectionInfo.RemoteIpAddress.Returns(System.Net.IPAddress.Parse("192.168.0.1"));
        _request.Host.Returns(new HostString("localhost", 5000));
        _request.Scheme.Returns("http");
    }

    [Fact]
    public async Task CheckHealthAsync_WithValidContext_ReturnsHealthyResult()
    {
        // Arrange
        SetupDefaultContext();
        var context = new HealthCheckContext();
        var cancellationToken = CancellationToken.None;

        // Act
        var result = await _healthCheck.CheckHealthAsync(context, cancellationToken);

        // Assert
        Assert.Equal(HealthStatus.Healthy, result.Status);
        Assert.Equal("Server Info", result.Description);
        Assert.NotNull(result.Data);
    }

    [Fact]
    public async Task CheckHealthAsync_WithValidContext_ContainsEnvironmentInfo()
    {
        // Arrange
        SetupDefaultContext();
        var context = new HealthCheckContext();
        var expectedEnvironment = "Development";
        _webHostEnvironment.EnvironmentName.Returns(expectedEnvironment);

        // Act
        var result = await _healthCheck.CheckHealthAsync(context, CancellationToken.None);

        // Assert
        Assert.True(result.Data.ContainsKey("Env"));
        Assert.Equal(expectedEnvironment, result.Data["Env"]);
    }

    [Fact]
    public async Task CheckHealthAsync_WithValidContext_ContainsHostName()
    {
        // Arrange
        SetupDefaultContext();
        var context = new HealthCheckContext();

        // Act
        var result = await _healthCheck.CheckHealthAsync(context, CancellationToken.None);

        // Assert
        Assert.True(result.Data.ContainsKey("Host Name"));
        Assert.NotNull(result.Data["Host Name"]);
        Assert.IsType<string>(result.Data["Host Name"]);
    }

    [Fact]
    public async Task CheckHealthAsync_WithValidContext_ContainsServerIPs()
    {
        // Arrange
        SetupDefaultContext();
        var context = new HealthCheckContext();

        // Act
        var result = await _healthCheck.CheckHealthAsync(context, CancellationToken.None);

        // Assert
        // Should contain at least one IP address
        var hasIpAddress = false;
        foreach (var kvp in result.Data)
        {
            if (kvp.Key.StartsWith("IP") && kvp.Value is string ipAddress)
            {
                hasIpAddress = true;
                Assert.True(IPAddress.TryParse(ipAddress, out _), $"Invalid IP address: {ipAddress}");
                break;
            }
        }
        Assert.True(hasIpAddress, "No IP addresses found in health check result");
    }

    [Fact]
    public async Task CheckHealthAsync_WithValidContext_ContainsLocalIpAddress()
    {
        // Arrange
        SetupDefaultContext();
        var context = new HealthCheckContext();
        var expectedLocalIp = System.Net.IPAddress.Parse("127.0.0.1");
        _connectionInfo.LocalIpAddress.Returns(expectedLocalIp);

        // Act
        var result = await _healthCheck.CheckHealthAsync(context, CancellationToken.None);

        // Assert
        Assert.True(result.Data.ContainsKey("Local Ip"));
        Assert.Equal(expectedLocalIp.ToString(), result.Data["Local Ip"]);
    }

    [Fact]
    public async Task CheckHealthAsync_WithValidContext_ContainsLocalPort()
    {
        // Arrange
        SetupDefaultContext();
        var context = new HealthCheckContext();
        var expectedPort = 8080;
        _connectionInfo.LocalPort.Returns(expectedPort);

        // Act
        var result = await _healthCheck.CheckHealthAsync(context, CancellationToken.None);

        // Assert
        Assert.True(result.Data.ContainsKey("Local Port"));
        Assert.Equal(expectedPort, result.Data["Local Port"]);
    }

    [Fact]
    public async Task CheckHealthAsync_WithValidContext_ContainsClientIpAddress()
    {
        // Arrange
        SetupDefaultContext();
        var context = new HealthCheckContext();
        var expectedClientIp = System.Net.IPAddress.Parse("192.168.1.100");
        _connectionInfo.RemoteIpAddress.Returns(expectedClientIp);

        // Act
        var result = await _healthCheck.CheckHealthAsync(context, CancellationToken.None);

        // Assert
        Assert.True(result.Data.ContainsKey("Client Ip"));
        Assert.Equal(expectedClientIp.ToString(), result.Data["Client Ip"]);
    }

    [Fact]
    public async Task CheckHealthAsync_WithValidContext_ContainsServerTime()
    {
        // Arrange
        SetupDefaultContext();
        var context = new HealthCheckContext();

        // Act
        var result = await _healthCheck.CheckHealthAsync(context, CancellationToken.None);

        // Assert
        Assert.True(result.Data.ContainsKey("Server Time"));
        Assert.NotNull(result.Data["Server Time"]);
        Assert.IsType<string>(result.Data["Server Time"]);
        
        // Verify it's a valid date
        var serverTime = result.Data["Server Time"].ToString();
        Assert.True(DateTime.TryParse(serverTime, out _), $"Invalid date format: {serverTime}");
    }

    [Fact]
    public async Task CheckHealthAsync_WithValidContext_ContainsLastUpdated()
    {
        // Arrange
        SetupDefaultContext();
        var context = new HealthCheckContext();

        // Act
        var result = await _healthCheck.CheckHealthAsync(context, CancellationToken.None);

        // Assert
        Assert.True(result.Data.ContainsKey("Last Updated"));
        Assert.NotNull(result.Data["Last Updated"]);
        Assert.IsType<string>(result.Data["Last Updated"]);
        
        // Verify it's a valid date
        var lastUpdated = result.Data["Last Updated"].ToString();
        Assert.True(DateTime.TryParse(lastUpdated, out _), $"Invalid date format: {lastUpdated}");
    }

    [Fact]
    public async Task CheckHealthAsync_WithValidContext_ContainsHost()
    {
        // Arrange
        SetupDefaultContext();
        var context = new HealthCheckContext();
        var expectedHost = new HostString("localhost", 8080);
        _request.Host.Returns(expectedHost);

        // Act
        var result = await _healthCheck.CheckHealthAsync(context, CancellationToken.None);

        // Assert
        Assert.True(result.Data.ContainsKey("Host"));
        Assert.Equal(expectedHost.ToString(), result.Data["Host"]?.ToString());
    }

    [Fact]
    public async Task CheckHealthAsync_WithValidContext_ContainsSchema()
    {
        // Arrange
        SetupDefaultContext();
        var context = new HealthCheckContext();
        var expectedScheme = "https";
        _request.Scheme.Returns(expectedScheme);

        // Act
        var result = await _healthCheck.CheckHealthAsync(context, CancellationToken.None);

        // Assert
        Assert.True(result.Data.ContainsKey("Schema"));
        Assert.Equal(expectedScheme, result.Data["Schema"]);
    }

    [Fact]
    public async Task CheckHealthAsync_WithNullHttpContext_ThrowsNullReferenceException()
    {
        // Arrange
        var context = new HealthCheckContext();
        _httpContextAccessor.HttpContext.Returns((HttpContext)null);

        // Act & Assert
        await Assert.ThrowsAsync<NullReferenceException>(() => 
            _healthCheck.CheckHealthAsync(context, CancellationToken.None));
    }

    [Fact]
    public async Task CheckHealthAsync_WithNullConnection_ThrowsNullReferenceException()
    {
        // Arrange
        var context = new HealthCheckContext();
        SetupDefaultContext();
        _httpContext.Connection.Returns((ConnectionInfo)null);

        // Act & Assert
        await Assert.ThrowsAsync<NullReferenceException>(() => 
            _healthCheck.CheckHealthAsync(context, CancellationToken.None));
    }

    [Fact]
    public async Task CheckHealthAsync_WithNullRequest_ThrowsNullReferenceException()
    {
        // Arrange
        var context = new HealthCheckContext();
        SetupDefaultContext();
        _httpContext.Request.Returns((HttpRequest)null);

        // Act & Assert
        await Assert.ThrowsAsync<NullReferenceException>(() => 
            _healthCheck.CheckHealthAsync(context, CancellationToken.None));
    }

    [Fact]
    public async Task CheckHealthAsync_WithNullLocalIpAddress_ThrowsNullReferenceException()
    {
        // Arrange
        SetupDefaultContext();
        var context = new HealthCheckContext();
        _connectionInfo.LocalIpAddress.Returns((System.Net.IPAddress)null);

        // Act & Assert
        await Assert.ThrowsAsync<NullReferenceException>(() => _healthCheck.CheckHealthAsync(context, CancellationToken.None));
    }

    [Fact]
    public async Task CheckHealthAsync_WithNullRemoteIpAddress_ThrowsNullReferenceException()
    {
        // Arrange
        SetupDefaultContext();
        var context = new HealthCheckContext();
        _connectionInfo.RemoteIpAddress.Returns((System.Net.IPAddress)null);

        // Act & Assert
        await Assert.ThrowsAsync<NullReferenceException>(() => _healthCheck.CheckHealthAsync(context, CancellationToken.None));
    }

    [Fact]
    public async Task CheckHealthAsync_WithNullHost_HandlesGracefully()
    {
        // Arrange
        SetupDefaultContext();
        var context = new HealthCheckContext();
        _request.Host.Returns(new HostString());

        // Act
        var result = await _healthCheck.CheckHealthAsync(context, CancellationToken.None);

        // Assert
        Assert.True(result.Data.ContainsKey("Host"));
        Assert.IsType<HostString>(result.Data["Host"]);
        Assert.Equal("", result.Data["Host"].ToString());
    }

    [Fact]
    public async Task CheckHealthAsync_WithNullScheme_HandlesGracefully()
    {
        // Arrange
        SetupDefaultContext();
        var context = new HealthCheckContext();
        _request.Scheme.Returns((string)null);

        // Act
        var result = await _healthCheck.CheckHealthAsync(context, CancellationToken.None);

        // Assert
        Assert.True(result.Data.ContainsKey("Schema"));
        Assert.Null(result.Data["Schema"]);
    }

    [Fact]
    public async Task CheckHealthAsync_WithDifferentEnvironments_ReturnsCorrectEnvironment()
    {
        // Arrange
        SetupDefaultContext();
        var context = new HealthCheckContext();
        var environments = new[] { "Development", "Production", "Staging", "Test" };

        foreach (var environment in environments)
        {
            _webHostEnvironment.EnvironmentName.Returns(environment);

            // Act
            var result = await _healthCheck.CheckHealthAsync(context, CancellationToken.None);

            // Assert
            Assert.Equal(environment, result.Data["Env"]);
        }
    }

    [Fact]
    public async Task CheckHealthAsync_WithEmptyEnvironment_ReturnsEmptyEnvironment()
    {
        // Arrange
        SetupDefaultContext();
        var context = new HealthCheckContext();
        _webHostEnvironment.EnvironmentName.Returns("");

        // Act
        var result = await _healthCheck.CheckHealthAsync(context, CancellationToken.None);

        // Assert
        Assert.Equal("", result.Data["Env"]);
    }

    [Fact]
    public async Task CheckHealthAsync_WithNullEnvironment_ReturnsNullEnvironment()
    {
        // Arrange
        SetupDefaultContext();
        var context = new HealthCheckContext();
        _webHostEnvironment.EnvironmentName.Returns((string)null);

        // Act
        var result = await _healthCheck.CheckHealthAsync(context, CancellationToken.None);

        // Assert
        Assert.Null(result.Data["Env"]);
    }

    [Fact]
    public async Task CheckHealthAsync_WithValidContext_ContainsAllRequiredFields()
    {
        // Arrange
        SetupDefaultContext();
        var context = new HealthCheckContext();
        var expectedFields = new[]
        {
            "Env", "Host Name", "Local Ip", "Local Port", "Client Ip", 
            "Server Time", "Last Updated", "Host", "Schema"
        };

        // Act
        var result = await _healthCheck.CheckHealthAsync(context, CancellationToken.None);

        // Assert
        foreach (var field in expectedFields)
        {
            Assert.True(result.Data.ContainsKey(field), $"Missing field: {field}");
        }
    }

    [Fact]
    public async Task CheckHealthAsync_WithValidContext_ReturnsReadOnlyDictionary()
    {
        // Arrange
        SetupDefaultContext();
        var context = new HealthCheckContext();

        // Act
        var result = await _healthCheck.CheckHealthAsync(context, CancellationToken.None);

        // Assert
        Assert.IsType<System.Collections.ObjectModel.ReadOnlyDictionary<string, object>>(result.Data);
    }

    [Fact]
    public void Constructor_WithValidParameters_CreatesInstance()
    {
        // Arrange & Act
        var healthCheck = new WhoAmIHealthCheck(_httpContextAccessor, _webHostEnvironment);

        // Assert
        Assert.NotNull(healthCheck);
    }
} 