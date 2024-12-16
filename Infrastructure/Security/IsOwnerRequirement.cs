using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Infrastructure.Security
{
    public class IsOwnerRequirement : IAuthorizationRequirement
    {
        
    }

    public class IsOwnerRequirementHandler : AuthorizationHandler<IsOwnerRequirement>
    {
        private readonly Datacontext _dbcontext;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public IsOwnerRequirementHandler(Datacontext dbcontext, IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
            _dbcontext = dbcontext;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsOwnerRequirement requirement)
        {
            var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);
            if(userId == null) return Task.CompletedTask;

            var presentationIdString = _httpContextAccessor.HttpContext?.Request.RouteValues.SingleOrDefault(x => x.Key == "presentationId").Value?.ToString();

            if (presentationIdString == null) return Task.CompletedTask;
            var presentationId = Guid.Parse(presentationIdString);

            var presentation = _dbcontext.Presentation
                .FirstOrDefaultAsync(p => p.Id == presentationId && p.UserId == userId)
                .GetAwaiter().GetResult();

            if(presentation == null) return Task.CompletedTask;

            context.Succeed(requirement);
            
            return Task.CompletedTask;
        }
    }
}