using Application.Core;
using Application.Interfaces;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Presentations
{

    public class List
    {
        public class Query : IRequest<Result<Dictionary<Guid, PresentationSummaryDto>>> { }

        public class Handler : IRequestHandler<Query, Result<Dictionary<Guid, PresentationSummaryDto>>>
        {
            private readonly Datacontext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly IMapper _mapper;

            public Handler(Datacontext context, IUserAccessor userAccessor, IMapper mapper)
            {
                _mapper = mapper;
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Result<Dictionary<Guid, PresentationSummaryDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var presentations = await _context.Presentation
                    .AsNoTracking()
                    .Where(p => p.UserId == _userAccessor.GetUserId())
                    .ToListAsync();

                var presentationsDto = _mapper.Map<List<PresentationSummaryDto>>(presentations);

                 var presentationsDictionary = presentationsDto.ToDictionary(p => p.Id);

                return Result<Dictionary<Guid, PresentationSummaryDto>>.Success(presentationsDictionary);
            }
        }
    }


}