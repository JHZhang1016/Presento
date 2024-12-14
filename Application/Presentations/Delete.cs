using Application.Core;
using MediatR;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Presentations
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly Datacontext _context;
            private readonly ILogger<Handler> _logger;
            public Handler(Datacontext context, ILogger<Handler> logger)
            {
                _context = context;
                _logger = logger;
            }


            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var presentation = await _context.Presentation.FindAsync(request.Id);

                if (presentation == null)
                {
                    _logger.LogInformation("Presentation with ID {Id} not found", request.Id);
                    return Result<Unit>.NotFound();
                }

                _context.Remove(presentation);

                try
                {
                    var result = await _context.SaveChangesAsync(cancellationToken) > 0;

                    if (result)
                    {
                        _logger.LogInformation("Presentation with ID {Id} successfully deleted", request.Id);
                        return Result<Unit>.Success(Unit.Value);
                    }
                    _logger.LogWarning("Failed to delete presentation with ID {Id}", request.Id);
                    return Result<Unit>.Failure("Failed to delete the presentation.");
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error occurred while deleting presentation with ID {Id}", request.Id);
                    return Result<Unit>.Failure("An unexpected error occurred while deleting the presentation.");
                }

            }
        }
    }
}