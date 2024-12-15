using Domain;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(Datacontext context)
        {
            // 如果已经存在数据，则不重复插入
            if (context.Presentation.Any()) return;

            var presentations = new List<Presentation>
            {
                new Presentation
                {
                    Id = Guid.NewGuid(),
                    Title = "First Presentation",
                    Description = "This is the first sample presentation.",
                    ThumbnailUrl = "https://example.com/thumbnail1.png",
                    DefaultBackgroundType = BackgroundType.Solid,
                    DefaultBackgroundValue = "#FFFFFF",
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                },
                new Presentation
                {
                    Id = Guid.NewGuid(),
                    Title = "Second Presentation",
                    Description = "A presentation about technology.",
                    ThumbnailUrl = "https://example.com/thumbnail2.png",
                    DefaultBackgroundType = BackgroundType.Gradient,
                    DefaultBackgroundValue = "linear-gradient(to right, #00f, #0ff)",
                    CreatedAt = DateTime.UtcNow.AddDays(-1),
                    UpdatedAt = DateTime.UtcNow
                },
                new Presentation
                {
                    Id = Guid.NewGuid(),
                    Title = "Third Presentation",
                    Description = "Another sample, with image background.",
                    ThumbnailUrl = "https://example.com/thumbnail3.png",
                    DefaultBackgroundType = BackgroundType.Image,
                    DefaultBackgroundValue = "https://example.com/background.jpg",
                    CreatedAt = DateTime.UtcNow.AddDays(-2),
                    UpdatedAt = DateTime.UtcNow
                }
            };

            await context.Presentation.AddRangeAsync(presentations);
            await context.SaveChangesAsync();
        }
    }
}
