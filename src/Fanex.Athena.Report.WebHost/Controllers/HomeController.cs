namespace Fanex.Athena.Report.ClientApp.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            //var key = Request.Path.ToString().Trim('/');
            ViewBag.Title = "LAP - Report";

            return View();
        }
    }
}