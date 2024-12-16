using Infrastructure.Security;
using Persistence;
using Application.Core;
using Application.Presentations;
using Application.Slides;
using FluentValidation;
using System.Reflection;
using Application.Interfaces;
using API.Extensions;
using Microsoft.EntityFrameworkCore;
using Infrastructure.Photos;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();
            services.AddDbContext<Datacontext>(opt =>
            {
                opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
            });

            services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());
            services.AddValidatorsFromAssemblyContaining<SlideValidator>(includeInternalTypes: true);
            services.AddMediatR(cfg =>
            {
                cfg.RegisterServicesFromAssembly(typeof(List).Assembly);
                cfg.AddOpenBehavior(typeof(ValidationBehavior<,>));
            });
            services.AddAutoMapper(typeof(MappingProfiles).Assembly);
            services.AddIdentityServices(config);
            services.AddHttpContextAccessor();
            services.AddScoped<IUserAccessor, UserAccessor>();
            services.AddScoped<IPhotoAccessor, PhotoAccessor>();
            services.Configure<CloudinarySettings>(config.GetSection("Cloudinary"));

            return services;
        }
    }
}