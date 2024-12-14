﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Persistence;

#nullable disable

namespace Persistence.Migrations
{
    [DbContext(typeof(Datacontext))]
    [Migration("20241214094746_AddElementEntity")]
    partial class AddElementEntity
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "9.0.0");

            modelBuilder.Entity("Domain.Element", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<int>("Height")
                        .HasColumnType("INTEGER");

                    b.Property<int>("PositionX")
                        .HasColumnType("INTEGER");

                    b.Property<int>("PositionY")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Type")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Width")
                        .HasColumnType("INTEGER");

                    b.Property<int>("ZIndex")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.ToTable("Elements");

                    b.UseTptMappingStrategy();
                });

            modelBuilder.Entity("Domain.Presentation", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("TEXT");

                    b.Property<int>("DefaultBackgroundType")
                        .HasColumnType("INTEGER");

                    b.Property<string>("DefaultBackgroundValue")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Description")
                        .HasColumnType("TEXT");

                    b.Property<string>("ThumbnailUrl")
                        .HasColumnType("TEXT");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Presentation");
                });

            modelBuilder.Entity("Domain.Slide", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<int>("BackgroundType")
                        .HasColumnType("INTEGER");

                    b.Property<string>("BackgroundValue")
                        .HasColumnType("TEXT");

                    b.Property<int>("Order")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Slides");
                });

            modelBuilder.Entity("Domain.Elements.CodeElement", b =>
                {
                    b.HasBaseType("Domain.Element");

                    b.Property<string>("CodeContent")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.ToTable("CodeElements");
                });

            modelBuilder.Entity("Domain.Elements.ImageElement", b =>
                {
                    b.HasBaseType("Domain.Element");

                    b.Property<string>("Alt")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Source")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.ToTable("ImageElements");
                });

            modelBuilder.Entity("Domain.Elements.TextElement", b =>
                {
                    b.HasBaseType("Domain.Element");

                    b.Property<string>("FontColor")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("FontFamily")
                        .HasColumnType("INTEGER");

                    b.Property<int>("FontSize")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Text")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.ToTable("TextElements");
                });

            modelBuilder.Entity("Domain.Elements.VideoElement", b =>
                {
                    b.HasBaseType("Domain.Element");

                    b.Property<bool>("Autoplay")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Source")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.ToTable("VideoElements");
                });

            modelBuilder.Entity("Domain.Elements.CodeElement", b =>
                {
                    b.HasOne("Domain.Element", null)
                        .WithOne()
                        .HasForeignKey("Domain.Elements.CodeElement", "Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Domain.Elements.ImageElement", b =>
                {
                    b.HasOne("Domain.Element", null)
                        .WithOne()
                        .HasForeignKey("Domain.Elements.ImageElement", "Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Domain.Elements.TextElement", b =>
                {
                    b.HasOne("Domain.Element", null)
                        .WithOne()
                        .HasForeignKey("Domain.Elements.TextElement", "Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Domain.Elements.VideoElement", b =>
                {
                    b.HasOne("Domain.Element", null)
                        .WithOne()
                        .HasForeignKey("Domain.Elements.VideoElement", "Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
