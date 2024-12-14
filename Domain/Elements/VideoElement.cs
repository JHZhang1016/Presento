namespace Domain.Elements
{
    public class VideoElement : Element
    {
        public string Source { get; set; } = string.Empty;
        public bool Autoplay { get; set; } = false;
    }
}