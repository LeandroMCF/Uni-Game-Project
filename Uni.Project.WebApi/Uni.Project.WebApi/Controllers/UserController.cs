using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Uni.Project.WebApi.Domain;
using Uni.Project.WebApi.Interface;
using Uni.Project.WebApi.Repository;

namespace Uni.Project.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private IUserInterface _user { get; set; }

        public UserController()
        {
            _user = new UserRepository();
        }

        [HttpPost]
        public IActionResult CadUser(UserDomain user)
        {
            try
            {
                return Ok(_user.CadUser(user));
            }
            catch (Exception erro)
            {

                return BadRequest(erro);
            }

        }

        [HttpPost("login")]
        public IActionResult Login(string email, string password)
        {
            try
            {
                return Ok(_user.Login(email, password));
            }
            catch (Exception erro)
            {

                return BadRequest(erro);
            }

        }
    }
}
