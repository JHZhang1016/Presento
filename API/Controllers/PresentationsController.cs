using API.DTOs;
using Application.Presentations;
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

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> Get([FromRoute] Guid id)
        {
            var result = await Mediator.Send(new Details.Query { Id = id });
            return HandleResult(result);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] PresentationDto presentation)
        {
            var command = new Create.Command
            {
                Title = presentation.Title,
                Description = presentation.Description,
                ThumbnailUrl = presentation.ThumbnailUrl,
                DefaultBackgroundType = MapBackgroundType(presentation.DefaultBackgroundType),
                DefaultBackgroundValue = presentation.DefaultBackgroundValue
            };
            var result = await Mediator.Send(command);
            return HandleResult(result);
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> Create([FromBody] PresentationDto presentation, [FromRoute] Guid id)
        {
            var command = new Update.Command
            {
                Id = id,
                Title = presentation.Title,
                Description = presentation.Description,
                ThumbnailUrl = presentation.ThumbnailUrl,
                DefaultBackgroundType = MapBackgroundType(presentation.DefaultBackgroundType),
                DefaultBackgroundValue = presentation.DefaultBackgroundValue
            };
            var result = await Mediator.Send(command);
            return HandleResult(result);
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var result = await Mediator.Send(new Delete.Command { Id = id });
            return HandleResult(result);
        }

        private Domain.BackgroundType MapBackgroundType(BackgroundType apiType)
        {
            return apiType switch
            {
                BackgroundType.Solid => Domain.BackgroundType.Solid,
                BackgroundType.Gradient => Domain.BackgroundType.Gradient,
                BackgroundType.Image => Domain.BackgroundType.Image,
                _ => throw new ArgumentOutOfRangeException(nameof(apiType), $"Unhandled type: {apiType}")
            };
        }
    }
}