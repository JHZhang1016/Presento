using Application.Elements;
using Domain;

namespace Application.Slides
{
    public class SlideDetailedDto
    {
        public required Guid Id { get; set; }
        public int Order {get; set;} = 0;
        public BackgroundType BackgroundType { get; set; }
        public string? BackgroundValue {get;set;}
        public Dictionary<Guid, ElementDto>? Elements {get; set;}
        public List<Guid>? ElementOrder {get; set;}
    }
}