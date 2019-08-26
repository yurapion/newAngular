using System.Collections.Generic;
using MuskeetApp.API.Model;

namespace MuskeetApp.API.Data
{
    public class MuskeetContext
    {
        public List<User> Users;
        public List<CarWorkShop> CarWorkShops;
        public List<Appointment> Appointments;
    }
}