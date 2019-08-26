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
    public class CarWorkShopController : ControllerBase
    {
        private readonly IMuskeetRepository _repo;
        private readonly IMapper _mapper;
        public CarWorkShopController(IMuskeetRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

        [HttpPost("register")]
        public IActionResult Register(CarWorkShop carWorkShopForRegister)
        {
            carWorkShopForRegister.CompanyName = carWorkShopForRegister.CompanyName.ToLower();

            if (_repo.CarWorkShopExsist(carWorkShopForRegister.CompanyName)) return BadRequest("Company name already exsist");

            _repo.AddCarWorkShop(carWorkShopForRegister);

            return Ok(carWorkShopForRegister);
        }

        // TODO
        // Get only that match the city
        [HttpGet("[action]/{id}")]
        public IActionResult GetCarWorkShops(int id)
        {
            var carWorkShops = _repo.GetCarWorkShops(id);
            return Ok(carWorkShops);
        }


        [HttpGet("{id}")]
        public IActionResult GetCarWorkShop(int id)
        {
            var carWorkShop = _repo.GetCarWorkShop(id);
            return Ok(carWorkShop);
        }

        [HttpGet]
        public IActionResult GetListCarWorkShops()
        {
            var carWorkShops = _repo.GetListCarWorkShops();
            return Ok(carWorkShops);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteCarWorkShop(int id)
        {
            var carWorkShopToDelete = _repo.GetCarWorkShop(id);
            _repo.DeleteCarWorkShop(carWorkShopToDelete);
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult UpdateCarWorkShop(int id, CarWorkShop carWorkShopToUpdate)
        {
            var carWorkShopFromRepo = _repo.GetCarWorkShop(id);
            _mapper.Map(carWorkShopToUpdate, carWorkShopFromRepo);
            return NoContent();

        }


    }
}