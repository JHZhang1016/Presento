using Domain;

// A Dto that will be used to transfer to Controllers when updating a presentation
namespace Application.Presentations
{
    public class PresentationDto
    {
        public string Title { get; set; } = "";
        public string? Description { get; set; }
        public string? ThumbnailUrl { get; set; }
        public BackgroundType DefaultBackgroundType { get; set; }
        public string? DefaultBackgroundValue { get; set; }
    }
}