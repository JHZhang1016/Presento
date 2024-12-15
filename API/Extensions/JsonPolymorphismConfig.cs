using System.Text.Json.Serialization;
using System.Text.Json.Serialization.Metadata;
using Application.Elements;

namespace API.Extensions
{
    public static class JsonPolymorphismConfig
    {
        public static void ElementDtoJsonMotifier(JsonTypeInfo typeInfo)
        {
            if (typeInfo.Type == typeof(ElementDto))
            {
                typeInfo.PolymorphismOptions = new JsonPolymorphismOptions
                {
                    DerivedTypes =
                    {
                        new JsonDerivedType(typeof(TextElementDto)),
                        new JsonDerivedType(typeof(ImageElementDto)),
                        new JsonDerivedType(typeof(VideoElementDto)),
                        new JsonDerivedType(typeof(CodeElementDto))
                    }
                };
            }
        }

    }
}