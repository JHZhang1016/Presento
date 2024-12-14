using Domain.Elements;

namespace Application.Elements
{
    public abstract class ElementDetails
    {
    }

    public class TextElementDetails  : ElementDetails
    {
        public string? Text { get; set; }
        public FontFamilyEnum FontFamily { get; set; }
        public int FontSize { get; set; }
        public string? FontColor { get; set; }
    }

    public class CodeElementDetails : ElementDetails
    {
        public string? Code { get; set; }
        public string? Language { get; set; }
    }

    public class VideoElementDetails : ElementDetails
    {
        public string? VideoUrl { get; set; }
        bool AutoPlay { get; set; }
    }

    public class ImageElementDetails : ElementDetails
    {
        public string? ImageUrl { get; set; }
        public string? AltText { get; set; }
    }
}