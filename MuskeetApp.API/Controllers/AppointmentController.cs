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
    public class AppointmentController : ControllerBase
    {
        private readonly IMapper _mapper;

        private readonly IMuskeetRepository _repo;
        public AppointmentController(IMuskeetRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

        [HttpPost]
        public IActionResult CreateAnAppointment(Appointment appointmentToCreate)
        {
            _repo.AddAppointment(appointmentToCreate);
            return Ok(appointmentToCreate);
        }

        [HttpGet]
        public IActionResult GetAppointments()
        {
            var appointments = _repo.GetAppointments();
            return Ok(appointments);
        }
        
        [HttpPut("{id}")]
        public IActionResult ChangeDateTime(int id, Appointment appointmentToChange)
        {
            var appointmentFromRepe = _repo.GetAppointment(id);
             _mapper.Map(appointmentToChange,appointmentFromRepe);        
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteAnAppointment (int id)
        {
            var appointmentToDelete = _repo.GetAppointment(id);
            _repo.DeleteAppointment(appointmentToDelete);
            return Ok();
        }

    }
}