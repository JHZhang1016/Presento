using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddPresentationSlideRelationship : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "PresentationId",
                table: "Slides",
                type: "TEXT",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Slides_PresentationId",
                table: "Slides",
                column: "PresentationId");

            migrationBuilder.AddForeignKey(
                name: "FK_Slides_Presentation_PresentationId",
                table: "Slides",
                column: "PresentationId",
                principalTable: "Presentation",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Slides_Presentation_PresentationId",
                table: "Slides");

            migrationBuilder.DropIndex(
                name: "IX_Slides_PresentationId",
                table: "Slides");

            migrationBuilder.DropColumn(
                name: "PresentationId",
                table: "Slides");
        }
    }
}
