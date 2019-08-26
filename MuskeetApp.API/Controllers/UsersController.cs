using System;
using System.Collections;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
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

        public UsersController(IMuskeetRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
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

    }
}