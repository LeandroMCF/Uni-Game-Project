using Uni.Project.WebApi.Enum;

namespace Uni.Project.WebApi.Domain
{
    public class UserDomain
    {
        public Guid UserId { get; set; }
        public string ?Name { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public DateTime CreationTime { get; set; }
        public StatusEnum Status { get; set; }
        public UserEnum Permission { get; set; }
    }
}
