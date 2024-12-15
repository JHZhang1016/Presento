using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddSlideElementRelationship : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "SlideId",
                table: "Elements",
                type: "TEXT",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Elements_SlideId",
                table: "Elements",
                column: "SlideId");

            migrationBuilder.AddForeignKey(
                name: "FK_Elements_Slides_SlideId",
                table: "Elements",
                column: "SlideId",
                principalTable: "Slides",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Elements_Slides_SlideId",
                table: "Elements");

            migrationBuilder.DropIndex(
                name: "IX_Elements_SlideId",
                table: "Elements");

            migrationBuilder.DropColumn(
                name: "SlideId",
                table: "Elements");
        }
    }
}
