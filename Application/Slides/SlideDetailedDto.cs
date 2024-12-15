using Application.Elements;
using Domain;

namespace Application.Slides
{
    public class SlideDetailedDto
    {
        public required Guid Id { get; set; }
        public int Order {get; set;} = 0;
        public BackgroundType BackgroundType;
        public string? BackgroundValue {get;set;}
        public List<ElementDto>? Elements {get; set;}
    }
}