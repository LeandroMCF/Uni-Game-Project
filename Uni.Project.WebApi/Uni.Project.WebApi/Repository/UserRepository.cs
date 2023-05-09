using Uni.Project.WebApi.Context;
using Uni.Project.WebApi.Domain;
using Uni.Project.WebApi.Interface;

namespace Uni.Project.WebApi.Repository
{
    public class UserRepository : IUserInterface
    {
        UniContext ctx = new UniContext();

        public string CadUser(UserDomain user)
        {
            UserDomain findUser = new UserDomain();
            findUser = ctx.Users.FirstOrDefault(x => x.Email == user.Email);

            if (findUser != null)
            {
                return "Error - User allready exists";
            }
            else
            {
                if (Convert.ToInt32(user.Status) > 1)
                {
                    return "Error - Status not allowed";
                }
                else if (Convert.ToInt32(user.Permission) > 2)
                {
                    return "Error - Permission not allowed";
                }

                if (user.Password.Count() < 7)
                {
                    return "Error - Passwor needs to have more than 7 characteres";
                }

                var getReturn = ctx.Users.Add(user).ToString();
                ctx.SaveChanges();
                return getReturn;
            }
        }

        public void GetUser(string email, string password)
        {
            throw new NotImplementedException();
        }
    }
}
