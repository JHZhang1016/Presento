using Domain;

namespace Application.Slides
{
    public class SlideDto
    {
        public required Guid Id { get; set; }
        public int Order {get; set;} = 0;
        public BackgroundType BackgroundType { get; set; }
        public string? BackgroundValue {get;set;}
    }
}