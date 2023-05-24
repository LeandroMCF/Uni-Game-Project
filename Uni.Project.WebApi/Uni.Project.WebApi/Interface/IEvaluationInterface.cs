﻿using Uni.Project.WebApi.Domain;

namespace Uni.Project.WebApi.Interface
{
    public interface IEvaluationInterface
    {
        public void AddEvaluation(EvaluationDomain evaluation);
        public void RemoveEvaluation(string IdUser);
        public void UpdateEvaluation(string IdEvaluation, string IdUser, EvaluationDomain evaluation);
        public List<EvaluationDomain> GetAllEvaluations();
        public EvaluationDomain GetEvaluation(string idUser);
        public string AlloyAccess(string IdUser);
    }
}
