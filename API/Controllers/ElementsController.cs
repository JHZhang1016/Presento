using Application.Elements;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/presentation/{presentationId}/slides/{slideId}/[controller]")]
    public class ElementsController : BaseApiController
    {
        [HttpPost]
        [Authorize(Policy="IsPresentationOwner")]
        public async Task<IActionResult> Create([FromBody] Create.Command command, [FromRoute] Guid slideId)
        {
            command.SlideId = slideId;
            return HandleResult(await Mediator.Send(command));
        }

        [HttpPut("{id}")]
        [Authorize(Policy="IsPresentationOwner")]
        public async Task<IActionResult> Update([FromBody] Update.Command command, [FromRoute]Guid id, [FromRoute] Guid slideId)
        {
            command.SlideId = slideId;
            command.Id = id;
            return HandleResult(await Mediator.Send(command));
        }

        [HttpDelete("{id}")]
        [Authorize(Policy="IsPresentationOwner")]
        public async Task<IActionResult> Delete(Guid id, [FromRoute] Guid slideId)
        {

            return HandleResult(await Mediator.Send(new Delete.Command { Id = id, SlideId = slideId }));
        }

        [HttpGet("{id}")]
        [Authorize(Policy="IsPresentationOwner")]
        public async Task<IActionResult> Get(Guid id, [FromRoute] Guid slideId)
        {
            return HandleResult(await Mediator.Send(new Get.Command { Id = id , SlideId = slideId  }));
        }

        [HttpGet]
        [Authorize(Policy="IsPresentationOwner")]
        public async Task<IActionResult> GetAllBySlide([FromRoute]Guid slideId){
            return HandleResult(await Mediator.Send(new GetAllBySlide.Query { SlideId = slideId  }));
        }

        [Route("batch-update")]
        [Authorize(Policy="IsPresentationOwner")]
        public async Task<IActionResult> BatchUpdate([FromRoute]Guid slideId, [FromBody] List<ElementUpdateRequest> elementsToUpdate){
            var command = new BatchUpdate.Command{SlideId = slideId, ElementsToUpdate = elementsToUpdate};

            return HandleResult(await Mediator.Send(command));
        }
    }
}