using System;
using System.Collections;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using MuskeetApp.API.Data;
using MuskeetApp.API.Model;

namespace MuskeetApp.API.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IMuskeetRepository _repo;

        private readonly IMapper _mapper;

        private readonly IConfiguration _config;

        public UsersController(IMuskeetRepository repo, IMapper mapper, IConfiguration config)
        {
            _mapper = mapper;
            _repo = repo;
            _config = config;
        }

        [HttpPost("register")]
        public IActionResult Register(User userForRegister)
        {
            userForRegister.UserName = userForRegister.UserName.ToLower();
            userForRegister.Email = userForRegister.Email.ToLower();

            if (_repo.UserExsist(userForRegister.UserName, userForRegister.Email)) return BadRequest("Username or Email already exsist");

            _repo.AddUser(userForRegister);

            return Ok(userForRegister);
        }

        [HttpGet]
        public IActionResult GetUsers()
        {
            var users = _repo.GetUsers();
            return Ok(users);
        }
        


        [HttpGet("{id}")]
        public IActionResult GetUser(int id)
        {
            var user = _repo.GetUser(id);
            return Ok(user);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateUser(int id, User userForUpdate)
        {
            var userFromRepo = _repo.GetUser(id);
            _mapper.Map(userForUpdate, userFromRepo);
            //if(await _repo.SaveAll())
            return NoContent();
        }


        [HttpDelete("{id}")]
        public IActionResult DeleteUser(int id)
        {
            var userToDelete = _repo.GetUser(id);
            _repo.DeleteUser(userToDelete);
            return Ok();
        }

        [HttpPost("login")]
        public  IActionResult Login(User userForLogin)
        {
            // throw new Exception("Computer says now");
            var userFromRepo =  _repo.Login(userForLogin.UserName.ToLower(), userForLogin.Password);
            if (userFromRepo == null) return Unauthorized();

            var claims = new[]
            {
              new Claim(ClaimTypes.NameIdentifier, userFromRepo.Id.ToString()),
              new Claim(ClaimTypes.Name, userFromRepo.UserName)
          };


            var key = new SymmetricSecurityKey(Encoding.UTF8
            .GetBytes(_config.GetSection("AppSettings:Token").Value));
            
             //var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("Hello my friendhow are you"));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescription = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = System.DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescription);

           // var user = _mapper.Map<UserForListDto>(userFromRepo);
            var user = userFromRepo;

           return Ok(new
           {
               token = tokenHandler.WriteToken(token),
               user
           });


        }

    }
}