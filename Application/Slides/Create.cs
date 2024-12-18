using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Slides
{
    public class Create
    {
        public class Command : IRequest<Result<SlideDto>>
        {
            public Guid PresentationId { get; set; }
            public int Order { get; set; }
            public BackgroundType BackgroundType { get; set; }
            public string? BackgroundValue { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => new SlideDto
                {
                    Id = Guid.Empty,
                    Order = x.Order,
                    BackgroundType = x.BackgroundType,
                    BackgroundValue = x.BackgroundValue
                }).SetValidator(new SlideValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<SlideDto>>
        {
            private readonly Datacontext _context;
            private readonly ILogger<Handler> _logger;
            public Handler(Datacontext context, ILogger<Handler> logger)
            {
                _context = context;
                _logger = logger;
            }

            public async Task<Result<SlideDto>> Handle(Command request, CancellationToken cancellationToken)
            {
                var presentation = await _context.Presentation.FindAsync(request.PresentationId);

                if (presentation == null)
                {
                    _logger.LogWarning("Presentation with ID {PresentationId} not found.", request.PresentationId);
                    return Result<SlideDto>.Failure("The specified Presentation does not exist.");
                }

                var newSlide = new Slide
                {
                    Id = Guid.NewGuid(),
                    Order = request.Order,
                    BackgroundType = request.BackgroundType,
                    BackgroundValue = request.BackgroundValue,
                    UpdatedAt = DateTime.Now,
                    PresentationId = request.PresentationId
                };

                await _context.Slides.AddAsync(newSlide);

                try
                {
                    var result = await _context.SaveChangesAsync(cancellationToken) > 0;

                    if (result)
                        return Result<SlideDto>.Success(new SlideDto
                        {
                            Id = newSlide.Id,
                            Order = newSlide.Order,
                            BackgroundType = newSlide.BackgroundType,
                            BackgroundValue = newSlide.BackgroundValue
                        });

                    return Result<SlideDto>.Failure("Failed to create slide.");
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error occurred while creating slide");
                    return Result<SlideDto>.Failure("An unexpected error occurred while creating the slide.");
                }
            }
        }
    }
}
