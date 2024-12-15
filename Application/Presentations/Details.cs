using Application.Core;
using Application.Slides;
using AutoMapper;
using MediatR;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Presentations
{
    public class Details
    {
        public class Query : IRequest<Result<PresentationDetailedDto>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PresentationDetailedDto>>
        {
            private readonly Datacontext _context;
            private readonly ILogger _logger;
            private readonly IMapper _mapper;

            public Handler(Datacontext context, ILogger<Handler> logger, IMapper mapper)
            {
                _mapper = mapper;
                _logger = logger;
                _context = context;
            }

            public async Task<Result<PresentationDetailedDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var presentation = await _context.Presentation.FindAsync(request.Id);

                var presentationDetailed = _mapper.Map<PresentationDetailedDto>(presentation);

                if (presentation == null) return Result<PresentationDetailedDto>.NotFound();

                var slideOrder = await SlideRetrievalHelper.GetSlideIds(_context, request.Id);

                if (slideOrder == null) return Result<PresentationDetailedDto>.NotFound();

                var allSlideDetails = await SlideRetrievalHelper.GetSlideDetailedByPresentationId(_context, _logger, _mapper, slideOrder);

                presentationDetailed.SlideOrder = slideOrder;
                presentationDetailed.SlideDetails = allSlideDetails;

                return Result<PresentationDetailedDto>.Success(presentationDetailed);
            }
        }
    }
}