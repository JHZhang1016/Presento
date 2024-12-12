using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class Datacontext : DbContext
    {
        public Datacontext(DbContextOptions<Datacontext> options)
    : base(options)
        {
        }

        public DbSet<Presentation> Presentation { get; set; } = null!;
    }
}