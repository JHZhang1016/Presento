using Domain;

// Dto received From Frontend
namespace API.DTOs
{
    public class SlideDto
    {
        public int Order { get; set; } = 0;
        public BackgroundType BackgroundType;
        public string? BackgroundValue { get; set; }
    }
}