using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Uni.Project.WebApi.Domain;
using Uni.Project.WebApi.Interface;
using Uni.Project.WebApi.Migrations;
using Uni.Project.WebApi.Repository;

namespace Uni.Project.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EvaluationController : ControllerBase
    {
        private IEvaluationInterface _evaluation { get; set; }

        public EvaluationController()
        {
            _evaluation = new EvaluationRepository();
        }

        [HttpPost("evaluating/{score}/{description}/{idUser}")]
        public IActionResult Evaluating(int score, string description, string idUser)
        {
            EvaluationDomain evaluation = new EvaluationDomain(new Guid(idUser), DateTime.Now, DateTime.Now, score, description);

            try
            {
                _evaluation.AddEvaluation(evaluation);
                return Ok("Avaliação cadastrada com sucesso!");
            }
            catch (Exception)
            {

                throw;
            }
        }

        [HttpGet("all")]
        public List<EvaluationDomain> GetAllEvaluation()
        {
            try
            {
                return _evaluation.GetAllEvaluations();
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
