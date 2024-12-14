using Application.Elements;
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

        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromBody] Update.Command command, [FromRoute]Guid id)
        {
            command.Id = id;
            return HandleResult(await Mediator.Send(command));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            return HandleResult(await Mediator.Send(new Get.Command { Id = id }));
        }
    }
}