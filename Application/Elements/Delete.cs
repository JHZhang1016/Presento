using Application.Core;
using AutoMapper;
using MediatR;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Elements
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid SlideId { get; set; }
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
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

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var element = await _context.Elements.FindAsync(request.Id);

                if(element == null) return Result<Unit>.NotFound();

                _context.Elements.Remove(element);
                
                try
                {
                    var result = await _context.SaveChangesAsync(cancellationToken) > 0;

                    if (result)
                        return Result<Unit>.Success(Unit.Value);

                    return Result<Unit>.Failure("Failed to delete element.");
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error occurred while deleting element");
                    return Result<Unit>.Failure("Error occurred while deleting element");
                }
            }
        }
    }
}