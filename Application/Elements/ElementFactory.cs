using AutoMapper;
using Domain;
using Domain.Elements;

namespace Application.Elements
{
    public interface IElementRequest
    {
        public Guid SlideId {get; set;}
        public int PositionX { get; set; }
        public int PositionY { get; set; }
        public int Height { get; set; }
        public int Width { get; set; }
        public int ZIndex { get; set; }
        public ElementsType Type { get; set; }
        public Dictionary<string, object> Details { get; set; }
    }

    public class ElementUpdateRequest : IElementRequest
    {
        public Guid Id { get; set; }
        public Guid SlideId {get; set;}
        public int PositionX { get; set; }
        public int PositionY { get; set; }
        public int Height { get; set; }
        public int Width { get; set; }
        public int ZIndex { get; set; }
        public ElementsType Type { get; set; }
        public Dictionary<string, object> Details { get; set; }
    }

    public class ElementFactory
    {
        private readonly IMapper _mapper;
        public ElementFactory(IMapper mapper)
        {
            _mapper = mapper;
        }

        public Element? CreateElement(IElementRequest request)
        {
            switch (request.Type)
            {
                case ElementsType.Text:
                    {
                        var tempElement = _mapper.Map<TextElement>(request);
                        tempElement.Text = request.Details.GetValueOrDefault("text")?.ToString() ?? tempElement.Text;
                        var fontFamilyValue = request.Details.GetValueOrDefault("fontFamily")?.ToString();
                        if (!string.IsNullOrEmpty(fontFamilyValue))
                        {
                            tempElement.FontFamily = (FontFamilyEnum)Enum.Parse(typeof(FontFamilyEnum), fontFamilyValue);
                        }
                        var fontSizeValue = request.Details.GetValueOrDefault("fontSize")?.ToString();
                        if (!string.IsNullOrEmpty(fontSizeValue))
                        {
                            tempElement.FontSize = int.Parse(fontSizeValue);
                        }
                        tempElement.FontColor = request.Details.GetValueOrDefault("fontColor")?.ToString() ?? tempElement.FontColor;
                        return tempElement;
                    }
                case ElementsType.Image:
                    {
                        var tempElement = _mapper.Map<ImageElement>(request);
                        tempElement.Source = request.Details.GetValueOrDefault("source")?.ToString() ?? tempElement.Source;
                        tempElement.Alt = request.Details.GetValueOrDefault("alt")?.ToString() ?? tempElement.Alt;
                        return tempElement;
                    }
                case ElementsType.Video:
                    {
                        var tempElement = _mapper.Map<VideoElement>(request);
                        tempElement.Source = request.Details.GetValueOrDefault("source")?.ToString() ?? tempElement.Source;
                        var autoplayValue = request.Details.GetValueOrDefault("autoPlay")?.ToString();
                        if(!string.IsNullOrEmpty(autoplayValue))
                        {
                            tempElement.Autoplay = bool.Parse(autoplayValue);
                        }
                        return tempElement;
                    }
                case ElementsType.Code:
                    {
                        var tempElement = _mapper.Map<CodeElement>(request);
                        var codeContentValue = request.Details.GetValueOrDefault("codeContent")?.ToString();
                        if(!string.IsNullOrEmpty(codeContentValue))
                        {
                            tempElement.CodeContent = codeContentValue;
                        }
                        return tempElement;
                    }
                default:
                    return null;
            }

        }

    }
}
