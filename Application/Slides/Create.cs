using Application.Core;
using Domain;
using FluentValidation;
using FluentValidation.Results;
using MediatR;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Persistence;

namespace Application.Slides
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public int Order { get; set; }
            public BackgroundType BackgroundType { get; set; }
            public string? BackgroundValue { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => new SlideDto { 
                    Id = Guid.Empty, 
                    Order = x.Order, 
                    BackgroundType = x.BackgroundType, 
                    BackgroundValue = x.BackgroundValue 
                }).SetValidator(new SlideValidator());
            }
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
                var newSlide = new Slide
                {
                    Id = Guid.NewGuid(),
                    Order = request.Order,
                    BackgroundType = request.BackgroundType,
                    BackgroundValue = request.BackgroundValue,
                    UpdatedAt = DateTime.Now
                };
                
                await _context.Slides.AddAsync(newSlide);

                try
                {
                    var result = await _context.SaveChangesAsync(cancellationToken) > 0;

                    if (result)
                        return Result<Unit>.Success(Unit.Value);

                    return Result<Unit>.Failure("Failed to create slide.");
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error occurred while creating slide");
                    return Result<Unit>.Failure("An unexpected error occurred while creating the slide.");
                }
            }
        }
    }
}
