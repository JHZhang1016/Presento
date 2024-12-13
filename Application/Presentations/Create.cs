using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Presentations
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string Title { get; set; } = "";
            public string? Description { get; set; }
            public string? ThumbnailUrl { get; set; }
            public BackgroundType DefaultBackgroundType { get; set; }
            public string? DefaultBackgroundValue { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
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

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var newPresentation = new Presentation();
                _mapper.Map(request, newPresentation);

                await _context.Presentation.AddAsync(newPresentation);

                try
                {
                    var result = await _context.SaveChangesAsync(cancellationToken) > 0;

                    if (result)
                        return Result<Unit>.Success(Unit.Value);

                    return Result<Unit>.Failure("Failed to create presentation.");
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error occurred while creating presentation");
                    return Result<Unit>.Failure($"An error occurred: {ex.Message}");
                }
            }
        }
    }
}