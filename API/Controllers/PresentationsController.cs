using Application.Presentations;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class PresentationsController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> List()
        {
            var result = await Mediator.Send(new List.Query());
            return HandleResult(result);
        }

        [Authorize(Policy="IsPresentationOwner")]
        [HttpGet]
        [Route("{presentationId}")]
        public async Task<IActionResult> Get([FromRoute] Guid presentationId)
        {
            var result = await Mediator.Send(new Details.Query { Id = presentationId });
            return HandleResult(result);
        }


        [HttpPost]
        public async Task<IActionResult> Create([FromBody] DTOs.PresentationDto presentation)
        {
            Console.WriteLine($"Title: {presentation.Title}");
            Console.WriteLine($"Description: {presentation.Description}");
            Console.WriteLine($"ThumbnailUrl: {presentation.ThumbnailUrl}");
            Console.WriteLine($"DefaultBackgroundType: {presentation.DefaultBackgroundType}");
            Console.WriteLine($"DefaultBackgroundValue: {presentation.DefaultBackgroundValue}");


            var command = new Create.Command
            {
                Title = presentation.Title,
                Description = presentation.Description,
                ThumbnailUrl = presentation.ThumbnailUrl,
                DefaultBackgroundType = presentation.DefaultBackgroundType,
                DefaultBackgroundValue = presentation.DefaultBackgroundValue
            };
            var result = await Mediator.Send(command);
            return HandleResult(result);
        }

        [Authorize(Policy="IsPresentationOwner")]
        [HttpPut]
        [Route("{presentationId}")]
        public async Task<IActionResult> Update([FromBody] DTOs.PresentationDto presentation, [FromRoute] Guid presentationId)
        {
            var command = new Update.Command
            {
                Id = presentationId,
                Title = presentation.Title,
                Description = presentation.Description,
                ThumbnailUrl = presentation.ThumbnailUrl,
                DefaultBackgroundType = presentation.DefaultBackgroundType,
                DefaultBackgroundValue = presentation.DefaultBackgroundValue
            };
            var result = await Mediator.Send(command);
            return HandleResult(result);
        }

        [Authorize(Policy="IsPresentationOwner")]
        [HttpDelete]
        [Route("{presentationId}")]
        public async Task<IActionResult> Delete([FromRoute] Guid presentationId)
        {
            var result = await Mediator.Send(new Delete.Command { Id = presentationId });
            return HandleResult(result);
        }
    }
}