using Application.Slides;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class SlidesController : BaseApiController
    {
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            return HandleResult(await Mediator.Send(new Get.Query { Id = id }));
        }


        [HttpPost]
        public async Task<IActionResult> Create([FromBody] DTOs.SlideDto slide)
        {
            var command = new Create.Command
            {
                Order = slide.Order,
                BackgroundType = slide.BackgroundType,
                BackgroundValue = slide.BackgroundValue
            };
            var result = await Mediator.Send(command);
            return HandleResult(result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromBody] DTOs.SlideDto slide,[FromRoute] Guid id)
        {
            var command = new Update.Command
            {
                Id = id,
                Order = slide.Order,
                BackgroundType = slide.BackgroundType,
                BackgroundValue = slide.BackgroundValue
            };
            var result = await Mediator.Send(command);
            return HandleResult(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var command = new Delete.Command { Id = id };
            var result = await Mediator.Send(command);
            return HandleResult(result);
        }
    }
}