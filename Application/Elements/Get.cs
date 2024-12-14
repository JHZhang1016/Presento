using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Elements
{
    public class Get
    {
        public class Command : IRequest<Result<Element>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Element>>
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

            public async Task<Result<Element>> Handle(Command request, CancellationToken cancellationToken)
            {
                var element = await _context.Elements.FindAsync(request.Id);
                
                if(element == null) return Result<Element>.NotFound();

                var elementDto = _mapper.Map<Element>(element);

                return Result<Element>.Success(elementDto);
            }
        }
    }
}