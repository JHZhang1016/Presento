using Application.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Presentations
{

    public class List
    {
        public class Query : IRequest<Result<List<Domain.Presentation>>> { }

        public class Handler : IRequestHandler<Query, Result<List<Domain.Presentation>>>
        {
            private readonly Datacontext _context;
            public Handler(Datacontext context)
            {
                _context = context;
            }

            public async Task<Result<List<Domain.Presentation>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var presentations = await _context.Presentation
                    .AsNoTracking()
                    .ToListAsync();

                return Result<List<Domain.Presentation>>.Success(presentations);
            }
        }
    }


}