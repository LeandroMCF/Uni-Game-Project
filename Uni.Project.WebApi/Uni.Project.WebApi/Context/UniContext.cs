using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Uni.Project.WebApi.Domain;

namespace Uni.Project.WebApi.Context;

public partial class UniContext : DbContext
{
    public UniContext()
    {
    }

    public UniContext(DbContextOptions<UniContext> options)
        : base(options)
    {
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer("Server=DESKTOP-MELCHIL;Database=Project_Uni;Trusted_Connection=True;TrustServerCertificate=True;");

    public DbSet<UserDomain> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
         modelBuilder.Entity<UserDomain>()
            .HasKey(u => u.UserId);

        modelBuilder.Entity<UserDomain>()
            .Property(u => u.Name)
            .HasMaxLength(50)
            .IsRequired();

        modelBuilder.Entity<UserDomain>()
            .Property(u => u.Email)
            .HasMaxLength(50)
            .IsRequired();

        modelBuilder.Entity<UserDomain>()
            .Property(u => u.Password)
            .HasMaxLength(50)
            .IsRequired();

        modelBuilder.Entity<UserDomain>()
            .Property(u => u.CreationTime)
            .IsRequired();

        modelBuilder.Entity<UserDomain>()
            .Property(u => u.Status)
            .IsRequired();

        modelBuilder.Entity<UserDomain>()
            .Property(u => u.Permission)
            .IsRequired();

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
