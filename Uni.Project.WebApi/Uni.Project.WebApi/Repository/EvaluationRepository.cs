using Uni.Project.WebApi.Context;
using Uni.Project.WebApi.Domain;
using Uni.Project.WebApi.Interface;

namespace Uni.Project.WebApi.Repository
{
    public class EvaluationRepository : IEvaluationInterface
    {
        UniContext ctx = new UniContext();

        public void AddEvaluation(EvaluationDomain evaluation)
        {
            var user = ctx.Users.FirstOrDefault(x => x.UserId == evaluation.UserId);
            evaluation.UserDomain = user;
            ctx.Evaluations.Add(evaluation);
            ctx.SaveChanges();
        }

        public bool AlloyAccess(string IdEvaluation, string IdUser)
        {
            EvaluationDomain evaluation = ctx.Evaluations.FirstOrDefault(x => x.UserId.ToString() == IdUser && x.EvaluationId.ToString() == IdEvaluation);

            if (evaluation == null)
            {
                return false;
            }
            else
            {
                return true;
            }
        }

        public List<EvaluationDomain> GetAllEvaluations()
        {
            return ctx.Evaluations.ToList();
        }

        public EvaluationDomain GetEvaluation(string idEvaluation)
        {
            return ctx.Evaluations.FirstOrDefault(x => x.EvaluationId.ToString() == idEvaluation);
        }

        public void RemoveEvaluation(string IdEvaluation, string IdUser)
        {
            EvaluationDomain evaluation = ctx.Evaluations.FirstOrDefault(x => x.UserId.ToString() == IdUser && x.EvaluationId.ToString() == IdEvaluation);
            ctx.Evaluations.Remove(evaluation);
            ctx.SaveChanges();
        }

        public void UpdateEvaluation(string IdEvaluation, string IdUser, EvaluationDomain evaluation)
        {
            EvaluationDomain evaluationToUpdate = ctx.Evaluations.FirstOrDefault(x => x.UserId.ToString() == IdUser && x.EvaluationId.ToString() == IdEvaluation);


            evaluationToUpdate.UpdateTime = DateTime.Now;

            if (evaluationToUpdate.Score != evaluation.Score)
            {
                evaluationToUpdate.Score = evaluation.Score;
            };
            if (evaluationToUpdate.Description != evaluation.Description)
            {
                evaluationToUpdate.Description = evaluation.Description;
            };

            ctx.Evaluations.Update(evaluationToUpdate);
            ctx.SaveChanges();
        }
    }
}
