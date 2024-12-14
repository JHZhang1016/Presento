using Application.Elements;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ElementsController : BaseApiController
    {
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Create.Command command)
        {
            return HandleResult(await Mediator.Send(command));
        }
    }
}