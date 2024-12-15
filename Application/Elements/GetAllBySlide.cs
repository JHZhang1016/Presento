using Application.Core;
using AutoMapper;
using Domain;
using Domain.Elements;
using MediatR;
using Microsoft.EntityFrameworkCore;
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

                var textElements = await _context.Elements
                    .OfType<TextElement>()
                    .Where(e => e.SlideId == request.SlideId)
                    .Select(e => _mapper.MapElementToDto(e))
                    .ToListAsync();

                var imageElements = await _context.Elements
                    .OfType<ImageElement>()
                    .Where(e => e.SlideId == request.SlideId)
                    .Select(e => _mapper.MapElementToDto(e))
                    .ToListAsync();

                var videoElements = await _context.Elements
                    .OfType<VideoElement>()
                    .Where(e => e.SlideId == request.SlideId)
                    .Select(e => _mapper.MapElementToDto(e))
                    .ToListAsync();

                var codeElements = await _context.Elements
                    .OfType<CodeElement>()
                    .Where(e => e.SlideId == request.SlideId)
                    .Select(e => _mapper.MapElementToDto(e))
                    .ToListAsync();

                var allElements = textElements
                    .Concat(imageElements)
                    .Concat(videoElements)
                    .Concat(codeElements)
                    .ToList();



                return Result<List<ElementDto>>.Success(allElements);
            }
        }
    }
}