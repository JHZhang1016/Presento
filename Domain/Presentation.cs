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
        public string Title { get; set; } = "";
        public string? Description { get; set; }
        public string? ThumbnailUrl { get; set; }
        public BackgroundType DefaultBackgroundType { get; set; }
        public string? DefaultBackgroundValue { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        public Presentation()
        {
            Id = Guid.NewGuid();
            CreatedAt = DateTime.UtcNow;
            UpdatedAt = CreatedAt;
        }

        public void Update()
        {
            UpdatedAt = DateTime.UtcNow;
        }
    }
}