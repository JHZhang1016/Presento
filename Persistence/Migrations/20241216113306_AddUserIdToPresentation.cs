using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddUserIdToPresentation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Presentation",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Presentation_UserId",
                table: "Presentation",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Presentation_AspNetUsers_UserId",
                table: "Presentation",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Presentation_AspNetUsers_UserId",
                table: "Presentation");

            migrationBuilder.DropIndex(
                name: "IX_Presentation_UserId",
                table: "Presentation");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Presentation");
        }
    }
}
