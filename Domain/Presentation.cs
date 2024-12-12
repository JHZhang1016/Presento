namespace Domain
{
    public enum BackgroundType
    {
        Solid,
        Gradient,
        Image
    }

    public class Presentation
    {
        public Guid Id { get; set; }
        public required string Title { get; set; }
        public string? Description { get; set; }
        public string? ThumbnailUrl { get; set; }
        public BackgroundType DefaultBackgroundType { get; set; }
        public string? DefaultBackgroundValue { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}