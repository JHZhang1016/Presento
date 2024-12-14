namespace Domain.Elements
{
    public class TextElement : Element
    {
        public string Text { get; set; } = string.Empty;
        public FontFamilyEnum FontFamily { get; set; }
        public int FontSize { get; set; } = 1;
        public string FontColor { get; set; } = "#000000";
    }
}