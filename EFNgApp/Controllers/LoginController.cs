using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using EFNgApp.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace EFNgApp.Controllers
{
    
    [AllowAnonymous]
    public class LoginController : Controller
    {
        EmployeeDataAccessLayer userobj = new EmployeeDataAccessLayer();

        private IConfiguration _config;

        public LoginController(IConfiguration config)
        {
            _config = config;
        }
        [HttpPost]
        [Route("api/Login")]
        public IActionResult Login([FromBody]TblUsers login)
        {
            IActionResult response = Unauthorized();
            var user = AuthenticateUser(login);

            if (user != null)
            {
                var tokenString = GenerateJSONWebToken(user);
                response = Ok(new { token = tokenString });
            }

            return response;
        }

        private string GenerateJSONWebToken(TblUsers userInfo)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userInfo.Username),
                new Claim(JwtRegisteredClaimNames.Email, userInfo.EmailAddress),
                new Claim(JwtRegisteredClaimNames.UniqueName, userInfo.Role),
                new Claim(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString())
            };

            var token = new JwtSecurityToken(_config["Jwt:Issuer"], _config["Jwt:Issuer"],
                claims, expires: DateTime.Now.AddMinutes(120), signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }       

        private TblUsers AuthenticateUser(TblUsers login)
        {
            TblUsers user = null;

            user = userobj.GetUserData(login.Username);

            if(user.Password == login.Password)
            {
                return user;
            }

            else
            {
                return null;
            }

            //if(login.Username == "Jignesh" && login.Password =="Password01")
            //{
            //    user = new UserModel { Username = "Jignesh", EmailAddress = "test@test.com", DateOfJoining = DateTime.UtcNow };
            //}

            //return user;
        }

        [Route("api/Register")]
        public IActionResult Register([FromBody]TblUsers userdet)
        {
            IActionResult response = NotFound();
            if(userobj.AddUser(userdet) == 1)
            {
                response = Ok(userdet);
            }
            return response;
        }
    }
   
}
