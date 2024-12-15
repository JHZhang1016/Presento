using AutoMapper;
using Domain;
using Domain.Elements;

namespace Application.Elements
{
    public static class AutoMapperExtensions
    {
        public static ElementDto MapElementToDto(this IMapper mapper, Element element)
        {
            return element switch
            {
                TextElement textElement => mapper.Map<TextElementDto>(textElement),
                ImageElement imageElement => mapper.Map<ImageElementDto>(imageElement),
                VideoElement videoElement => mapper.Map<VideoElementDto>(videoElement),
                CodeElement codeElement => mapper.Map<CodeElementDto>(codeElement),
                _ => throw new ArgumentOutOfRangeException(nameof(element.Type), "Invalid element type")
            };
        }
    }
}