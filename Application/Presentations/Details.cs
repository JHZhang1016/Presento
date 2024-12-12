using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Presentations
{
    public class Details
    {
        public class Query : IRequest<Result<Presentation>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Presentation>>
        {
            private readonly Datacontext _context;

            public Handler(Datacontext context)
            {
                _context = context;
            }

            public async Task<Result<Presentation>> Handle(Query request, CancellationToken cancellationToken)
            {
                var presentation = await _context.Presentation.FindAsync(request.Id);

                if (presentation == null) return Result<Presentation>.NotFound();

                return Result<Presentation>.Success(presentation);
            }
        }
    }
}