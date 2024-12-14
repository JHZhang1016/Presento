using Application.Elements;
using Application.Presentations;
using Application.Slides;
using AutoMapper;
using Domain;
using Domain.Elements;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Presentations.Create.Command, Presentation>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedAt, opt => opt.Ignore())
                .ForMember(dest => dest.UpdatedAt, opt => opt.Ignore());
            CreateMap<Presentations.Update.Command, Presentation>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedAt, opt => opt.Ignore())
                .ForMember(dest => dest.UpdatedAt, opt => opt.Ignore());
            CreateMap<Presentation, PresentationDto>();
            CreateMap<Slide, SlideDto>();
            CreateMap<Slides.Update.Command, Slide>();

            // Elements
            CreateMap<IElementRequest, Element>();

            CreateMap<IElementRequest, TextElement>()
                .IncludeBase<IElementRequest, Element>();
            CreateMap<IElementRequest, CodeElement>()
                .IncludeBase<IElementRequest, Element>();
            CreateMap<IElementRequest, VideoElement>()
                .IncludeBase<IElementRequest, Element>();
            CreateMap<IElementRequest, ImageElement>()  
                .IncludeBase<IElementRequest, Element>();
        }
    }
}