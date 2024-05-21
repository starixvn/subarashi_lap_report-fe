namespace Fanex.Athena.Report.WebHost.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            ViewBag.Title = "LAP - Report";

            return View();
        }
    }
}