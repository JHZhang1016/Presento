using Application.Slides;
using Domain;

namespace Application.Presentations
{
    public class PresentationDetailedDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = "";
        public string? Description { get; set; }
        public string? ThumbnailUrl { get; set; }
        public BackgroundType DefaultBackgroundType { get; set; }
        public string? DefaultBackgroundValue { get; set; }
        public List<Guid>? SlideOrder {get; set;}
        public List<SlideDetailedDto>? SlideDetails {get; set;}
    }
}