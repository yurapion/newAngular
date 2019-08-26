using System;
using System.Linq;
using AutoMapper;
using MuskeetApp.API.Model;

namespace MuskeetApp.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        //TODO Create DTO's
        public AutoMapperProfiles()
        {
            CreateMap<User,User>();
            CreateMap<Appointment, Appointment>();
            CreateMap<CarWorkShop,CarWorkShop>();
        }  
    }
}