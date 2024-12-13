namespace API.DTOs
{
    public enum BackgroundType
    {
        Solid,
        Gradient,
        Image
    }

    public class PresentationDto
    {
        public string Title { get; set; } = "";
        public string? Description { get; set; }
        public string? ThumbnailUrl { get; set; }
        public BackgroundType DefaultBackgroundType { get; set; }
        public string? DefaultBackgroundValue { get; set; }
    }
}