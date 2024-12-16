namespace Domain
{
    public class Presentation
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = "";
        public string? Description { get; set; }
        public string? ThumbnailUrl { get; set; }
        public BackgroundType DefaultBackgroundType { get; set; }
        public string DefaultBackgroundValue { get; set; } = "#ffffff";
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public List<Slide> Slides { get; set; } = [];
        public string UserId {get; set;} = string.Empty; // Foreign key to AppUser
        public AppUser User { get; set; } = null!;  // Navigation property to AppUser
        
        public Presentation()
        {
            Id = Guid.NewGuid();
            CreatedAt = DateTime.UtcNow;
            UpdatedAt = CreatedAt;
        }

        public void UpdateTime()
        {
            UpdatedAt = DateTime.UtcNow;
        }
    }
}