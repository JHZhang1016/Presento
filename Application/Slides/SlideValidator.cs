using Domain;
using FluentValidation;

namespace Application.Slides
{
    public class SlideValidator : AbstractValidator<SlideDto>
    {

        public SlideValidator()
        {
            RuleSet("validateId", () =>
            {
                RuleFor(x => x.Id)
                    .NotEmpty().WithMessage("ID cannot be empty.");
            });

            RuleFor(x => x.Order).GreaterThan(0)
                .WithMessage("Order must be greater than 0.");

            RuleFor(x => x.BackgroundType)
                .IsInEnum()
                .WithMessage("Invalid BackgroundType.");

            RuleFor(x => x.BackgroundValue)
                .NotEmpty()
                .When(x => x.BackgroundType == BackgroundType.Solid)
                .Matches("^#(?:[A-Fa-f0-9]{3}){1,2}$").WithMessage("Invalid HEX color for Solid background type.");
        }
    }
}