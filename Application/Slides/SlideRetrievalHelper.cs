using Application.Elements;
using AutoMapper;
using Microsoft.AspNetCore.Builder.Extensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Slides
{
    public static class SlideRetrievalHelper
    {
        public static async Task<List<Guid>?> GetSlideIds(Datacontext context, Guid presentationId)
        {
            var presentationExists = await context.Presentation.AnyAsync(p => p.Id == presentationId);

            if (!presentationExists) return null;

            var slideIds = await context.Slides
                .Where(s => s.PresentationId == presentationId)
                .OrderBy(s => s.Order).ThenBy(s => s.UpdatedAt)
                .Select(s => s.Id)
                .ToListAsync();

            return slideIds;
        }

        public static async Task<List<SlideDetailedDto>?> GetSlideDetailedByPresentationId(Datacontext context, ILogger logger, IMapper mapper, List<Guid> slideIds)
        {
            var result = new List<SlideDetailedDto>();

            if(slideIds == null) return null;

            var slides = await context.Slides
                .Where(s => slideIds.Contains(s.Id))
                .ToListAsync();

            foreach (var slide in slides)
            {
                if (slide == null)
                {
                    logger.LogWarning("Slide with ID {Id} not found.", slide);
                    return null;
                }

                var slideDetailedDto = mapper.Map<SlideDetailedDto>(slide);
                
                var allElements = GetAllBySlide.GetAllElementsBySlide(context, mapper, slide.Id);

                slideDetailedDto.Elements = allElements;

                result.Add(slideDetailedDto);
            }
            return result;
        }
    }
}