using Application.Core;
using AutoMapper;
using Domain.Elements;
using MediatR;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Elements
{
    public class GetAllBySlide
    {
        public class Query : IRequest<Result<List<ElementDto>>>
        {
            public Guid SlideId { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<ElementDto>>>
        {
            private readonly Datacontext _context;
            private readonly ILogger<Handler> _logger;
            private readonly IMapper _mapper;
            public Handler(Datacontext context, IMapper mapper, ILogger<Handler> logger)
            {
                _logger = logger;
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<ElementDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                if(await _context.Slides.FindAsync(request.SlideId) == null)
                    return Result<List<ElementDto>>.NotFound();

                var allElements = GetAllElementsBySlide(_context, _mapper, request.SlideId);

                return Result<List<ElementDto>>.Success(allElements);
            }
        }

        public static List<ElementDto> GetAllElementsBySlide(Datacontext context, IMapper mapper, Guid slideId)
            {
                var textElements = context.Elements
                    .OfType<TextElement>()
                    .Where(e => e.SlideId == slideId)
                    .Select(e => mapper.MapElementToDto(e))
                    .ToList();

                var imageElements = context.Elements
                    .OfType<ImageElement>()
                    .Where(e => e.SlideId == slideId)
                    .Select(e => mapper.MapElementToDto(e))
                    .ToList();

                var videoElements = context.Elements
                    .OfType<VideoElement>()
                    .Where(e => e.SlideId == slideId)
                    .Select(e => mapper.MapElementToDto(e))
                    .ToList();

                var codeElements = context.Elements
                    .OfType<CodeElement>()
                    .Where(e => e.SlideId == slideId)
                    .Select(e => mapper.MapElementToDto(e))
                    .ToList();

                var allElements = textElements
                    .Concat(imageElements)
                    .Concat(videoElements)
                    .Concat(codeElements)
                    .OrderBy(s => s.ZIndex)
                    .ThenBy(s => s.UpdatedAt)
                    .ToList();

                return allElements;
            }
    }
}