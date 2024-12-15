using Domain;
using Domain.Elements;

namespace Application.Elements
{

    public abstract class ElementDto
    {
        public Guid Id { get; set; }
        public int PositionX { get; set; }
        public int PositionY { get; set; }
        public int Height { get; set; }
        public int Width { get; set; }
        public int ZIndex { get; set; }
        public ElementsType Type { get; set;}
    } 

    public class TextElementDto : ElementDto
    {
        public string? Text { get; set; }
        public FontFamilyEnum FontFamily { get; set; }
        public int FontSize { get; set; }
        public string? FontColor { get; set; }
    }

    public class ImageElementDto : ElementDto
    {
        public string? Source { get; set; }
        public string? Alt { get; set; }
    }

    public class VideoElementDto : ElementDto
    {
        public string? Source { get; set; }
        public bool Autoplay { get; set; }
    }

    public class CodeElementDto : ElementDto
    {
        public string? CodeContent { get; set; }
    }
}