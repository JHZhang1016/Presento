using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Elements
{
    public class Update
    {
        public class Command : IRequest<Result<ElementDto>>, IElementRequest
        {
            public Guid SlideId { get; set; }
            public Guid Id { get; set; }
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

        public class Handler : IRequestHandler<Command, Result<ElementDto>>
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

            public async Task<Result<ElementDto>> Handle(Command request, CancellationToken cancellationToken)
            {
                var existingElement = await _context.Elements.FindAsync(request.Id);

                if (existingElement == null) return Result<ElementDto>.NotFound();

                if(request.Type != existingElement.Type)
                {
                    return Result<ElementDto>.Failure("Cannot change element type");
                }

                ElementFactory elementFactory = new(_mapper);
                var updatedElement = elementFactory.CreateElement(request);
                if (updatedElement == null)
                {
                    return Result<ElementDto>.Failure("Failed to create element instance when updating element");
                }

                updatedElement.Id = existingElement.Id;
                updatedElement.UpdatedAt = DateTime.UtcNow;
                _context.Entry(existingElement).CurrentValues.SetValues(updatedElement);

                try
                {
                    var result = await _context.SaveChangesAsync(cancellationToken) > 0;

                    if (result){
                        var elementDto = _mapper.MapElementToDto(updatedElement);
                        
                        if (elementDto == null)
                        {
                            return Result<ElementDto>.Failure("Failed to map updated element to DTO.");
                        }
                        
                        return Result<ElementDto>.Success(elementDto);
                    }
                        
                    return Result<ElementDto>.Failure("No changes were made to the element.");
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error occurred while updating element");
                    return Result<ElementDto>.Failure("Error occurred while updating element");
                }
            }
        }
    }
}