using System.ComponentModel;
using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Presentations
{
    public class Update
    {
        public class Command : IRequest<Result<PresentationDto>>
        {
            public Guid Id { get; set; }
            public string Title { get; set; } = "";
            public string? Description { get; set; }
            public string? ThumbnailUrl { get; set; }
            public BackgroundType DefaultBackgroundType { get; set; }
            public string? DefaultBackgroundValue { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<PresentationDto>>
        {
            private readonly Datacontext _context;
            private readonly IMapper _mapper;
            private readonly ILogger<Handler> _logger;
            public Handler(Datacontext context, IMapper mapper, ILogger<Handler> logger)
            {
                _mapper = mapper;
                _context = context;
                _logger = logger;
            }

            public async Task<Result<PresentationDto>> Handle(Command request, CancellationToken cancellationToken)
            {
                var presentation = await _context.Presentation.FindAsync(request.Id);

                if (presentation == null)
                {
                    _logger.LogInformation("Presentation not found");
                    return Result<PresentationDto>.NotFound();
                }

                _mapper.Map(request, presentation);

                try
                {
                    var result = await _context.SaveChangesAsync(cancellationToken) > 0;

                    if (result)
                        return Result<PresentationDto>.Success(_mapper.Map<PresentationDto>(presentation));

                    return Result<PresentationDto>.Failure("No changes were made");
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error occurred while updating presentation");
                    return Result<PresentationDto>.Failure("Error occurred while updating presentation");
                }
            }
        }
    }
}