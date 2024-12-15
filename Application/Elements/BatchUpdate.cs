using System.Runtime.CompilerServices;
using Application.Core;
using AutoMapper;
using MediatR;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Elements
{
    public class BatchUpdate
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid SlideId { get; set; }
            public List<ElementUpdateRequest> ElementsToUpdate { get; set; } = [];
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
                foreach (var element in request.ElementsToUpdate)
                {
                    var existingElement = await _context.Elements.FindAsync(element.Id);

                    if (existingElement == null) return Result<Unit>.Failure($"Cannot find element with ID: {element.Id}");

                    if (element.Type != existingElement.Type)
                    {
                        return Result<Unit>.Failure($"Cannot change element type on element: {element.Id}");
                    }

                    ElementFactory elementFactory = new(_mapper);
                    var updatedElement = elementFactory.CreateElement(element);
                    if (updatedElement == null)
                    {
                        return Result<Unit>.Failure("Failed to create element instance when updating element");
                    }

                    updatedElement.Id = existingElement.Id;
                    updatedElement.SlideId = request.SlideId;

                    _context.Entry(existingElement).CurrentValues.SetValues(updatedElement);
                }
                try
                {
                    var result = await _context.SaveChangesAsync(cancellationToken) > 0;

                    if (result)
                    {
                        return Result<Unit>.Success(Unit.Value);
                    }

                    return Result<Unit>.Failure("No changes were made to the element.");
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error occurred while updating element");
                    return Result<Unit>.Failure("Error occurred while updating element");
                }
            }
        }
    }

}
