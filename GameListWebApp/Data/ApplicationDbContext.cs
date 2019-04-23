using GameListWebApp.Data.Comments;
using GameListWebApp.Data.Items;
using GameListWebApp.Data.Users;
using Microsoft.EntityFrameworkCore;

namespace GameListWebApp.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<ApplicationUser>().ToTable("Users");
            modelBuilder.Entity<ApplicationUser>().HasMany(u => u.Items).WithOne(i => i.Author);
            modelBuilder.Entity<ApplicationUser>().HasMany(u => u.Comments).WithOne(c => c.Author).HasPrincipalKey(u => u.Id);

            modelBuilder.Entity<Item>().ToTable("Items");
            modelBuilder.Entity<Item>().Property(i => i.Id).ValueGeneratedOnAdd();
            modelBuilder.Entity<Item>().HasMany(u => u.Comments).WithOne(c => c.Item);

            modelBuilder.Entity<Comment>().ToTable("Comments");
            modelBuilder.Entity<Comment>().HasOne(c => c.Author).WithMany(u => u.Comments).HasForeignKey(c => c.UserId).OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<Comment>().HasOne(c => c.Item).WithMany(i => i.Comments);
            modelBuilder.Entity<Comment>().HasOne(c => c.ParentId).WithMany(c => c.Children);
            modelBuilder.Entity<Comment>().HasMany(c => c.Children).WithOne(c => c.Parent);

            public DbSet<Item> Items { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<ApplicationUser> Users { get; set; }

    }
}

