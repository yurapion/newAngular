using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using MuskeetApp.API.Model;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace MuskeetApp.API.Data
{
    public class MuskeetRepository : IMuskeetRepository
    {
        
        private static MuskeetContext _context;
        public MuskeetRepository()
        {
            //Get context with data hard code, no json files
            // GetContext();

            // get context with data using json objects(real life example)
            GetContextJson();

        }

        //Singleton
        public static MuskeetContext GetContextJson()
        {
            if (_context == null)
            { 
                _context = new MuskeetContext();
                SeedUsers();
                SeedCarWorkShops();
                SeedAppointments();
            }
            return _context;
        }
        
        //Singleton
        public static MuskeetContext GetContext()
        {

             if (_context == null)
            { 
                    _context = new MuskeetContext{
                Users = new List<User>{
                    new User{
                        Id =1, UserName = "Sam", City = "Kiev", PostalCode = "152-12", Email = "sam@gmail.com", Country= "Ukraine"},

                    new User {
                        Id =2, UserName = "Don", City = "Odessa", PostalCode = "153-13", Email = "don@gmail.com", Country= "Ukraine"}
                },

                Appointments = new List<Appointment>{
                    new Appointment{ 
                        AppointmentId = 1, UserName = "Sam", TradeMark = "BMV", CompanyName = "BestCars", Date = DateTime.Now}
                },

                CarWorkShops = new List<CarWorkShop> {
                   new CarWorkShop{
                    CompanyId = 1,CompanyName = "BestCars", 
                    TradeMarks = new List<TradeMark>{ 
                        new TradeMark{TradeMarkId = 1, TradeMarkTittle = "Tesla", CarWorkShopId = 1},
                        new TradeMark{TradeMarkId = 2, TradeMarkTittle = "BMV", CarWorkShopId = 1}
                   }, City = "Kiev", PostalCode = "152-12", Country = "Ukraine"},

                new CarWorkShop{
                CompanyId = 2,CompanyName = "GoodCars",
                  TradeMarks = new List<TradeMark>{ 
                      new TradeMark{TradeMarkId = 1, TradeMarkTittle = "Tesla", CarWorkShopId = 2},
                      new TradeMark{TradeMarkId = 3, TradeMarkTittle = "Audi", CarWorkShopId = 2}
                }, City = "Odessa", PostalCode = "153-13", Country = "Ukraine"},

                new CarWorkShop{
                CompanyId = 3,CompanyName = "FunMech",
                  TradeMarks = new List<TradeMark>{ 
                      new TradeMark{TradeMarkId = 4, TradeMarkTittle = "Nissan", CarWorkShopId = 3}
                }, City = "Odessa", PostalCode = "153-13", Country = "Ukraine"}
                }
              };
            }
            
            return _context;
        }
        
        public static void SeedUsers()
        {
             var userData = System.IO.File.ReadAllText("Data/UserSeedData.json");
            var users = Newtonsoft.Json.JsonConvert.DeserializeObject<List<User>>(userData);
            _context.Users = new List<User>();
            foreach (var user in users)
            {
                user.UserName = user.UserName.ToLower();
                user.Email = user.Email.ToLower();
                _context.Users.Add(user);
            }
        }

        public static void SeedCarWorkShops()
        {
                var CarWorkShopData = System.IO.File.ReadAllText("Data/CarWorkShopSeedData.json");
            var CarWorkShops = Newtonsoft.Json.JsonConvert.DeserializeObject<List<CarWorkShop>>(CarWorkShopData);
            _context.CarWorkShops = new List<CarWorkShop>();
            foreach (var carWorkShop in CarWorkShops)
            {
                _context.CarWorkShops.Add(carWorkShop);
            }
        }

        public static void SeedAppointments()
        {
            var AppointmentData = System.IO.File.ReadAllText("Data/AppointmentSeedData.json");
            var Appointments = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Appointment>>(AppointmentData);
            _context.Appointments = new List<Appointment>();
            foreach (var appointment in Appointments)
            {
                _context.Appointments.Add(appointment);
            }
        }
        

        public void AddAppointment(Appointment entity)
        {
            _context.Appointments.Add(entity);
        }

        public void AddCarWorkShop(CarWorkShop entity)
        {
           _context.CarWorkShops.Add(entity);
        }

        public void AddUser(User entity)
        {
            _context.Users.Add(entity);
        }

        public void DeleteAppointment(Appointment entity)
        {
            _context.Appointments.Remove(entity);
        }

        public void DeleteCarWorkShop(CarWorkShop entity)
        {
            _context.CarWorkShops.Remove(entity);
        }

        public void DeleteUser(User entity)
        {
            _context.Users.Remove(entity);
        }

        public  Appointment GetAppointment(int id)
        {
            var appointment =  _context.Appointments.FirstOrDefault(a => a.AppointmentId == id);

            return appointment;
            
        }

        public CarWorkShop GetCarWorkShop(int id)
        {
           var carWorkShop = _context.CarWorkShops.FirstOrDefault(c => c.CompanyId == id);
           return carWorkShop;
        }

        public User GetUser(int id)
        {
           
            var user =  _context.Users.FirstOrDefault(u => u.Id == id);
            return user;
        }

        public IEnumerable<User> GetUsers()
        {
            var users = _context.Users;
            return users;
        }

        public bool SaveAll()
        {
            throw new System.NotImplementedException();
        }

        public bool UserExsist(string username, string email)
        {
            if (_context.Users.Any(u => u.UserName == username) || _context.Users.Any(u => u.Email == email))  return true;

            return false;
        }

        public bool CarWorkShopExsist(string companyName)
        {
            if (_context.CarWorkShops.Any(c => c.CompanyName == companyName)) return true;

            return false;
        }

        public IEnumerable<CarWorkShop> GetCarWorkShops(int userId)
        {
            var user = _context.Users.FirstOrDefault(u => u.Id == userId);
            var carWorkShops = _context.CarWorkShops.Where(c => c.City == user.City);
            return carWorkShops;
        }

        public IEnumerable<CarWorkShop> GetListCarWorkShops()
        {
            var listCarWorkShops =  _context.CarWorkShops;
            return listCarWorkShops;
        }

        public IEnumerable<Appointment> GetAppointments()
        {
            var appointments = _context.Appointments;
            return appointments;
        }
    }
}