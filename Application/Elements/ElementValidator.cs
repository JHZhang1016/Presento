using Domain;
using Domain.Elements;
using FluentValidation;
using System.Text.RegularExpressions;

namespace Application.Elements
{
    public class ElementValidator : AbstractValidator<IElementRequest>
    {
        public ElementValidator()
        {
            RuleFor(x => x.PositionX)
                .NotNull()
                .GreaterThanOrEqualTo(0)
                .LessThanOrEqualTo(100)
                .WithMessage("PositionX must be between 0 and 100");

            RuleFor(x => x.PositionY)
                .NotNull()  
                .GreaterThanOrEqualTo(0)
                .LessThanOrEqualTo(100)
                .WithMessage("PositionY must be between 0 and 100");

            RuleFor(x => x.Height)
                .NotNull()
                .GreaterThanOrEqualTo(0)
                .LessThanOrEqualTo(100)
                .WithMessage("Height must be between 0 and 100");

            RuleFor(x => x.Width)
                .NotNull()
                .GreaterThanOrEqualTo(0)
                .LessThanOrEqualTo(100)
                .WithMessage("Width must be between 0 and 100");

            RuleFor(x => x.ZIndex)
                .NotNull()
                .WithMessage("ZIndex must be a valid integer");
            
            RuleFor(x => x.Type)
                .NotNull()
                .IsInEnum()
                .WithMessage("Type must be provided and be a valid enum value");

            When(x => x.Type == ElementsType.Text, () =>
            {
                RuleFor(x => x.Details)
                    .Must(details => details.ContainsKey("text"))
                    .WithMessage("Must include a 'text' field in details");

                RuleFor(x => x.Details)
                    .Must(details => details.ContainsKey("fontSize") && int.TryParse(details["fontSize"].ToString(), out var size) && size > 0)
                    .WithMessage("Text details must include a valid 'fontSize' field");

                RuleFor(x => x.Details)
                    .Must(details => details.ContainsKey("fontFamily")  && int.TryParse(details["fontFamily"].ToString(), out var fontfamily) && Enum.IsDefined((FontFamilyEnum)fontfamily))
                    .WithMessage("Text details must include a valid 'fontFamily' field");

                RuleFor(x => x.Details)
                    .Must(details => details.ContainsKey("fontColor"))
                    .Must(details => details.ContainsKey("fontColor") && details["fontColor"] != null && Regex.IsMatch(details["fontColor"].ToString()!, "^#(?:[A-Fa-f0-9]{3}){1,2}$"))
                    .WithMessage("Must include a 'fontColor' field in details");
            });

            When(x => x.Type == ElementsType.Image, () => {
                RuleFor(x => x.Details)
                    .Must(details => details.ContainsKey("source"))
                    .WithMessage("Must include a 'source' field in details");
                RuleFor(x => x.Details)
                    .Must(details => details.ContainsKey("alt"))
                    .WithMessage("Must include a 'alt' field in details");
            });

            When(x => x.Type == ElementsType.Video, () => {
                RuleFor(x => x.Details)
                    .Must(details => details.ContainsKey("source"))
                    .WithMessage("Must include a 'source' field in details");
                RuleFor(x => x.Details)
                    .Must(details => details.ContainsKey("autoPlay") && bool.TryParse(details["autoPlay"].ToString(), out var _))
                    .WithMessage("Must include a valid 'autoPlay' field in details");
            });

            When(x => x.Type == ElementsType.Code, () => {
                RuleFor(x => x.Details)
                    .Must(details => details.ContainsKey("codeContent"))
                    .WithMessage("Must include a 'codeContent' field in details");
            });
        }
        
    }
}