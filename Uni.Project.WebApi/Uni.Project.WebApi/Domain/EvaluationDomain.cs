namespace Uni.Project.WebApi.Domain
{
    public class EvaluationDomain
    {
        public Guid EvaluationId { get; set; }
        public Guid UserId { get; set; }
        public DateTime CreationTime { get; set; }
        public int Score { get; set; }
        public string Description { get; set; }

        public UserDomain UserDomain { get; set; }
    }
}
