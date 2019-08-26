using System;
using System.Collections.Generic;

namespace MuskeetApp.API.Model
{
    public class Appointment
    {
        public int AppointmentId { get; set; }
        public string UserName { get; set; }
        public string TradeMark { get; set; }
        public string CompanyName { get; set; }
        public DateTime Date { get; set; }
    }
}
