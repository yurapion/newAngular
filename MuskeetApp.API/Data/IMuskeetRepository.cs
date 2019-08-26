using System.Collections.Generic;
using System.Threading.Tasks;
using MuskeetApp.API.Model;
namespace MuskeetApp.API.Data
{
    public interface IMuskeetRepository
    {
         void AddUser(User entity);   
         void DeleteUser(User entity);
         void AddCarWorkShop(CarWorkShop entity);   
         void DeleteCarWorkShop(CarWorkShop entity);
         void AddAppointment(Appointment entity);   
         void DeleteAppointment(Appointment entity);
         bool SaveAll();
         IEnumerable<User> GetUsers();
         User GetUser(int id);
         CarWorkShop GetCarWorkShop(int id);
         IEnumerable<CarWorkShop> GetCarWorkShops(int userId);
         IEnumerable<CarWorkShop> GetListCarWorkShops();
         IEnumerable<Appointment> GetAppointments();
         Appointment GetAppointment(int id);
         bool UserExsist(string username, string email);
         bool CarWorkShopExsist(string companyName);

    }
}