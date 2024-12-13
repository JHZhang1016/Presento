using Application.Core;
using AutoMapper;
using MediatR;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Slides
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
                var slide = await _context.Slides.FindAsync(request.Id);

                if (slide == null)
                    return Result<Unit>.NotFound();

                _context.Slides.Remove(slide);

                try
                {
                    var result = await _context.SaveChangesAsync(cancellationToken) > 0;

                    if (result)
                        return Result<Unit>.Success(Unit.Value);

                    return Result<Unit>.Failure("Failed to delete slide.");
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error occurred while deleting slide");
                    return Result<Unit>.Failure("Error occurred while deleting slide");
                }
            }
        }
    }
}