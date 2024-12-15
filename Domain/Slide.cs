namespace Domain
{
    public class Slide
    {
        public required Guid Id { get; set; }
        public int Order {get; set;} = 0;
        private BackgroundType _defaultBackgroundType;
        public BackgroundType BackgroundType {
            get => _defaultBackgroundType;
            set {
                _defaultBackgroundType = value;
                BackgroundValue = value switch
                {
                    BackgroundType.Solid => "#ffffff",
                    BackgroundType.Gradient => "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(227,227,227,1) 100%)",
                    BackgroundType.Image => "https://via.placeholder.com/150",
                    _ => ""
                };
            }
        }
        public string? BackgroundValue {get;set;}
        public DateTime UpdatedAt { get; set; }

        public Guid PresentationId {get; set;} // Foreign key
        public Presentation Presentation { get; set; } = null!;
        public ICollection<Element> Elements { get; set; } = new List<Element>(); // Navigation property
    }
}