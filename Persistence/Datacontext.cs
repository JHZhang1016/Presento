using Domain;
using Domain.Elements;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class Datacontext : IdentityDbContext<AppUser>
    {
        public Datacontext(DbContextOptions<Datacontext> options)
    : base(options)
        {
        }

        public DbSet<Presentation> Presentation { get; set; } = null!;
        public DbSet<Slide> Slides {get; set;} = null!;
        public DbSet<Element> Elements {get; set;} = null!;
        public DbSet<VideoElement> VideoElements {get; set;} = null!;
        public DbSet<ImageElement> ImageElements {get; set;} = null!;
        public DbSet<CodeElement> CodeElements {get; set;} = null!;
        public DbSet<TextElement> TextElements {get; set;} = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Element>()
                .UseTptMappingStrategy();

            modelBuilder.Entity<Slide>()
                .HasMany(e => e.Elements)
                .WithOne(e => e.Slide)
                .HasForeignKey(e => e.SlideId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Presentation>()
                .HasMany(e => e.Slides)
                .WithOne(e => e.Presentation)
                .HasForeignKey(e => e.PresentationId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Presentation>()
                .HasOne(p => p.User)
                .WithMany()
                .HasForeignKey(p => p.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}