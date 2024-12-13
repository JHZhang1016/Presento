using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Slides
{
    public class Update
    {
        public class Command : IRequest<Result<SlideDto>>
        {
            public Guid Id { get; set; }
            public int Order { get; set; }
            public BackgroundType BackgroundType { get; set; }
            public string? BackgroundValue { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => new SlideDto { 
                    Id = x.Id, 
                    Order = x.Order, 
                    BackgroundType = x.BackgroundType, 
                    BackgroundValue = x.BackgroundValue 
                }).SetValidator(new SlideValidator(), "validateId");
            }
        }

        public class Handler : IRequestHandler<Command, Result<SlideDto>>
        {
            private readonly Datacontext _context;
            private readonly IMapper _mapper;
            private readonly ILogger<Handler> _logger;
            public Handler(Datacontext context, IMapper mapper, ILogger<Handler> logger)
            {
                _context = context;
                _mapper = mapper;
                _logger = logger;
            }

            public async Task<Result<SlideDto>> Handle(Command request, CancellationToken cancellationToken)
            {
                var Slide = await _context.Slides.FindAsync(request.Id);

                if (Slide == null)
                    return Result<SlideDto>.NotFound();

                _mapper.Map(request, Slide);

                var slideDto = _mapper.Map<SlideDto>(Slide);

                try
                {
                    var result = await _context.SaveChangesAsync(cancellationToken) > 0;

                    if (result)
                        return Result<SlideDto>.Success(slideDto);

                    return Result<SlideDto>.Failure("No changes were made");
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error occurred while updating slide");
                    return Result<SlideDto>.Failure("Error occurred while updating slide");
                }
            }
        }
    }
}