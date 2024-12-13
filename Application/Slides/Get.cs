using Application.Core;
using AutoMapper;
using MediatR;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Slides
{
    public class Get
    {
        public class Query : IRequest<Result<SlideDto>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<SlideDto>>
        {
            private readonly Datacontext _context;
            private readonly IMapper _mapper;
            private readonly ILogger<Handler> _logger;
            public Handler(Datacontext context, IMapper mapper, ILogger<Handler> logger)
            {
                _context = context;
                _mapper = mapper;
                _logger = logger;
            }

            public async Task<Result<SlideDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var slide = await _context.Slides.FindAsync(request.Id);

                if (slide == null)
                {
                    _logger.LogWarning("Slide with ID {Id} not found.", request.Id);
                    return Result<SlideDto>.NotFound();
                }

                var slideDto = _mapper.Map<SlideDto>(slide);
                return Result<SlideDto>.Success(slideDto);
            }
        }
    }
}