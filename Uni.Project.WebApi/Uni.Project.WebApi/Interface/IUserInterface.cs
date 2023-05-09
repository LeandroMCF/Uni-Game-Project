using Uni.Project.WebApi.Domain;

namespace Uni.Project.WebApi.Interface
{
    public interface IUserInterface
    {
        public string CadUser(UserDomain user);
        public void GetUser(string email, string password);
    }
}
