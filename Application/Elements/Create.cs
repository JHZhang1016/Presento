using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Elements
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>, IElementRequest
        {
            // public Guid SlideId { get; set; }
            public int PositionX { get; set; }
            public int PositionY { get; set; }
            public int Height { get; set; }
            public int Width { get; set; }
            public int ZIndex { get; set; }
            public required ElementsType Type { get; set; }
            public Dictionary<string, object> Details { get; set; } = [];
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator(IMapper mapper)
            {
                ElementFactory elementFactory = new(mapper);
                RuleFor(x => x).Custom((x, context) =>
                {
                    Console.WriteLine(x);
                });
                RuleFor(x => x).SetValidator(new ElementValidator());

            }
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
                ElementFactory elementFactory = new(_mapper);
                var element = elementFactory.CreateElement(request);
                if (element == null)
                {
                    return Result<Unit>.Failure("Failed to create element");
                }
                element.Id = Guid.NewGuid();

                _context.Add(element);
                try
                {
                    var result = await _context.SaveChangesAsync(cancellationToken) > 0;

                    if (result)
                        return Result<Unit>.Success(Unit.Value);

                    return Result<Unit>.Failure("Failed to create element.");
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error occurred while creating element");
                    return Result<Unit>.Failure("Error occurred while creating element");
                }
            }
        }
    }
}